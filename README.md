# proto-next

Next.js prototype with shadcn/ui + Tailwind CSS v4, deployed to GCP Cloud Run.

## Stack

- **Framework**: Next.js (App Router)
- **UI**: shadcn/ui + Tailwind CSS v4
- **Database**: GCP Firestore (Native mode)
- **Runtime**: Node 24 / pnpm
- **Deploy**: GCP Cloud Run via Cloud Build

## Live

https://proto-next-gz74xlyiqa-uc.a.run.app

## Local development

```bash
pnpm dev
```

## Add shadcn components

```bash
pnpm dlx shadcn@latest add <component>
```

## Data

Firestore collection: `items` — read via `lib/items.ts` shared by both the home page (Server Component) and `GET /api/items` (Route Handler).

### Local development credentials

Firestore uses Application Default Credentials. Run once:

```bash
gcloud auth application-default login
```

Then set the project in `.env.local` (already present, not committed):

```
GOOGLE_CLOUD_PROJECT=proto-next
```

### Seed data

```bash
node scripts/seed.ts   # placeholder — items were seeded manually via Node script
```

## Deploy to GCP

### Prerequisites

1. GCP project with billing enabled
2. APIs enabled: Cloud Run, Cloud Build, Artifact Registry, Firestore
3. Firestore database created (Native mode, `us-central1`)
4. Cloud Run default compute SA granted `roles/datastore.user`
5. Artifact Registry repo created:

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

pnpm 11 blocks native build scripts by default. In Docker/Cloud Build, `pnpm-workspace.yaml`
and `.npmrc` approaches don't reliably suppress the error. The confirmed fix is
`--ignore-scripts` in the Docker deps stage — `sharp` falls back to Next.js's built-in
squoosh optimizer, which is fine for a POC.

### `--allow-unauthenticated` alone is not enough on new GCP projects

Cloud Run's `--allow-unauthenticated` deploy flag does not set the IAM policy on new
projects where the default is deny-all. The `roles/run.invoker` binding for `allUsers`
must be set once manually:

```bash
gcloud run services add-iam-policy-binding proto-next \
  --region=us-central1 --member=allUsers --role=roles/run.invoker
```

### Firestore-reading pages require `export const dynamic = "force-dynamic"`

Next.js tries to statically generate pages at build time. Any page or route handler
that reads from Firestore will timeout during `next build` — the Docker build environment
has no Firestore credentials. `force-dynamic` opts out of static generation so Firestore
is only called at request time, where Cloud Run's ADC works automatically.
