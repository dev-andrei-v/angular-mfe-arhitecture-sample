# Angular Module Federation - Micro-Frontend Sample

A micro-frontend architecture built with **Angular 19** and **Webpack Module Federation**, demonstrating how to compose independently deployable Angular applications into a unified shell.

## Architecture Overview

```mermaid
graph TB
    subgraph Shell["main-mfe (Shell) — :4200"]
        Sidebar["Sidebar Navigation"]
        Router["&lt;router-outlet&gt;"]
        Manifest["mf.manifest.json"]
    end

    subgraph Orders["orders-mfe (Remote) — :4201"]
        OEntry["remoteEntry.js"]
        ORoutes["./Routes → ORDERS_ROUTES"]
        OView["OrdersViewComponent"]
    end

    subgraph PCs["pcs-mfe (Remote) — :4202"]
        PEntry["remoteEntry.js"]
        PRoutes["./Routes → PCS_ROUTES"]
        PView["PcsViewComponent"]
    end

    Sidebar -- "/orders" --> Router
    Sidebar -- "/pcs" --> Router
    Manifest -.->|discovers| OEntry
    Manifest -.->|discovers| PEntry
    Router -->|loadRemoteModule| ORoutes --> OView
    Router -->|loadRemoteModule| PRoutes --> PView
```

### How It Works

1. **Shell bootstrap** — `main-mfe` initializes Module Federation by loading `mf.manifest.json`, which maps remote names to their `remoteEntry.js` URLs.
2. **Lazy routing** — Angular routes in the shell use `loadRemoteModule()` to fetch remote route definitions on demand.
3. **Shared dependencies** — All apps share Angular, RxJS, and other core libraries as singletons (`shareAll` with `strictVersion: true`), so only one copy of each is loaded at runtime.

### Bootstrap Sequence

```mermaid
sequenceDiagram
    participant Browser
    participant Shell as main-mfe (Shell)
    participant Manifest as mf.manifest.json
    participant Remote as orders-mfe / pcs-mfe

    Browser->>Shell: Load http://localhost:4200
    Shell->>Manifest: initFederation('mf.manifest.json')
    Manifest-->>Shell: Remote entry URLs
    Shell->>Shell: import('./bootstrap') → bootstrapApplication()
    Browser->>Shell: User navigates to /orders
    Shell->>Remote: Fetch remoteEntry.js
    Remote-->>Shell: Exposed ./Routes module
    Shell->>Shell: Register ORDERS_ROUTES in router-outlet
    Shell-->>Browser: Render OrdersViewComponent
```

### Shared Dependencies

```mermaid
graph LR
    subgraph Shared["Shared Singletons (strictVersion)"]
        Angular["@angular/* 19.2"]
        RxJS["rxjs 7.8"]
        Zone["zone.js 0.15"]
    end

    Shell["main-mfe"] --> Shared
    Orders["orders-mfe"] --> Shared
    PCs["pcs-mfe"] --> Shared
```

## Project Structure

```
angular-module-federation-mfe-sample/
├── main-mfe/       # Shell (host) application
├── orders-mfe/     # Remote — orders management view
└── pcs-mfe/        # Remote — PC products catalog view
```

Each application is a standalone Angular CLI project with its own `package.json`, `angular.json`, and webpack config.

## Key Files

| File | Purpose |
|------|---------|
| `main-mfe/public/mf.manifest.json` | Maps remote names → `remoteEntry.js` URLs |
| `main-mfe/src/main.ts` | Calls `initFederation()` before bootstrapping |
| `main-mfe/src/app/app.routes.ts` | Defines lazy routes that load remote modules |
| `main-mfe/src/decl.d.ts` | TypeScript declarations for remote modules |
| `orders-mfe/webpack.config.js` | Exposes `./Routes` from orders app |
| `pcs-mfe/webpack.config.js` | Exposes `./Routes` from PCs app |

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- Angular CLI 19+

### Install Dependencies

```bash
cd main-mfe && npm install
cd ../orders-mfe && npm install
cd ../pcs-mfe && npm install
```

### Run All Applications

Start each app in a separate terminal:

```bash
# Terminal 1 — Shell
cd main-mfe && npm start        # http://localhost:4200

# Terminal 2 — Orders remote
cd orders-mfe && npm start      # http://localhost:4201

# Terminal 3 — PCs remote
cd pcs-mfe && npm start         # http://localhost:4202
```

Open `http://localhost:4200` to see the shell with both remotes loaded.

## Module Federation Configuration

### Remotes (orders-mfe, pcs-mfe)

Each remote declares a `name` and what it `exposes`:

```js
// orders-mfe/webpack.config.js
module.exports = withModuleFederationPlugin({
  name: 'orders-mfe',
  exposes: {
    './Routes': './src/app/orders/orders.routes.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
```

### Shell (main-mfe)

The shell doesn't expose anything — it only consumes remotes via the manifest:

```json
{
  "orders-mfe": "http://localhost:4201/remoteEntry.js",
  "pcs-mfe": "http://localhost:4202/remoteEntry.js"
}
```

Routes load remote modules dynamically:

```ts
{
  path: 'orders',
  loadChildren: () =>
    loadRemoteModule({
      type: 'manifest',
      remoteName: 'orders-mfe',
      exposedModule: './Routes',
    }).then((m) => m.ORDERS_ROUTES),
}
```

## Shared Dependencies Strategy

All applications use `shareAll()` with:

- **`singleton: true`** — one instance of each shared library across all remotes
- **`strictVersion: true`** — version mismatches throw errors instead of silently loading duplicates
- **`requiredVersion: 'auto'`** — reads versions from each app's `package.json`

This requires all apps to use the same Angular and RxJS versions.

## Tech Stack

- Angular 19.2
- TypeScript 5.7
- Webpack Module Federation (`@angular-architects/module-federation` ^19.0.3)
- `ngx-build-plus` for custom webpack config integration
- Karma + Jasmine for testing
