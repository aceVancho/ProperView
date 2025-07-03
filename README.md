# 🏡 ProperView

A simple full-stack real estate dashboard built with Node, React, and MongoDB.

---

## 🚀 Set Up Instructions

### 1. Clone the repo

```
git clone https://github.com/aceVancho/ProperView.git
```

### 2. Node Version

Be sure your Node version is relatively up-to-date.  
Mine is on `v23.0.0`

### 3. Cd to project

```
cd ~/../ProperView
```

#### Install server dependencies

```
cd server
npm install
```

#### Install client dependencies

(from `server/` directory)

```
cd ../client
npm install
```

### 4. Start both services (Node and Vite)

- From `/server`, run:

  ```
  npm run dev
  ```

  > Make sure port `5001` is free.

- From `/client`, run:

  ```
  npm run dev
  ```

  > Make sure port `5173` is free.

If Node started up correctly and the DB connected, you ought to see some logs like:

```
Server listening on port 5001
MongoDB connected: ac-qtfzhni-shard-00-00.ldjp43p.mongodb.net
```

---

### 5. Open your web browser

Navigate to: [http://localhost:5173/login](http://localhost:5173/login)

You can use any of the following emails to simulate different users:

- `agent1@example.com`
- `agent2@example.com`
- `agent3@example.com`
- `agent4@example.com`
- `agent5@example.com`

No password is required. Each user is associated with different listings.

---

## 🛠️ Tech Stack

- **Backend**: Node, Express, MongoDB
- **Frontend**: Vite, React, React Router, Tailwind, ShadCN (component library)
- **Language**: TypeScript (used for both client and server)

---

## 📝 Notes

Happy to speak with the interviewing team in detail regarding what is going on under the hood. Some things I didn't get to or would change in a production environment.

### Backend

- Included a `.env` and ended up not using it for sharing/simplicity sake of the interview
- Hard coded a DB connection string (it's just a temp. free-tier db)
- No auth at all just felt bad, so I built in some mock token auth that utilized the user's `id`. User logs in with email -> DB look up user -> Found and create token like `AGENT::${agentId}` -> pass to frontend -> store -> use token auth in headers for api
- That said, no password hashing (bcrypt), role-based access, or refresh token support
- No pagination support (and no pagination on frontend)
- Would've typically broken out controller logic into a separate service/concerns
- A big no, no but I obviously did not write a bunch of unit or integration tests for this project

### Frontend

- Bad or no input validation. Would definitely use Zod.
- No skeleton loaders, spinners, etc.
- No toasts which is sad bc I love toasts
- No state management. Wasn't going to mess with all that for such a small project.
- Instead I just used React context.
- On the topic of context and state, would've liked to have proper state for the currently viewed property. Had to prop drill and break some DRY by re-writing my `PropertyDetailsProps` interface
- No logout button. No session expiration.
- Some questionable UI/css I couldn't get to like hover state
- Refreshes after form submits and data not rehydrating after db updates for `PUT` and `POST` requests
- Filter logic is me and AI crunching for time. Im sure there's a lib for these things.
- Property cards need images and "More Details" on the first non-agent-owned card needs stylized

