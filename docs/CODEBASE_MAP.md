# PROJECT_MAP

## 1) Repository Overview

This repository is a frontend React application for a sneaker store experience (product browsing, favorites, cart, and checkout flow).

It is a client-side single-page application (SPA) with:
- route-based pages (home, favorites, not-found)
- local UI state and context-based shared state
- remote product/cart data loaded from a mock REST API
- form-driven dialogs for login/sign-up and checkout

## 2) Main Technologies

- Language: JavaScript (ES2022), JSX
- UI Framework: React 18
- Routing: react-router-dom v6
- UI Toolkit: MUI (Material UI) + Emotion
- Styling: SCSS + CSS Modules
- HTTP Client: axios
- Forms: react-hook-form + yup + @hookform/resolvers
- Notifications: react-toastify
- Build Toolchain: Create React App (react-scripts)
- Package Manager: npm (package-lock.json present)
- Lint/Format: ESLint + Prettier
- Data backend (external): MockAPI REST endpoint

## 3) Directory Structure

- public/
  - Static HTML and PWA metadata (index.html, manifest.json, robots.txt).
- src/
  - index.js, index.scss: frontend bootstrap and global styles.
  - assets/
    - images/: static UI images/icons.
    - data/shop-items.json: local sample catalog data (currently not referenced in runtime code).
  - modules/
    - Home/: home page feature (catalog loading, search, list rendering).
    - Favorites/: favorites page feature.
  - shared/
    - actions/: action constants and action creator used by reducers.
    - components/: reusable UI building blocks and app shell pieces.
    - context/: React Context providers for user modal state, favorites, shopping cart.
    - reducers/: reducer hooks for products/cart state transitions.
    - utilities/: formatting, HTTP instance, toast, validation schemas.
  - styles/: shared SCSS modules (buttons, typography).
  - theme/: MUI theme setup (palette + typography).
- .github/prompts/
  - Prompt assets for AI workflows (includes Cartograph prompt).
- Root configs
  - package.json, jsconfig.json, .eslintrc.json, .prettierrc.

## 4) Entry Points

Primary entry points and bootstrap files:
- src/index.js
  - Creates React root and wraps App with providers:
    - StyledEngineProvider
    - ThemeProvider
    - BrowserRouter
    - UserProvider
    - FavoritesProvider
    - ShoppingCartProvider
- src/shared/components/App/index.js
  - Defines route tree:
    - / -> AppLayout + Home
    - /favorites -> Favorites
    - * -> Not found view
- src/shared/components/AppLayout/index.js
  - Main shell with Header, routed content (Outlet), ToastContainer, cart Drawer, Login, SignUp dialogs.

## 5) Core Modules

### App Shell and Navigation
- Location: src/shared/components/App and src/shared/components/AppLayout
- Responsibility: global layout, route hosting, cross-cutting UI (toasts, cart drawer, dialogs).
- Interacts with: router, shopping cart context, user context, feature pages.

### Home Feature
- Location: src/modules/Home
- Responsibility: load products, support search filtering, render product cards/skeleton loaders.
- Interacts with: products reducer hook, axios HTTP utility, toast utility, shared card/list components.

### Favorites Feature
- Location: src/modules/Favorites + src/shared/context/FavoritesContext.js
- Responsibility: display/manage favorite items.
- Interacts with: Card component, FavoritesContext, localStorage synchronization.

