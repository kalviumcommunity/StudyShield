# NoSQL database structure

This folder contains the document model boundary for StudyShield. It is intentionally independent of a specific NoSQL driver so the application can choose MongoDB, Firestore, DynamoDB, or another document database later.

## Layout

- `collections/`: document contracts and collection names.
- `repositories/`: persistence operations grouped by collection.
- `seed/`: local development documents.
- `config.ts`: environment variable names and database settings.
- `index.ts`: single entry point for database exports.

## Collections

- `students`: profile, batch membership, current risk summary, and activity counters.
- `batches`: educator-facing cohorts.
- `quizAttempts`: one document per student and quiz attempt.
- `nudges`: messages sent by educators to students.
- `riskHistory`: append-only risk score snapshots.

Risk history and quiz attempts are separate documents because both can grow over time. Keep unbounded activity arrays out of the student document.

Set `NOSQL_DATABASE_NAME` and `NOSQL_DATABASE_URL` when wiring a concrete adapter. No credentials belong in this repository.
