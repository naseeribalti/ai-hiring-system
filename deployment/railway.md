# Railway deployment notes

This file explains the minimal steps to deploy this project to Railway.

1) Create a new Railway project (via the web UI or CLI).

2) Services
  - Backend: create a service that points to the `backend` folder. Railway will detect `package.json` and install dependencies. Use the Procfile start command (web: node server.js) or set the start command to `node server.js`.
  - Frontend: for static builds, create a static site service that builds the `frontend` folder. The frontend uses Vite; set build command to `npm install && npm run build` and publish directory to `frontend/dist`.

3) Environment variables
  - Add any required env vars (DB connections, API keys) in Railway project's variables panel.

4) Optional: Use Railway's GitHub integration to automatically deploy on push to `main`.

Notes
  - Railway will use the `backend/Procfile` to run the backend service if present.
  - If you prefer Docker deployments, this repo already contains a `Dockerfile` at the repo root; you can configure Railway to use that instead.
