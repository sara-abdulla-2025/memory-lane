Memory Lane — fixed package (soft cream & sage)

Steps after unzipping:
1. Open in Cursor (or VS Code)
2. Create server/.env from server/.env.example and set DATABASE_URL (postgres)
3. In one terminal: cd server && npm install && npm run dev
4. In another terminal: cd client && npm install && npm run dev
5. Initialize DB: psql -U <user> -f server/init.sql
