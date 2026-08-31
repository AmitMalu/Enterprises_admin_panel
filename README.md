# Enterprise Admin Portal (`Enterprise_Admin_Portal`)

Back-office admin web app for the Instant Mudra / NFTTech fintech platform. A single-page
React app used by internal staff and white-label admins to manage the whole network:
**Masters** (bank / location / vendor credentials), **Schemes** (commission setup &
allocation), **Funding** (prefund approval, credit/debit), **Management** (create & manage the
retailer hierarchy, KYC, user configuration), **Reports & Logs**, **Notifications**,
**Support**, and **Website Settings** (white-label branding).

It shares the backend and the multi-tenant model with **Enterprise Portal** (`retailer_web`).
`API_Admin_Panel` is a reduced clone of this repo for managing API-integration partners.

---

## Table of contents

1. [Tech stack](#tech-stack)
2. [Quick start](#quick-start)
3. [Environment variables](#environment-variables)
4. [npm scripts](#npm-scripts)
5. [Project structure](#project-structure)
6. [Application bootstrap](#application-bootstrap)
7. [Routing & access control](#routing--access-control)
8. [State management (Redux)](#state-management-redux)
9. [API layer](#api-layer)
10. [Feature modules](#feature-modules)
11. [White-label branding management](#white-label-branding-management)
12. [Build system](#build-system)
13. [Deployment](#deployment)
14. [Branch model](#branch-model)
15. [Troubleshooting](#troubleshooting)

---

## Tech stack

| Area | Choice |
|------|--------|
| Framework | **React 18** + **TypeScript**, bundled with **Vite 6** |
| UI | **Mantine 7** + **Tailwind CSS 3** (no MUI) |
| State | **Redux Toolkit** + **redux-persist** (localStorage) with `<PersistGate>` |
| Data fetching | **axios** (configured instance in `src/Config/Api/`) |
| Forms | **Formik** + **Yup** |
| Routing | **react-router-dom v7** (route groups composed in `AppRoutes.tsx`) |
| SVG | **vite-plugin-svgr** — import `.svg` as React components (`exportType: "default"`) |
| Misc | recharts, @mantine/charts, xlsx, papaparse, country-state-city, moment |
| Lint | ESLint (flat config) + typescript-eslint |
| Deploy target | Static files served by **nginx** (production) / **Apache Tomcat** (UAT, via `app.war`) |

Pure static SPA — no backend in this repo. All data comes from the Spring Boot backend.

---

## Quick start

```bash
# Node >= 18 (Node 20 LTS recommended)
git clone https://github.com/Instant-Mudra-Prepaid/Enterprise_Admin_Portal.git
cd Enterprise_Admin_Portal
git checkout DEV

# place .env.development / .env.uat / .env.production in the repo root
# (git-ignored; get them from the handover bundle or the team)

npm ci
npm run dev        # http://localhost:5173  (app is mounted under VITE_BASE_PATH)
```

---

## Environment variables

Chosen by `--mode` → loads `.env.<mode>`. `.env.example` is the committed template; real
files are git-ignored.

| Var | Purpose |
|-----|---------|
| `VITE_API_BASE_URL` | Backend REST base URL (e.g. `https://api.nfttech.in/enterprises`) |
| `VITE_BASE_PATH` | URL sub-path the app is mounted at. **Must match the nginx `location` / Tomcat context.** Feeds `vite.config.ts` `base` and the router. e.g. prod = `/enterprise`, uat = `/enterprise-admin`. |
| `VITE_SECRET_KEY` | AES key for encrypting the login credential payload (must match the backend). |

---

## npm scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Vite dev server, mode `development` |
| `npm run dev:uat` / `dev:prod` | dev server with `uat` / `production` env |
| `npm run build` | `rimraf dist` → `tsc -b` → `vite build --mode production` → `copy-webxml` |
| `npm run build:uat` / `build:dev` | same, other modes |
| `npm run war` / `war:uat` | `build` then package `dist/` → `app.war` (Tomcat) |
| `npm run preview` | serve the built `dist/` |
| `npm run lint` | ESLint |

**Prebuild hook:** `scripts/generateBuildInfo.cjs` writes `src/buildInfo.ts`
(`{ version, builtAt }`, git-ignored). Helper `.cjs` scripts: `generateBuildInfo`,
`copyWebXml` (Tomcat SPA fallback), `createWar`.

Install with plain **`npm ci`** (no `--legacy-peer-deps` needed here, unlike `retailer_web`).

---

## Project structure

```
src/
├── main.tsx                 Bootstrap: ErrorBoundary → MantineProvider → <Provider store> →
│                            <PersistGate> → <App/>
├── App.tsx                  renders <AppRoutes/>
├── Routes/
│   ├── AppRoutes.tsx        composes all route groups under <AuthLayout> / <MainLayout>
│   ├── ProtectedRoutes.tsx  token check + permission-based route gating
│   ├── AuthRoutes.tsx  MasterRoutes.tsx  FundingRoutes.tsx  ManagementRoutes.tsx
│   ├── SchemeRoutes.tsx  ReportRoutes.tsx  NotificationRoutes.tsx  SupportRoutes.tsx
│   ├── WebSettingRoutes.tsx  MyAccountRoutes.tsx  LogsRoute.tsx  NotFoundRoute.tsx
├── Pages/
│   ├── Auth/                Login, ChangePassword, ForgotPassword, Otp, SetPassword
│   ├── Dashboard/           HomePage
│   ├── Master/       (~25)  Bank / Network Bank / Location / Country / Vendor Credential /
│   │                        Sub-Operator masters
│   ├── Schemes/      (~12)  scheme creation, scheme settings, allocation, transaction limits
│   ├── Funding/      (~10)  prefund request approval, funding credit/debit, update txn,
│   │                        settlement, add remark
│   ├── Management/   (~59)  create hierarchy (White Label / Super Distributor / Partner /
│   │                        Distributor / Retailer), view / edit / configure users, KYC,
│   │                        pending users, wallet preview, admin-user changes
│   ├── Reports/      (~23)  transaction / ledger / settlement / refund / download reports
│   ├── ReportLogs/          activity / system logs
│   ├── Notification/        notification composer + list
│   ├── WebsiteSettings/     white-label branding management (logo / colours / PDFs per tenant)
│   ├── Support/             ticketing
│   └── Account/             Profile
├── Components/
│   ├── Atoms / Molecules / Organisms
│   └── Layout/              AuthLayout, MainLayout (sidebar + header), FullPageLoader
├── Config/
│   ├── Api/                 AxiosInstance.ts, AxiosConfig.ts, EndPoints.ts, UserFormEndPoint.ts
│   ├── Menus/MenuItems.ts   sidebar menu definition (+ permission codes)
│   └── Auth / Funding / Management / Master / Reports / Schemes / …   per-module form &
│                            table config (column defs, field lists, dropdown options)
├── Redux/
│   ├── Store/store.ts       configureStore + redux-persist
│   └── Features/            Auth, Fundings, Management, Masters, Menu, Schemes, locationSlice
├── Utils/
│   ├── utils.ts             redirectTo, clearStorage, checkTokenValidity, misc
│   ├── getAllowedBaseLinks.ts   maps permission codes → allowed route prefixes
│   ├── ErrorFallback.tsx
│   └── hooks/
├── theme/                   Mantine theme config
├── types/                   shared TS types
└── assets/                  Icons, Images

deploy-resources/WEB-INF/web.xml   Tomcat SPA-fallback config
scripts/*.cjs                       build helpers
app.war                             a previously built WAR artifact
```

`vite-plugin-svgr` is configured so `import Icon from './x.svg'` gives a React component.

---

## Application bootstrap

`main.tsx`: `ErrorBoundary` → `MantineProvider` → `<Provider store>` →
`<PersistGate persistor>` → `<App/>` → `<AppRoutes/>`.

`AppRoutes.tsx` mounts `<AuthLayout>` for `{AuthRoutes}` and, behind `<ProtectedRoutes>`,
`<MainLayout>` for every feature route group (`{MasterRoutes}`, `{FundingRoutes}`,
`{ManagementRoutes}`, `{SchemesRoutes}`, `{ReportRoutes}`, …).

---

## Routing & access control

`Routes/ProtectedRoutes.tsx`:

1. Reads `localStorage.token`; `checkTokenValidity(token)` → invalid → `clearStorage()` +
   redirect `/login`.
2. Reads `localStorage.userInfo` → `role` + `permissions` (a comma-separated string of
   4-char codes, e.g. `"0101,0203,0103"`).
3. For roles **`AU`** (admin user) and **`WLAU`** (white-label admin user):
   `getAllowedBaseLinks(role, permissions)` returns the route prefixes that user may open;
   any path outside those (except `/`, `/account/profile`, `/change-password`) → redirect `/`.
   Other roles (e.g. super admin) are unrestricted.

> Auth here is **localStorage-based** (`token` + `userInfo`), different from Enterprise
> Portal which uses an `authToken` cookie + encrypted Redux `loginData`.

Menu (`Config/Menus/MenuItems.ts`) is filtered against the same permission codes so users
only see items they can open.

---

## State management (Redux)

- Redux Toolkit store at `Redux/Store/store.ts`, persisted with redux-persist +
  `<PersistGate>`.
- Feature slices under `Redux/Features/`: **Auth**, **Fundings**, **Management**, **Masters**,
  **Menu**, **Schemes**, plus `locationSlice.ts` (lat/lng/IP for request headers).

---

## API layer

`src/Config/Api/`:

| File | Role |
|------|------|
| `AxiosInstance.ts` | the configured axios instance |
| `AxiosConfig.ts` | interceptors — attaches the auth token + location headers, handles errors / 401 |
| `EndPoints.ts` | all REST endpoint URL constants (built from `VITE_API_BASE_URL`) |
| `UserFormEndPoint.ts` | endpoints specific to the (large) user-creation / management module |

---

## Feature modules

| Module | Route group | What it does |
|--------|-------------|--------------|
| **Dashboard** | `/` | network summary / KPIs |
| **Master** | `MasterRoutes` | Bank master, Network Bank master, Location master, Country master, Vendor Credential master, Sub-Operator master — the reference data products/transactions depend on |
| **Schemes** | `SchemeRoutes` | create commission schemes, scheme settings, allocate schemes to hierarchy nodes, transaction-limit settings |
| **Funding** | `FundingRoutes` | approve prefund requests, credit/debit a wallet, update a transaction, settlement, add remarks |
| **Management** | `ManagementRoutes` | create the hierarchy (White Label → Super Distributor → Partner → Distributor → Retailer), view/edit/configure users, KYC, pending users, wallet preview, admin-user changes. **Largest module (~59 files).** Config in `Config/Management/` + `Config/UserCreationConfig/`. |
| **Reports** | `ReportRoutes` | transaction, ledger, settlement, refund, commission, downloadable reports |
| **Report Logs** | `LogsRoute` | activity / system logs |
| **Notification** | `NotificationRoutes` | compose & list push notifications |
| **Website Settings** | `WebSettingRoutes` | white-label branding management (see below) |
| **Support** | `SupportRoutes` | ticketing |
| **My Account** | `MyAccountRoutes` | profile, change password |

Each module has a `Config/<Module>/` folder holding column definitions, form field lists and
dropdown option sets, so the pages are largely config-driven.

---

## White-label branding management

`Pages/WebsiteSettings/` is the admin UI for the multi-tenant branding that Enterprise Portal
consumes. An admin uploads a tenant's logo, login background, favicon, login artwork and
policy PDFs; the backend (Spring Boot) stores the files, sets permissions, NFS-syncs them to
the frontend VM's `/var/www/white-label-assets/`, and records **relative** paths in the
`tenant_branding` table. Enterprise Portal then resolves them at runtime via the
`X-Tenant-Domain` header. Onboarding a new white-label customer also needs a load-balancer
rule, DNS, an SSL cert, and a `tenant_branding` DB row — no code change.

---

## Build system

`npm run build` → `rimraf dist` → `tsc -b` → `vite build --mode <mode>` → `copyWebXml.cjs`.
Output: `dist/` (`index.html` + hashed `assets/` + `WEB-INF/web.xml`).

- `vite.config.ts` `base` = `VITE_BASE_PATH` — asset URLs get that prefix, so it must match
  the serving path. Mismatch → 404 on `assets/*.js`.
- `npm run war` zips `dist/` → `app.war` for Tomcat.

---

## Deployment

Frontend VM is on a private `10.1.3.x` network — **connect the corporate VPN (FortiClient)
first**, then `ssh ciuser@10.1.3.4`. SSL is terminated at the load balancer.

### Production (nginx static, `main` branch)

nginx on `10.1.3.4` serves this build from `/var/www/enterprise-admin/` on port **80**
(`admin.nfttech.in`, path `/enterprise/`). Two ways:

1. **Internal Deployment Console** — `https://admin.nfttech.in/internal/deployment-console/`
   → **Deploy Admin** → enter the deploy password.
2. **Manual** —
   ```bash
   ssh ciuser@10.1.3.4
   /opt/scripts/deploy-enterprise-admin.sh            # deploys origin/main
   /opt/scripts/deploy-enterprise-admin.sh <branch>
   ```
   Script: `git fetch` + `checkout` + `pull` in `/opt/deploy/enterprise-admin` → copy
   `/opt/envs/enterprise-admin/.env.prod` → `.env` → `npm ci` → `npm run build` → back up
   current live folder to `/var/www/backup/` → replace `/var/www/enterprise-admin/` with
   `dist/` → `systemctl reload nginx` → keep last 3 backups.

**Rollback:** `/opt/scripts/rollback-enterprise-admin.sh`.

### UAT (Tomcat, `DEV` branch)

On the UAT server: the equivalent deploy script (defaults to `DEV`) builds with
`npm run build:uat` and deploys into Tomcat `webapps/enterprise-admin/`. Serves
`https://uat.nfttech.in/enterprises`.

> Full infra details (VPN credentials, server layout, PM2, nginx config) are in the handover
> bundle given to the manager — not in this repo.

---

## Branch model

`feature/*` → PR → **`DEV`** (serves to UAT) → PR → **`main`** (deploy to production).
Historical branches (`bugs-v4.x`, `fixes-vN`, `<name>-dev`, …) are old — only `DEV` and
`main` are current. Conventional Commits (`feat(...)`, `fix(...)`, `chore(...)`).

---

## Troubleshooting

| Symptom | Cause / fix |
|--------|-------------|
| Blank page, console 404s for `/assets/*.js` | `VITE_BASE_PATH` doesn't match the URL path being loaded |
| Redirected to `/login` immediately | `localStorage.token` missing/expired (`checkTokenValidity`) |
| Logged in but some menu items / pages redirect to `/` | user's `permissions` codes don't include that module (`getAllowedBaseLinks`) — expected for `AU` / `WLAU` |
| `SECRET_KEY`-type error at login | `.env.development` missing / missing `VITE_SECRET_KEY`; restart dev server |
| API calls 401 | wrong `VITE_API_BASE_URL`, or backend `VITE_SECRET_KEY` mismatch |
| Type errors only during `build` | `build` runs `tsc -b`; `dev` doesn't — run `npx tsc -b` while developing |
| SVG import is a string not a component | `vite-plugin-svgr` config — see `vite.config.ts` |
| Env change not applied | Vite reads `.env` only at startup — restart `npm run dev` |
