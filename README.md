# Trackfi — Crypto & Personal Finance Tracker

A full-stack crypto and personal finance tracker built with Next.js and Supabase.

## Features

- Auth with personal portfolio per user
- Live coin prices with Redis caching
- Price alerts via BullMQ background jobs
- Watchlist + transaction history + P&L
- Dockerized for easy local setup
- Testing with Jest + React Testing Library

## Tech Stack

- Next.js 15 + TypeScript
- Supabase (Auth + Database)
- Redis + BullMQ (caching + background jobs)
- Chart.js (data visualization)
- Tailwind CSS
- Docker

## Running Locally

1. Clone the repository

git clone <repo>

2. Add environment variables

Create `.env.local` and fill from .env.example


3. Start with Docker
```bash
docker-compose up --build
```

App runs at:
http://localhost:3000

4. Continuing running the app
```bash
docker-compose up
```

> Redis is included in Docker — no separate setup needed.