# StudyShield

StudyShield is a prototype early-warning and student-retention dashboard for educators. It uses learning activity to identify students who may need support and gives educators a simple way to send nudges.

## Features

- Educator dashboard with student risk summaries
- Risk-level categories for high-, medium-, and low-risk students
- Student search and filtering by risk level or batch
- Quiz completion and inactivity tracking
- Risk-score updates after logins and quiz activity
- In-app educator nudges for students
- Student portal with pending quizzes and received nudges
- Risk-history tracking to show improving, stable, or worsening momentum

## Risk Model

The prototype calculates a score from 0 to 100. A higher score indicates greater risk:

```text
R = min(100, 0.60 * (100 - quiz_completion_rate) + 0.40 * inactivity_score)
inactivity_score = min(100, inactive_days * 25)
```

Risk levels are assigned as follows:

- **High risk:** score greater than 75
- **Medium risk:** score from 45 through 75
- **Low risk:** score less than 45

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Lucide React icons
- TypeScript

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open the local URL printed by Vite in your browser.

### Create a production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Project Structure

```text
app/           Application pages, styles, and API route areas
components/    Reusable instructor, student, and UI components
lib/           Activity and risk calculation logic
prisma/        Database-related project area
public/        Static assets, when present
types/         Shared TypeScript types
```

## Product Roles

### Educator

Educators can review student activity, find students at risk, filter the dashboard, and send supportive nudges.

### Student

Students can review their learning status, see pending quizzes and educator messages, and complete quizzes to improve their activity status.

## Project Status

StudyShield is an early prototype based on the product requirements in `PRD.txt`. The product brief describes a future PostgreSQL-backed architecture; the current local scripts run the frontend through Vite.
