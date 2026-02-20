# ITX Frontend - Mobile Store

SPA for browsing and purchasing mobile devices, built as a frontend technical assessment.

## Requirements

- Node.js >= 18
- pnpm

## Installation

    pnpm install

## Available scripts

| Script | Command | Description |
|--------|---------|-------------|
| Start | `pnpm start` | Start the development server |
| Build | `pnpm build` | Generate the production build |
| Test | `pnpm test` | Run the test suite |
| Lint | `pnpm lint` | Check code quality |

## Tech stack

- **React** — UI library
- **Vite** — bundler and dev server
- **Wouter** — lightweight router (~2KB), suitable for the app's 2 routes
- **Tailwind CSS & shadcn/ui** — utility-first styling and accessible UI components
- **Vitest** — testing framework
- **ESLint** — linting

## Project structure

    src/
    ├── components/     # Reusable components (Header, ProductCard, SearchBar, ui/)
    ├── pages/          # Main views (ProductListPage, ProductDetailPage)
    ├── services/       # API integration
    ├── hooks/          # Custom hooks (cart, etc.)
    ├── utils/          # Storage management (TTL cache logic)
    ├── App.jsx         # Route definitions
    └── main.jsx        # Entry point

## Technical decisions

### Unified Storage Strategy (Cache & Cart)
Both the API cache and the cart state are managed via `localStorage`. This provides a consistent persistence layer and ensures that data survives page reloads and closed tabs, significantly improving the user experience.

To strictly comply with the API cache 1-hour expiration requirement, a custom TTL (Time-To-Live) wrapper was implemented around the `localStorage` API. When data is fetched, it is saved along with a timestamp. Before retrieving cached data, the timestamp is evaluated; if more than an hour has passed, the entry is invalidated, cleared to free up space, and a new network request is triggered.

### Routing
`wouter` was chosen over heavier alternatives like `react-router` because the application only requires two straightforward routes. This decision keeps the bundle size minimal and the routing logic clean.

### Breadcrumb navigation
The breadcrumb is rendered in the `Header` component and adapts dynamically based on the current route using `useLocation` from wouter. On the home page it displays "Home" as plain text, and on the product detail page it shows "Home > Product {id}" with a navigable link back to the listing. Since the Header does not have access to the product data (brand/model), the product ID from the URL is used instead to avoid introducing an additional context or prop drilling for a two-route application. If more routes or richer breadcrumb content were needed, a dedicated `BreadcrumbContext` could be created to allow each page to provide its own breadcrumb data to the Header.

### Testing approach
Testing is intentionally focused on the core business logic rather than pure UI rendering. Unit tests validate the custom hooks (cart state management) and the crucial 1-hour expiration logic of the custom `localStorage` wrapper to ensure data is revalidated accurately.

## Features

- **Product listing** — responsive grid (max 4 columns) with real-time search by brand and model
- **Product detail** — image, specs, and color/storage selectors
- **Cart** — add products with a persistent item count in the header. The cart count is accumulated client-side because the API POST `/cart` endpoint always returns `{ count: 1 }` rather than the total number of items in the cart
- **Cache** — client-side API response caching using `localStorage` with a strict 1-hour expiration