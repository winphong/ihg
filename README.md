# IHG
NUS IHG Website AY19/20

### Installing dependencies for project
At root folder, run `npm i` to install the dependencies. `cd` to **/frontend** and run `npm i` again.

### Running the project
At root folder, run `nodemon`. Using another terminal, `cd` to **/frontend** and run `npm start`

### Running the Go API (new backend, replacing `server/`)
1. Copy `.env.example` to `.env` and fill in `DB_URL` (and `PRIVATE_KEY` for admin auth) - see that file for details on each variable.
2. At root folder, run:
   ```
   go run ./cmd/server
   ```
   This starts the same handler Vercel runs in production on `http://localhost:3900` (override with a `PORT` env var).
3. Using another terminal, `cd` to **/frontend** and run `npm start`, pointing `REACT_APP_API_URL` at `http://localhost:3900/api`
   (or, for the new Next.js frontend being built at the repo root, see below instead).

### Running the Next.js frontend (new frontend, replacing `frontend/`)
1. Copy `.env.example` to `.env.local` and fill in `API_URL` (pointing at the Go API above, e.g. `http://localhost:3900/api`).
2. At root folder, run `npm install` then `npm run dev`.
3. See `docs/MIGRATION_PLAN.md` for migration status - only the static/marketing pages
   (home, about, contact, documents, gallery) are ported so far; `frontend/` is still the
   production frontend until the migration completes.

### Setting up database
1. Go to https://www.mongodb.com/download-center/community to download (MSI) & install MongoDB Community Server. 
2. For installation setup, make sure to check the *Install MongoDB as A Service* box and select *Run service as Network Service User*.
3. Uncheck the *Install MongoDB Compass* box (as it runs into error for some users)
4. Search on your window for environment variables setup. Click on environment variables. Add **C:\Program Files\MongoDB\Server\4.0\bin** to `PATH` under system variables.
5. At your C: drive, add a folder named **data**.
6. In the data folder, create another folder named **db**.
7. Open your terminal and run `mongod` and check that the connection is established. Look out for the line *"waiting for connection on port 27017"*
8. Go to https://www.mongodb.com/download-center/compass to manually download MongoDB Compass and install.
9. Open MongoDB Compass and connect with the default settings.
10. Create a database named **ihg**. 
11. Enter **schedules** as collection name if required to. (optional)

