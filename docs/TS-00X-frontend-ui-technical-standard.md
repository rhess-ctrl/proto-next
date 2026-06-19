# TS-00X: Frontend UI Technical Standard

- Status: Draft
- Date: 2026-04-22
- Owners: <you / team>
- Related ADR: ADR-00X Frontend UI Architecture
- Scope: Next.js (App Router) + Tailwind + shadcn/ui + Zustand (+ persist) + AI/MCP

## Purpose

This technical standard defines the implementation rules, conventions, and supporting guidance for the frontend architecture established by ADR-00X Frontend UI Architecture.

It captures the detailed material intentionally left out of the ADR, including component behavior rules, state boundaries, store contracts, persistence practices, shadcn/ui usage, AI-assisted development guidance, review expectations, and supporting appendices.

## Scope

This standard applies to frontend code built with Next.js (App Router), Tailwind, shadcn/ui, Zustand, Zustand persistence, and AI- or MCP-based development tooling.

It applies to product UI, shared component primitives, feature-level state management, and approved schema-driven or generated internal tooling that is brought under the same frontend architecture.

## Normative Language

The key words MUST, MUST NOT, SHOULD, SHOULD NOT, and MAY in this standard are to be interpreted as normative requirements for implementation and review.

## Core Principles

The frontend architecture is based on the following principles:

- UI is implemented with React function components.
- Components act as stateless renderers of selected state.
- Components emit user intent through named actions or callbacks rather than raw mutation paths.
- Shared client state is modeled in feature-scoped Zustand stores with explicit `state` and `actions` boundaries.
- shadcn/ui components are treated as presentational primitives that the team owns and may adapt.
- AI-generated or AI-assisted code must be normalized to the same architecture rather than introducing parallel patterns.

## Role of shadcn/ui

shadcn/ui provides accessible React function components, commonly built on top of Radix primitives, styled with Tailwind utility classes, and distributed as source files copied into the repository rather than consumed as a black-box package.

This “you own the code” model makes shadcn/ui a strong fit for the architecture because the team can edit, extend, or refactor component implementations to conform to local architecture rules and design-system expectations.

Within this standard, shadcn/ui components are the primary presentational layer primitives for elements such as buttons, inputs, dialogs, menus, and forms.

## Component Standard

### Function Components

- All new UI components MUST be implemented as React function components.
- Class components MUST NOT be introduced for new frontend work.
- Function components SHOULD be pure with respect to application behavior: given the same selected state and the same actions, they should render the same output.
- Function components MUST NOT internally decide domain workflows or mutate shared state directly.

### Stateless Renderer Rule

Components are stateless renderers by default.

This means:

- Components MUST receive data via props, selectors, or feature hooks that wrap selectors over external state.
- Components MUST emit user intent through named actions or callbacks.
- Components MUST NOT own meaningful business state through `useState` or `useReducer`.
- Components MUST NOT own workflow state such as wizard steps, multi-step flow progress, or similar user-visible interaction state.
- Components MUST NOT own meaningful view state that extends beyond the component, including filters, selections, or coordinated modal visibility.
- Components MAY use local state only for approved implementation-detail exceptions defined in this standard.

## Interaction Model

The default interaction model is: components render selected state and invoke named actions; components do not decide how shared state changes.

In practice:

- Data MAY flow into components via props passed from a route or container.
- Data MAY also flow through feature hooks that wrap Zustand selectors, such as a `useTodoView()` style pattern.
- Actions flow out of components through store actions or callbacks that ultimately invoke store actions.
- Components MUST NOT manipulate shared state through arbitrary raw setters when a domain-named action should exist.
- Components SHOULD select only the minimum state needed to render their responsibilities.

## Routing Standard

Next.js App Router is the routing layer for this project. The following rules apply.

### URL as Source of Truth

The browser URL MUST be the source of truth for navigation state. Views that represent distinct application destinations — a surface, a detail page, a filtered subset that a user might share or bookmark — MUST be addressable as URL segments rather than held exclusively in a Zustand store.

### Route Segments and Params

- Feature areas MUST be represented as App Router route segments under the `app/` directory.
- Entity identity (e.g., an opportunity ID) MUST be carried in dynamic route params (`[id]`) rather than in store state.
- Nested layouts (`layout.tsx`) SHOULD be used to provide shared chrome — navigation, top bars, sidebars — without re-mounting on route transitions.

### Server vs. Client Components

- Route-level page components (`page.tsx`) SHOULD be server components by default.
- Server components SHOULD handle initial data fetching and pass data as props to client component subtrees.
- Components that require interactivity — stores, event handlers, browser APIs — MUST be marked `"use client"` and placed below the server component boundary.
- The `"use client"` boundary SHOULD be pushed as far down the tree as possible to maximize server-rendered output.

### Navigation APIs

- Components MUST use `useRouter`, `useParams`, and `usePathname` from `next/navigation` rather than browser history APIs directly.
- Back-navigation MUST use `router.back()` rather than a custom history stack in a Zustand store.

### Durable Preference State

