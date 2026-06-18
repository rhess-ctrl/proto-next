# ADR-00X: Frontend UI Architecture

- Status: Draft
- Date: 2026-04-22
- Owners: <you / team>
- Scope: React + Vite + Tailwind + shadcn/ui + Zustand (+ persist) + AI/MCP
- Related Standard: TS-00X Frontend UI Technical Standard

## Context

The frontend stack uses React, Vite, Tailwind, shadcn/ui, and Zustand, and needs a consistent architectural approach that keeps UI behavior understandable across features and teams.

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

The initial architecture deferred URL routing, with navigation managed entirely as a Zustand store holding a tagged-union `view` value. Components render based on the current view, and the store maintains a history stack for back-navigation. This approach eliminated the dependency on React Router but left the application without shareable URLs, bookmarkable deep links, or working browser back/forward buttons.

A spike explored adding URL synchronization on top of the existing nav store via `history.pushState` and a custom `viewToPath` / `pathToView` serializer, estimated at roughly 100 lines of new code. While technically viable, this approach would require the team to own and maintain a custom routing layer indefinitely, including serialization edge cases, nested param handling, and server-side catch-all configuration — work that a standard routing library already provides.

The team has since converged on the view that the URL-sync approach trades short-term simplicity for long-term maintenance burden, and that React Router is the more durable choice.

### Decision

Adopt React Router v6 for client-side routing. The browser URL becomes the source of truth for navigation state, replacing the tagged-union `view` in the Zustand navigation store. Route params (`:campaignId`, `:leadId`, etc.) carry entity identity. The nav store's internal history stack is removed in favor of browser history; `goBack()` delegates to `navigate(-1)`.

Display names currently embedded in the `view` type (e.g., `campaignName`, `leadName`) are dropped from route state and derived instead from feature stores, which already fetch and hold the relevant records. This is the cleaner long-term approach regardless of routing strategy.

The production server must be configured with a catch-all fallback to serve `index.html` for all client-side routes, which is required for any SPA with URL-based routing.

### Decision Drivers

React Router is the established standard for URL routing in React applications. Most developers on the team already know it, reducing onboarding friction and the risk of bespoke edge-case handling. It handles authentication redirects, nested routes, and route-level code splitting in ways the custom URL-sync approach would need to reimplement independently. The team's judgment that it "just works" is a meaningful signal given that routing edge cases compound over time.

### Consequences

Browser navigation becomes fully functional, and application views become shareable and bookmarkable. Routes also provide a natural integration point for future features such as route-level auth guards, lazy-loaded feature bundles, and analytics instrumentation.

The migration requires refactoring the Zustand navigation store, updating components to use `useParams` and `useNavigate`, removing the embedded history stack, and configuring the hosting environment for SPA fallback. The display-name refactor (dropping `campaignName` and similar fields from the `view` type) is a prerequisite for the migration and should be completed first.

### Rejected Routing Alternatives

URL-sync via `history.pushState` without a routing library was evaluated in a spike. It is viable for the current set of views but requires the team to own a custom serialization layer and re-solve routing edge cases over time. It was rejected in favor of React Router once the team assessed the long-term maintenance comparison.

Retaining the Zustand-only navigation model with no URL support was the initial approach and was sufficient during early development, but it was explicitly deferred rather than decided, and the product requirement for shareable deep-link URLs makes it no longer acceptable.

## Rejected Alternatives

Ad hoc local state plus Context was rejected because it tends to produce inconsistent patterns and weaker traceability as the application grows.

Redux Toolkit was rejected for now because it introduces more ceremony than desired for the expected team size and iteration speed, while Zustand plus conventions can provide the required structure with less boilerplate.

Zustand without a formal actions-and-state separation was rejected because it makes it too easy for mutations and workflow logic to spread across arbitrary call sites.

## Adoption

This decision is considered adopted when new frontend work follows the implementation rules defined in TS-00X Frontend UI Technical Standard and code review verifies conformance around stateless components, named actions, store boundaries, persistence practices, and externally controlled shadcn/ui primitives.

