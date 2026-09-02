# StudyShield

StudyShield is an early-warning and student-retention dashboard for educators. It analyses learning activity to identify students who may need support and gives educators a simple way to send targeted nudges.

---

## Features

- **Educator dashboard** with student risk summaries and at-a-glance statistics
- **Risk-level categories** — high, medium, and low risk — colour-coded for quick scanning
- **Student search and filtering** by risk level or batch
- **Quiz completion and inactivity tracking** to surface disengaged learners
- **Risk-score updates** recalculated after logins and quiz activity
- **In-app educator nudges** — send support messages directly to students
- **Student portal** with pending quizzes and received nudges
- **Risk-history tracking** showing improving, stable, or worsening momentum
- **Messages and outreach** module for structured instructor communication
- **Authentication** — separate login and sign-up flows for educators and students

---

## Risk Model

A score from 0 to 100 is calculated for each student. A higher score indicates greater risk:

```text
R = min(100, 0.60 * (100 - quiz_completion_rate) + 0.40 * inactivity_score)
inactivity_score = min(100, inactive_days * 25)
```

| Risk Level | Score Range |
|------------|-------------|
| High       | > 75        |
| Medium     | 45 to 75    |
| Low        | < 45        |

---

## Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Framework | Next.js 16 (App Router)                 |
| Language  | TypeScript 7                            |
| UI        | React 19                                |
| Styling   | Tailwind CSS 4                          |
| Icons     | Lucide React                            |
| Utilities | clsx, tailwind-merge                    |

---

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm 9 or newer

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
```

### Start the production server

```bash
npm start
```

---

## Project Structure

```text
app/
  api/            Next.js API routes (interactions, nudges, risk)
  components/     Page-level shared components
  dashboard/      Dashboard page
  instructor/     Instructor-specific pages
  login/          Login page
  messages/       Messages and outreach page
  signup/         Sign-up page
  student/        Student portal page
  students/       Student list and management page
  globals.css     Global styles
  layout.tsx      Root layout

components/
  auth/           Authentication components (LoginForm, etc.)
  dashboard/      Dashboard widgets (StudentsNeedingAttention, etc.)
  instructor/     Instructor-specific UI components
  layout/         Layout components (WelcomeHeader, etc.)
  messages/       Messaging UI components
  modals/         Modal dialogs (AddStudentModal, etc.)
  student/        Student-facing components
  ui/             Shared, reusable UI primitives

lib/
  activity/       Activity tracking logic
  risk/           Risk calculation utilities

services/
  messageService.js  Messaging business logic

data/             Mock data for local development
types/            Shared TypeScript type definitions
prisma/           Database schema (future PostgreSQL integration)
```

---

## Product Roles

### Educator / Instructor

- Review student activity and risk scores across all batches
- Filter and search the dashboard by risk level or batch
- Send supportive nudges to at-risk students
- View message outreach history

### Student

- See personal learning status and current risk score
- View pending quizzes and complete them to improve activity status
- Read nudges and messages received from educators

---

## Project Status

StudyShield is an active prototype. The current implementation uses Next.js 16 with the App Router and mock data for local development. The product roadmap (`PRD.txt`) describes a planned PostgreSQL-backed architecture using Prisma.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes following conventional commits: `git commit -m "feat: describe your change"`
4. Push to your branch: `git push origin feat/your-feature`
5. Open a Pull Request against `main`

---

## License

This project is part of the [Kalvium Community](https://github.com/kalviumcommunity) and is intended for educational purposes.
