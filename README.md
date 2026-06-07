# 🎟️ Club Membership Registration

A full-stack application for club membership signup. Users complete a three-step wizard:
- 📋 Choose a membership type
- ✍️ Enter their details (name, email, phone, birth date)
- ✅ Review and submit

Built using:
- React + TypeScript
- Vite
- CSS Modules
- Go (chi router)
- PostgreSQL (pgx)
- Docker & Docker Compose

---

## 📦 Getting Started

### Prerequisites

Ensure you have the following installed:
- Docker & Docker Compose
- Node.js (18+)
- Git
- (Optional) Go 1.23+ to run backend tests outside Docker

### 1. Clone the Repository

```bash
git clone https://github.com/poojavirgo/membershipApp.git
cd membershipApp
```

### 2. Start the Backend (API + Database)

```bash
cd server
docker compose up --build
```

The API runs on http://localhost:8080. Verify it:

```bash
curl http://localhost:8080/api/form
```

### 3. 🚀 Start the Frontend

```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173

---

## 🧪 Running Tests

### Frontend — unit & integration

```bash
cd client
npm run test:run
```

### Frontend — end-to-end (backend + frontend must be running)

```bash
npx playwright install chromium
npm run test:e2e
```

### Backend

```bash
cd server
go test ./...
```

---

## 🛠️ Technologies & Reasoning

- **React + TypeScript** — type-safe and well suited to a stateful, multi-step form.
- **Vite** — fast dev server and build tooling.
- **CSS Modules** — component-scoped styling without a heavy UI library.
- **Go + chi** — a small, fast API that stays close to the standard library.
- **PostgreSQL + pgx** — reliable relational storage for registrations.
- **Docker Compose** — runs the API and database together with one command.

Validation runs on both the client (for fast feedback) and the server (so it never trusts the client). Wizard state lives in a single hook, keeping components presentational and easy to test.

---

## 💡 Possible Improvements

- Make the form data configurable from the database rather than static.
- Add a configurable minimum-age requirement (intentionally omitted, as the brief did not specify one).
- Richer per-country phone validation (e.g. libphonenumber).
- Internationalization — copy is already centralized in `constants/`, so wiring up i18n is a natural next step.
- Document the component library in Storybook for isolated development and visual regression testing.
- Persist wizard progress (e.g. sessionStorage) so a refresh doesn't lose entered data.
- Send a confirmation email on successful registration.
- Add a CI pipeline to run all test suites on each push.
