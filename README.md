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
