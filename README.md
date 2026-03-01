# Book.me

Book.me is a property booking demo application built with React and TypeScript. It allows users to browse property listings, make reservations, and manage their bookings through a clean and responsive interface.

---

## Technology Stack

| Category | Technologies |
|---|---|
| **Framework** | React 19, TypeScript 5 |
| **Build Tool** | Vite 7 |
| **Routing** | React Router 7 |
| **State Management** | Redux Toolkit 2, React-Redux 9, Redux-Persist 6 |
| **UI & Styling** | Chakra UI 3, Emotion 11, Next-Themes |
| **Forms & Validation** | React Hook Form 7, Zod 4, @hookform/resolvers |
| **Utilities** | date-fns 4, lodash 4, uuid 13, react-day-picker 9, react-icons 5 |
| **Testing** | Vitest 2, @testing-library/react 16, @testing-library/user-event 14, happy-dom 15 |
| **Linting & Formatting** | ESLint 9, Prettier 3 |

---

## Installation

**Prerequisites:** Node.js 22.13.0+ and npm.

```bash
# Clone the repository
git clone https://github.com/your-username/bookme.git
cd bookme

# Install dependencies
npm install

# Start the development server (runs on port 5200)
npm run dev
```

Additional commands:

```bash
npm run build      # Build for production
npm run preview    # Preview the production build
npm run test       # Run tests with UI
npm run test:ci    # Run tests with coverage report
npm run lint       # Lint the codebase
```

---

## Features

The `src/features` directory organises the application into three domain-specific modules:

### `auth`
Handles user authentication. Includes a login form, a logout confirmation dialog, and route guards (`private-route`, `public-route`) that restrict access based on authentication state. Exposes a `use-user` hook for reading the current user from the store.

### `bookings`
Manages the full lifecycle of a reservation. Provides a bookings list page, an edit booking page, a booking card component, and a delete confirmation dialog. Custom hooks (`use-bookings`, `use-booking`, `use-user-bookings`, `use-property-bookings`) give components scoped access to booking data.

### `properties`
Covers property discovery and reservation. Includes a properties listing page and a book-property page with a detailed reservation form. UI is composed from focused components — `property-card`, `property-image`, `property-type`, `property-price`, `property-rating`, `property-review-score`, `property-facilities`, and `reserve-property-card`. Custom hooks (`use-properties`, `use-property`) handle data access.

---

## Redux Store

The store is configured in `src/store/store.ts` using Redux Toolkit with Redux-Persist, persisting all state to `localStorage` under the `bookMe_` key prefix.

### `user` slice — `bookMe_user`
Tracks the authenticated user. Stores the user's email (`string | null`). Actions: `login` (sets the email) and `logout` (clears it).

### `properties` slice — `bookMe_properties`
Holds the property catalogue. Pre-seeded with 9 mock properties, each containing name, description, location, image, rating, review score, type (`hotel | apartments | villas`), facilities, and adult/child pricing. Read-only — no update actions.

### `bookings` slice — `bookMe_bookings`
Manages user reservations. Each booking links to a property via `propertyId` and stores guest details (name, email, country, phone), dates (`startDate`, `endDate`), and guest counts. Actions: `createBooking`, `updateBooking`, `deleteBooking`.

---

## Unit Tests

Tests are written with **Vitest** and **@testing-library/react**. The suite covers components, pages, and custom hooks across all three feature domains and the common module.

Run the tests:

```bash
npm run test        # Interactive UI mode
npm run test:ci     # Headless run with coverage report
```

### Test coverage

| Metric | Coverage |
|---|---|
| Statements | 90.81% |
| Branches | 85.94% |
| Functions | 83.33% |
| Lines | 90.81% |

### Test files (42 total — 98 tests)

**`common` (10 files)**
- `components/layout` — `header`, `page`, `page-header`, `page-error`, `no-results-found`, `theme-toggle-button`
- `components/meta` — `title`
- `pages` — `not-found-page`
- `hooks/ui` — `use-color-mode`, `use-color-mode-value`

**`features/auth` (6 files)**
- `components` — `login-form`, `logout-dialog`, `private-route`, `public-route`
- `pages` — `login-page`
- `hooks` — `use-user`

**`features/bookings` (8 files)**
- `components` — `booking-card`, `delete-booking-dialog`
- `pages` — `bookings-page`, `edit-booking-page`
- `hooks` — `use-booking`, `use-bookings`, `use-user-bookings`, `use-property-booking`

**`features/properties` (16 files)**
- `components` — `book-property-form`, `property-card`, `property-image`, `property-price`, `property-rating`, `property-review-score` (index, badge, label), `property-type`, `property-facilities` (index, facility-name), `reserve-property-card`
- `pages` — `properties-page`, `book-property-page`
- `hooks` — `use-properties`, `use-property`

---

## E2E Tests

End-to-end tests are written with **Playwright** and run against the live Vite dev server on port 5200. All tests run in Chromium.

Run the tests:

```bash
npm run test:e2e     # Interactive UI mode
npx playwright test  # Headless run
```

### Test files (2 files — 4 tests)

**`properties.spec.ts` (1 test)**
- `should display properties after login`

**`bookings.spec.ts` (3 tests)**
- `should book a property and verify it appears on the bookings page`
- `should delete an existing booking`
- `should edit an existing booking`

---

## CI Workflow

The project uses a single GitHub Actions workflow defined in `.github/workflows/ci.yml`.

**Trigger:** runs on every `push` to any branch.

**Concurrency:** duplicate runs for the same branch are cancelled automatically — only the latest push proceeds.

**Steps:**

| Step | Action |
|---|---|
| Check out code | `actions/checkout@v4` |
| Set up Node.js | `actions/setup-node@v3` — Node.js 22.6.0 with npm cache |
| Install dependencies | `npm install --frozen-lockfile` |
| Lint | `npm run lint` |
| Run tests | `npm run test:ci` (headless Vitest run with coverage) |

The pipeline runs on `ubuntu-latest` and ensures every commit is linted and all tests pass before it can be merged.

---

<small>The application code and unit tests were written manually by Neven Dyulgerov. The e2e tests and this README file were generated by Claude and subsequently evaluated and proof-read by Neven Dyulgerov.</small>
