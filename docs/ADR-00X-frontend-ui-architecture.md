# ADR-00X: Frontend UI Architecture

- Status: Draft
- Date: 2026-04-22
- Owners: <you / team>
- Scope: Next.js (App Router) + Tailwind + shadcn/ui + Zustand (+ persist) + AI/MCP
- Related Standard: TS-00X Frontend UI Technical Standard

## Context

The frontend stack uses Next.js (App Router), Tailwind, shadcn/ui, and Zustand, and needs a consistent architectural approach that keeps UI behavior understandable across features and teams.

React function components plus hooks make it easy to mix local state, context, and external stores in ad hoc ways, which can lead to inconsistent implementation patterns and weak traceability as the application grows.

shadcn/ui is a strong fit for this effort because it provides accessible React function components installed into the repository as source files, giving the team direct ownership over component behavior and implementation details.

The architecture must also support AI-native development workflows, where assistants operate against the real codebase, design system, and component catalog rather than guessed abstractions.

## Decision

Adopt an action-driven, externally controlled frontend UI architecture built on React function components, shadcn/ui primitives, Tailwind styling, and feature-scoped Zustand stores with a formal `state` plus `actions` pattern.

Within this architecture, components are treated as stateless renderers of selected state that emit user intent through named actions or callbacks rather than owning meaningful application behavior locally.

Detailed implementation rules, local-state exceptions, persistence guidance, and AI-tooling constraints are defined in TS-00X Frontend UI Technical Standard.

## Decision Drivers

The primary criteria used to evaluate alternatives were consistency across teams and features, traceability of state transitions, implementation overhead appropriate to team size and iteration speed, alignment with shadcn/ui's locally owned source model, compatibility with AI-native workflows, and reduction of ad hoc patterns across the codebase.

Detailed alternative analysis is documented in TS-00X Frontend UI Technical Standard.

## Consequences

### Positive

Components become easier to understand and test because they act primarily as views over state plus event emitters, while significant state transitions move into named store actions that are easier to review and trace.

The approach also fits shadcn/ui well because the team owns the component source and can normalize primitives to the selected interaction model, while AI tools can work against real project primitives and patterns instead of guessing.

### Negative

This architecture introduces more ceremony for small interactions that some teams might otherwise manage with local component state, and poorly defined store boundaries could still create oversized stores.

Developers accustomed to looser React patterns may initially find the model restrictive, especially when shifting state out of components and into feature-scoped actions and stores.

### Tradeoffs

State that many teams might keep local, such as modal visibility, filters, and form drafts, will generally live in stores under this architecture.

Thin container or feature-hook layers may be introduced to keep JSX simple while preserving centralized state management and consistent interaction patterns.

## Routing

### Context

The initial architecture deferred URL routing, with navigation managed entirely as a Zustand store holding a tagged-union `view` value. Components render based on the current view, and the store maintains a history stack for back-navigation. This approach left the application without shareable URLs, bookmarkable deep links, or working browser back/forward buttons.

Because the project is built on Next.js App Router, a dedicated client-side routing library is unnecessary — the framework provides file-system-based routing, nested layouts, dynamic segments, and server-side rendering out of the box.

### Decision

Adopt **Next.js App Router** for all routing. The browser URL becomes the source of truth for navigation state, replacing any Zustand store that holds a tagged-union view or history stack.

Route segments (`app/[surface]/page.tsx`, `app/[surface]/[id]/page.tsx`, etc.) carry entity identity via dynamic params. Nested `layout.tsx` files provide shared chrome (top bar, sidebar) without re-rendering on navigation. The Zustand nav store's history stack is removed in favor of browser history; back-navigation uses `router.back()` from `next/navigation`.

Display names and other derived values are not embedded in route state. They are derived from feature stores that fetch and hold the relevant records, keeping URLs clean and stable.

Server components handle initial data fetching where possible, passing data down as props to client component subtrees. Client components that require interactivity (stores, event handlers) are marked `"use client"` and sit below the server component boundary.