Not all navigation-adjacent state belongs in the URL. Durable user preferences — such as a collapsed sidebar or a selected surface that is per-user rather than shareable — SHOULD be persisted via Zustand `persist` to `localStorage`. The distinction: if two users sharing a URL should see the same view, it belongs in the URL; if the state is personal and should survive reload without appearing in the link, it belongs in a persisted store.

## API Layer Standard

Next.js Route Handlers under `app/api/` serve as the BFF layer. The following rules apply.

- Server components MAY call backend services (Firestore Admin SDK, internal utilities) directly within the same server process. This is the preferred path for initial page data.
- Client components MUST NOT call backend services directly from the browser. All post-hydration data access MUST go through a Route Handler.
- Route Handlers MUST own credential handling, data transformation, and response shaping. Raw backend document shapes MUST NOT be forwarded to the client as-is.
- Each Route Handler SHOULD present a stable, UI-optimized contract. Backend schema changes are absorbed in the handler, not in UI components.
- Route Handlers SHOULD validate and authenticate requests before performing any data access.

## State Boundaries

Frontend state is divided into three categories.

### Shared Client State

Shared client state MUST live in feature-scoped Zustand stores.

Examples include domain entities, selections, filters, drafts, wizard steps, active panels, active tabs, focused items, and other state that matters across multiple components or across navigation within a feature.

### Durable Client Preference State

Durable client preference state SHOULD be implemented with Zustand persistence when the user experience requires data to survive reloads.

Typical examples include theme, layout preferences, sidebar collapse state, recently used filters, and local drafts that intentionally persist across sessions.

Persisted state MUST define a storage key name, version number, and migration strategy.

### Local Component State

Local component state is discouraged by default and MAY be used only when all of the following conditions are true:

- The state is purely an implementation detail with no business meaning.
- The state does not need to be observed, coordinated, or persisted outside the component.
- Moving the state to a store would not materially improve traceability or testability.

Any local state that does not meet all three conditions MUST be promoted into store-managed state.

## Store Contract

Every store MUST follow a consistent conceptual contract with serializable `state` and named `actions`.

```ts
type FeatureState = {
  // serializable state only
}

type FeatureActions = {
  // named domain actions and workflows
}

type FeatureStore = {
  state: FeatureState
  actions: FeatureActions
}
```

The following rules apply:

- Stores MUST be organized around cohesive features or domains rather than a single global mega-store.
- Store state SHOULD remain serializable unless a documented exception exists.
- Actions MUST be the approved location for shared mutations and workflow logic.
- Actions MUST be domain-named and intent-revealing, such as `addTodo`, `completeTodo`, `setFilter`, or `openDetailsPanel`.
- Generic setter-heavy APIs SHOULD be avoided unless clearly justified by the domain model.
- Components SHOULD consume stores through feature hooks that select minimal state and expose stable callbacks into actions.

## Persistence Standard

When a store uses persistence, only intentionally durable state SHOULD be persisted.

The following SHOULD NOT be persisted:

- Derived data that can be recomputed.
- Transient loading or error flags.
- Temporary UI state that should reset on reload.

## Local State Exceptions

### Allowed Examples

The following are generally acceptable uses of local component state:

- A short-lived animation flag for a micro-interaction.
- A transient focus or hover implementation detail.
- An internal debounce buffer that is projected into store state once settled.
- Tiny UI details that are not observable outside the component and do not represent domain or workflow state.

### Disallowed Examples

The following MUST NOT remain as local component state:

- Step index in a multi-step wizard.
- Form drafts that the user may reasonably return to.
- Filter values that affect more than one component.
- Dialog or modal state when that state coordinates with surrounding UI.
- Any state that a product owner or user would recognize as meaningful application state.

## shadcn/ui Usage Standard

shadcn/ui components are the primary presentational primitives in this architecture.

Because shadcn/ui components are installed into the repository as source files, they MUST be treated as locally owned code that may be edited, adapted, or refactored to conform to this standard.

The following rules apply:

- shadcn/ui components SHOULD be used for buttons, inputs, dialogs, menus, forms, and related foundational primitives.
- Local state patterns shown in shadcn/ui documentation examples MUST be treated as illustrative examples rather than default implementation guidance for this codebase.
- Props such as `value`, `open`, `onChange`, and `onOpenChange` SHOULD be wired to external state and named actions whenever the behavior is application-significant.
- Teams MAY refactor locally owned shadcn/ui source to align with accessibility, design system, or architectural constraints.

## AI-Assisted Development Standard

This standard explicitly supports AI-assisted development, but only when AI-generated or AI-edited code is normalized back into the same architecture.

### AI-Addressable Project Assets

AI tooling SHOULD operate against the real project codebase, including local shadcn/ui component source, layout primitives, Tailwind configuration, and related project assets.

Assistants SHOULD prefer real project primitives and tokens over guessed APIs or ad hoc JSX.

### Generative and Prefab-Style Tools

Generative UI approaches MAY be used to bootstrap internal tools and flows when they improve delivery speed, especially when those tools allow teams to describe layouts, forms, or dashboards declaratively.

Any generated UI that becomes part of the maintained frontend codebase MUST compile or be adapted into React function components, externalized state via feature hooks or Zustand, and shadcn/ui primitives for styling and accessibility.

