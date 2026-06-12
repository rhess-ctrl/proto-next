# proto-next

Next.js prototype with shadcn/ui + Tailwind CSS v4, deployed to GCP Cloud Run.

## Stack

- **Framework**: Next.js (App Router)
- **UI**: shadcn/ui + Tailwind CSS v4
- **Runtime**: Node 24 / pnpm
- **Deploy**: GCP Cloud Run via Cloud Build

## Local development

```bash
pnpm dev
```

## Add shadcn components

```bash
pnpm dlx shadcn@latest add <component>
```

## Deploy to GCP

### Prerequisites

1. GCP project with billing enabled
2. APIs enabled: Cloud Run, Cloud Build, Artifact Registry
3. Artifact Registry repo created:

```bash
gcloud artifacts repositories create proto-next \
  --repository-format=docker \
  --location=us-central1
```

### Trigger a build

```bash
gcloud builds submit --config cloudbuild.yaml \
  --substitutions=_REGION=us-central1,_SERVICE=proto-next,_REPO=proto-next
```

Or connect the repo to Cloud Build for automatic deploys on push to `main`.

## Known gotchas

### `output: "standalone"` is required for Cloud Run

`next.config.ts` must have `output: "standalone"`. Without it, Next.js won't emit
`server.js` into `.next/standalone/` and the Docker `CMD ["node", "server.js"]` will
fail at container startup.

### pnpm 11 build approvals for `sharp` and `unrs-resolver`

pnpm 11 blocks native build scripts by default. The `pnpm.yaml` at the repo root
opts these two packages back in via `onlyBuiltDependencies`. Note: the `pnpm` field
inside `package.json` no longer works in pnpm 11 — it must be in `pnpm.yaml`.
