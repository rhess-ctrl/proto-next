# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # start dev server
pnpm build        # production build
pnpm lint         # ESLint
```

No test runner is configured. Playwright is installed as a dev dependency but no test files exist yet.

Add shadcn components:
```bash
pnpm dlx shadcn@latest add <component>
```

## Architecture

Next.js 16 App Router project using TypeScript, Tailwind CSS v4, and shadcn/ui.

**Data flow:** Firestore (`lib/firestore.ts`) initializes firebase-admin via Application Default Credentials and exports `db`. `lib/items.ts` wraps collection queries. Both the home page Server Component (`app/page.tsx`) and the API route (`app/api/items/route.ts`) call `getItems()` from the same shared lib.

**Key constraint:** Any page or route handler that reads Firestore must export `export const dynamic = "force-dynamic"` — without it, Next.js attempts static generation at build time where no Firestore credentials exist.

## First-time machine setup

Two separate gcloud auth steps are needed — one for the app (ADC), one for the CLI (deploy):

```bash
# 1. Local Firestore credentials (used by firebase-admin at runtime)
gcloud auth application-default login
gcloud auth application-default set-quota-project proto-next  # required — skipping causes 500s

# 2. CLI credentials (used by gcloud builds submit)
gcloud auth login
gcloud config set project proto-next
```

`.env.local` (not committed) must contain:
```
GOOGLE_CLOUD_PROJECT=proto-next
```

## Deployment

Cloud Run via Cloud Build (`cloudbuild.yaml`). `next.config.ts` must keep `output: "standalone"` — required for the `node server.js` Docker entrypoint.

Trigger a manual build:
```bash
gcloud builds submit --config cloudbuild.yaml \
  --substitutions=_REGION=us-central1,_SERVICE=proto-next,_REPO=proto-next
```

## Known gotchas

- **pnpm 11 + native modules**: Docker deps stage uses `--ignore-scripts` to avoid pnpm 11 blocking `sharp`/`unrs-resolver` build approvals. `sharp` falls back to Next.js's squoosh optimizer.
- **Cloud Run public access**: `--allow-unauthenticated` flag alone is insufficient on new GCP projects. Must also set the IAM binding once: `gcloud run services add-iam-policy-binding proto-next --region=us-central1 --member=allUsers --role=roles/run.invoker`.
