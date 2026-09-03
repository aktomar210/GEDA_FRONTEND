# GEDA SCADA SaaS Platform — Frontend

Deployed on Vercel with SPA routing handled via `vercel.json` (rewrites all
paths to `index.html` so client-side routes like `/dashboard` work on direct
load/refresh, not just in-app navigation).

React + TypeScript single-page application for the GEDA IIoT SCADA SaaS demo slice
(Login/OTP, Dashboard, Device Management), built by Qpaix Infitech Pvt Ltd.

## Prerequisites

- Node.js 18+ (LTS) and npm
- The `backend` service (see `../backend/README.md`) running locally on
  `http://localhost:8080`, with Flyway migrations applied and seed data loaded

## Install

```bash
npm install
```

## Run (development)

```bash
npm run dev
```

The app starts on **http://localhost:5173**.

The API base URL is read from `VITE_API_BASE_URL` in `.env.development`
(committed, points at `http://localhost:8080/api` by default). Override it
with a local `.env.development.local` if your backend runs elsewhere.

## Build

```bash
npm run build
```

Type-checks the project (`tsc -b`) and produces a production build in `dist/`.

```bash
npm run preview
```

Serves the production build locally for a final check.

## Logging in

Login requires the backend to be up and running with seeded data. Use the
seeded demo admin account:

- **Username:** `admin`
- **Password:** `Admin@123`

This account has MFA enabled, so after submitting the password you'll land on
a one-time-passcode (OTP) screen. When the backend is running with its `dev`
profile active (`app.otp.dev-expose=true`), the login response includes the
OTP in a `devOtpCode` field and the OTP screen shows it in a clearly-marked
**"DEV MODE — OTP: ######"** banner so you can self-test without checking
server logs. In a production-like backend response this field is simply
absent and the banner does not render — otherwise, check the backend console
log for the generated code.

## What's implemented in this slice

- **Login / MFA** — two-step wizard (password, then 6-digit OTP), "Forgot
  Password?" stub flow, dev-mode OTP banner.
- **Dashboard** — KPI cards (devices onboarded, systems online %, active
  alerts, average generation today), 24-hour generation trend chart, org
  hierarchy tree (State > DISCOM > Division > Plant), recent alerts feed.
- **Devices** — server-side searchable/filterable/paginated device table,
  provision-new-device modal, CSV bulk-import modal, TLS certificate
  regeneration.
- **Navigation stubs** — Tag Config, Alerts (standalone page), Reports,
  Billing, Users & Roles, and Data Export are visible in the sidebar but
  disabled with a "Coming soon" tooltip; they are out of scope for this
  slice.

## Project structure

```
src/
  api/        axios client + envelope unwrapping + typed endpoint wrappers
  auth/       AuthContext, ProtectedRoute, pending-MFA state
  layout/     AppLayout (Drawer + AppBar), Sidebar, Topbar
  pages/      login/, dashboard/, devices/ (each with a components/ folder)
  theme/      MUI theme (navy/gold palette) + shared status color maps
  types/      TypeScript interfaces mirroring the backend REST contract
  utils/      date/number formatters
```

## Notes for backend integration

- All API responses are expected to be wrapped in an envelope:
  `{ success, data, error }`. The axios response interceptor in
  `src/api/client.ts` unwraps `.data` on success and throws a normalized
  `ApiClientError` (message + code) on `success: false` or HTTP error —
  components never see the envelope directly.
- A `401` response triggers an automatic logout via a callback the
  `AuthProvider` registers with the axios client at mount time.
- Device list/pagination assumes a Spring `Page`-style response:
  `{ content, totalElements, totalPages, number, size }`.