### Shopping Cart Domain
- Location:
  - src/shared/context/ShoppingCartContext.js
  - src/shared/reducers/shoppingCartReducer.js
  - src/shared/components/ShoppingCart/*
- Responsibility: cart state lifecycle (open/close, fetch/add/remove, checkout states, totals).
- Interacts with: mock API endpoints, reducer actions, cart-related UI subcomponents, toast utility.

### User Modal State
- Location: src/shared/context/UserContext.js, src/shared/components/Login, src/shared/components/SignUp
- Responsibility: open/close coordination between login and sign-up dialogs.
- Interacts with: header profile action, form components, yup schemas.

### Shared Form Layer
- Location: src/shared/components/Form*
- Responsibility: bridge MUI controls with react-hook-form context via Controller.
- Interacts with: Login, SignUp, ShoppingCartShipping forms.

### Utilities and Theme
- Location: src/shared/utilities and src/theme
- Responsibility:
  - HTTP client setup
  - user-facing error toasts
  - currency formatting
  - validation schemas
  - MUI theme composition
- Interacts with: feature modules and contexts across app.

## 6) Data Flow

### Product catalog flow
1. Home mounts and dispatches FETCH_PRODUCTS_INIT.
2. Home fetches GET /products via shared axios instance.
3. Success dispatches FETCH_PRODUCTS_SUCCESS -> reducer stores products.
4. SearchInput updates local search string.
5. UI derives filtered list with useMemo and renders cards/loaders.
6. Failure dispatches FETCH_PRODUCTS_FAILED and shows toast.

### Favorites flow
1. FavoritesContext initializes from localStorage key favorites.
2. Card toggles favorite add/remove through context actions.
3. Context writes favorites back to localStorage on change.
4. Storage event listener keeps state in sync across browser tabs.

### Cart flow
1. ShoppingCartProvider mounts and dispatches FETCH_CART_INIT.
2. Provider fetches GET /cart; reducer stores items and computed total.
3. Card cart button triggers add/remove handlers in context:
   - add -> POST /cart
   - remove -> DELETE /cart/:id
4. Reducer updates items and total after each success.
5. Checkout form submits -> cart state set to processing -> sequential DELETE for each cart item -> done/error state.
6. ShoppingCart UI switches between items, shipping, and result views based on cartState finite states.

### User modal flow
1. Header profile button opens login modal via UserContext.
2. Login modal can switch to sign-up; sign-up can switch back to login.
3. Context ensures only one auth modal is open at a time.

## 7) External Integrations

- MockAPI REST backend
  - Base URL in src/shared/utilities/http.js
  - Endpoints used:
    - /products
    - /cart
- React Toastify for notification system
- MUI component library and theme engine
- No database, queue, server runtime, or cloud infrastructure code present in this repository.

## 8) Configuration

Important configuration files:
- package.json: dependencies and CRA scripts.
- jsconfig.json: absolute import baseUrl set to src.
- .eslintrc.json: React + hooks + prettier rules, import ordering conventions.
- .prettierrc: formatting style (single quotes, print width 100, etc.).
- public/manifest.json and public/robots.txt: web app metadata/crawler behavior.

Environment variables:
- No process.env / REACT_APP_* usage detected in current source.
- API base URL is currently hardcoded in src/shared/utilities/http.js.

## 9) Testing

- Testing libraries are installed (@testing-library/*, jest-dom), and react-scripts test command exists.
- No test files were found in the current repository snapshot.
- Suggested organization when tests are added:
  - colocated component tests near components/modules (for example, Component.test.js)
  - reducer/context tests under shared/reducers and shared/context where logic is non-trivial.

## 10) Build and Run Commands

Common npm commands:
- Install dependencies: npm install
- Run local dev server: npm start
- Build production bundle: npm run build
- Run tests: npm test
- Eject CRA config (irreversible): npm run eject

Lint and formatting:
- ESLint and Prettier are configured, but lint/format are not currently under scripts in package.json.
- Use directly:
  - npx eslint .
  - npx eslint --fix .
  - npx prettier --write "./**/*.{js,jsx,css,scss,json}"

## 11) Important Conventions

- Import aliasing convention:
  - absolute imports from src root (modules/*, shared/*, assets/*, styles/*), enabled via jsconfig baseUrl.
- Feature layering:
  - modules/ for page-level features.
  - shared/ for reusable cross-feature building blocks.
- Styling:
  - SCSS modules per component/feature, plus shared style modules.
- State management:
  - local component state for local UI concerns.
  - context providers + reducer hooks for shared domain state (cart/products/auth modal state).
- Actions/reducer pattern:
  - action type constants + createAction helper in shared/actions.
  - reducers throw on unknown action type (fail-fast convention).
- Side effects:
  - API calls happen in modules/contexts, with AbortController used for cancellable fetches on unmount.
- Error handling:
  - user-facing failures go through shared toast utility.
- Forms:
  - react-hook-form FormProvider + reusable field wrappers + yup schemas.

## 12) Notes For Future AI-Assisted Development

- Most business logic is in shared context and reducers; start there for behavioral changes.
- API base URL is centralized in one utility; extracting to environment variables would improve deployment flexibility.
- Test setup dependencies are present; adding first tests around reducers and checkout flow would provide fast confidence gains.