AI and generative tools are therefore used to prototype and scaffold, not to introduce parallel UI architectures.

### JSON- or Schema-Driven UI

JSON- or schema-driven renderers MAY be used for internal admin and diagnostic views or one-off dashboards where they accelerate visualization of structured data.

Where those approaches surface in the main product UI, they MUST still integrate with the Zustand state-and-actions pattern for behavior and use shadcn/ui primitives or the project design system for visual consistency.

## MCP Servers and AI-Native Developer Workflows

AI coding assistants, especially terminal- and editor-based assistants such as Claude Code, are intended to be first-class tools in the developer workflow under this standard.

To support this safely and consistently, the project SHOULD expose key parts of the frontend stack through protocol-based servers.

### Tailwind-Focused Servers

Tailwind-aware servers SHOULD be configured so assistants can discover valid utilities, spacing, typography tokens, and other project-specific conventions, convert existing CSS into Tailwind classes, and reuse existing component blocks rather than inventing inconsistent patterns.

### Component and Catalog Servers

Where available, assistants SHOULD be connected to servers that expose the project component catalog, including shadcn/ui-derived components and layout primitives, so they can search and retrieve live component source and props and generate new views from real project primitives.

### Architecture Normalization Rule

Any UI or Tailwind code proposed by AI through these integrations MUST be reviewed and normalized so that components remain React function components and stateless renderers, behavior flows through Zustand stores and named actions, and styling remains aligned with the project Tailwind configuration, tokens, and approved primitives.

AI-generated code MUST NOT introduce a parallel UI architecture.

## Review and Enforcement

Frontend code review SHOULD include the following checks:

- Should any local state be promoted to a feature store?
- Are state transitions implemented as named actions rather than scattered setters?
- Are shadcn/ui primitives being treated as presentational components rather than miniature application controllers?
- Does AI-generated or AI-edited code conform to the same architecture as manually written code?
- Does persistence include versioning and migration where required?

Teams MAY add automated enforcement through lint rules, templates, code generation, or review checklists where practical.

## Adoption Criteria

This standard is considered in effect when new frontend work uses the component, state, persistence, shadcn/ui, and AI-integration rules defined here.

Existing code MAY be migrated incrementally, but all new code and major refactors SHOULD align with this standard unless an exception is explicitly approved and documented.

## Exceptions

Documented exceptions MAY be approved when a specific technical constraint, third-party integration, or transitional migration state makes strict conformance impractical.

Any exception SHOULD describe the reason, scope, expected duration, and path back to compliance if one exists.

## Appendix A: Alternatives Matrix

This appendix records the alternatives considered during architecture selection and the criteria used to compare them.

| Option                                             | Description                                                  | Consistency across codebase | State traceability | Ceremony / overhead | Learning curve | AI-native fit | Alignment with shadcn/ui | Risk of ad hoc patterns                                     | Outcome                                                      |
|----------------------------------------------------|--------------------------------------------------------------|-----------------------------|--------------------|---------------------|----------------|---------------|--------------------------|-------------------------------------------------------------|--------------------------------------------------------------|
| A. Ad hoc local state + Context                    | Each feature chooses its own mix of component `useState`, Context, and custom hooks. | Low.                        | Low.               | Low.                | Low.           | Low.          | Medium.                  | High.                                                       | Rejected.                                                    |
| B. Redux Toolkit with reducers/selectors           | Centralized store with reducers, actions, and selectors.     | High.                       | High.              | High.               | Medium.        | Medium.       | Medium.                  | Medium.                                                     | Rejected for now because it is more ceremonious than desired for the expected team size and iteration speed. |
| C. Zustand without formal actions/state separation | Zustand used as a flexible store without a formal `state` plus `actions` contract. | Medium.                     | Medium-Low.        | Low.                | Low-Medium.    | Medium.       | Medium.                  | Medium-High.                                                | Rejected because it allows mutations and workflows to spread across arbitrary call sites. |
| D. Action-driven Zustand + stateless components    | React function components as stateless renderers, behavior in feature-scoped Zustand stores with explicit `state` and `actions`, Next.js App Router for URL-based navigation, shadcn/ui as presentational primitives, and AI tooling normalized to the same architecture. | High.                       | High.              | Medium.             | Medium.        | High.         | High.                    | Medium, mitigated by explicit rules and code review checks. | Selected.                                                    |

## Appendix B: Future Directions

This appendix records future-facing considerations that informed the broader architecture discussion but are intentionally outside the scope of ADR-00X itself.

The current architecture creates a foundation that could support future in-app AI capabilities because it standardizes on stateless React function components, Zustand stores with named actions, shadcn/ui plus Tailwind for presentational primitives, and MCP-aware tooling around the design system and component catalog.

Possible future directions include separate decisions for in-app copilots or agentic interfaces that observe state, invoke named actions, and render UI within the same architectural model.

Examples mentioned in the original discussion include future exploration of approaches such as CopilotKit, AG-UI, or MCP Apps-driven copilots, but any adoption of those patterns SHOULD be addressed through separate ADRs and standards rather than through this technical standard alone.