Durable UI preference state (e.g., active surface) that is not appropriate as a URL segment — because it is a per-user preference rather than a shareable navigation target — SHOULD be persisted via Zustand `persist` to `localStorage` rather than the URL. The surface switcher is the current example of this pattern.

### Decision Drivers

Next.js App Router is already the project's framework. Adopting its routing model means the team does not take on a separate routing dependency, gets server rendering and streaming for free, and benefits from framework-level support for auth middleware, layout nesting, route-level code splitting, and static generation — all without additional configuration.

### Consequences

Browser navigation is fully functional, and application views are shareable and bookmarkable. Route segments are a natural integration point for future features such as middleware-based auth guards, per-route metadata, and analytics instrumentation.

The migration from Zustand-only view state requires converting top-level view switches into file-system route segments, updating components to use `useParams` and `useRouter` from `next/navigation`, and removing any embedded history stack from stores. Server components should be introduced at the route level where data fetching is involved.

### Rejected Routing Alternatives

React Router v6 was the prior decision before the project adopted Next.js. It is the established standard for client-side routing in React SPAs but introduces a redundant routing layer when Next.js App Router already provides equivalent — and in many cases superior — capabilities. It was superseded by this decision.

URL-sync via `history.pushState` without a routing library was evaluated in an earlier spike. It is viable for a small number of views but requires the team to own a custom serialization layer and re-solve routing edge cases indefinitely. It was rejected.

Retaining the Zustand-only navigation model with no URL support is not acceptable for the product requirement of shareable deep-link URLs.

## API Layer (Backend for Frontend)

### Context

The application's backend services — Firestore, and any future data sources — require server-side credentials that must never be exposed to the browser. Client components have no safe path to these services directly. A mediating layer is needed that holds credentials server-side, shapes data into UI-optimal payloads, and presents a stable contract the frontend depends on rather than coupling to raw backend shapes.

### Decision

Next.js Route Handlers (`app/api/...`) serve as the Backend for Frontend (BFF) layer for this application. This is a natural extension of the framework already in use and requires no additional infrastructure.

The BFF boundary works as follows:

- **Server components** may call backend services — Firestore via the Admin SDK, internal utilities — directly within the same server process, with no HTTP round-trip. This is the preferred path for initial page data that does not require user interaction.
- **Client components** that need to fetch or mutate data after hydration MUST do so through Route Handlers, never by reaching backend services directly from the browser.
- Route Handlers own credential handling, data transformation, aggregation across multiple backend calls, and response shaping. They are the single place where raw backend data is converted into the structure the UI depends on.
- The request/response contract of each Route Handler is the stable interface the frontend builds against. Backend data model changes are absorbed in the Route Handler rather than rippling into UI components.

### Decision Drivers

Next.js Route Handlers are colocated with the application code, share the same deployment unit, and run in the same environment where Admin SDK credentials are available. This eliminates the need for a separate API service for UI-adjacent data access while keeping credentials server-side. The BFF pattern also provides a natural place to enforce auth checks, rate limiting, and response caching at the API boundary before data reaches client components.

### Consequences

Backend credentials (Firestore service account, API keys) remain exclusively in the server environment. Client components depend on Route Handler contracts rather than raw Firestore document shapes, so the UI is insulated from backend schema changes. Route Handlers can aggregate and reshape data optimally for each view, reducing over-fetching.

The tradeoff is that Route Handlers add a hop for client-initiated fetches that server components could handle directly. The guidance above addresses this: server components take the direct path for page-load data, and Route Handlers handle post-hydration client needs.

## Rejected Alternatives

Ad hoc local state plus Context was rejected because it tends to produce inconsistent patterns and weaker traceability as the application grows.

Redux Toolkit was rejected for now because it introduces more ceremony than desired for the expected team size and iteration speed, while Zustand plus conventions can provide the required structure with less boilerplate.

Zustand without a formal actions-and-state separation was rejected because it makes it too easy for mutations and workflow logic to spread across arbitrary call sites.

## Adoption

This decision is considered adopted when new frontend work follows the implementation rules defined in TS-00X Frontend UI Technical Standard and code review verifies conformance around stateless components, named actions, store boundaries, persistence practices, and externally controlled shadcn/ui primitives.

