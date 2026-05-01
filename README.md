<img width="50" style="vertical-align:middle" alt="logo" src="" />

# Atman

Atman is a minimalist, high-performance note-taking application designed for clarity and focus. It provides a seamless experience for capturing thoughts, featuring a fully responsive interface and a secure, enterprise-grade authentication system.

> **Note:** This project is currently in its **MVP (Minimum Viable Product)** phase, focusing on core stability and cross-device synchronization.

## Demos

<table>
  <tr>
        <td align="center">
            <img width="350" alt="" src="./assets/demo/context.gif" />
        </td>
        <td align="center">
            <img width="350" alt="" src="./assets/demo/inject.gif" />
        </td>
    </tr>
  <tr>
        <td align="center">
            <img width="350" alt="" src="./assets/demo/backup.gif" /> 
        </td>
            <td align="center">
            <img width="350" alt="" src="./assets/demo/themes.gif" /> 
        </td>
    </tr>
</table>

## Features (MVP)

- [x] **Secure Authentication:** Full auth flow including JWT-based Access and Refresh tokens for persistent, secure sessions.
- [x] **Core Notes Management:** Create, read, update, and delete notes with instant UI feedback and optimistic updates for a lag-free experience.
- [x] **Smart Auto-Save:** Never lose a thought. Notes are automatically persisted in the background as you type.
- [x] **Responsive Layout:** Mobile-first design that adapts perfectly to desktop, tablet, and smartphone screens.
- [x] **Dark Mode:** Theme switching for comfortable night-time writing.
- [x] **Note Categorization:** Tags and folders for advanced organization.
- [x] **Pomodoro Timer:** Integrated focus sessions with customizable work-rest intervals to boost productivity.

## Roadmap (Upcoming Features)
- [ ] **Shared Notes:** Collaborative workspaces featuring real-time sharing.
- [ ] **User Profiles:** Customizable user settings, avatars, and account management.
- [ ] **AI-Powered Explainer:** Integrated AI to summarize long notes or explain complex topics within your entries.
- [ ] **Rich Text Support:** Markdown support for better note formatting.

## Installation (Run Locally)

### 1. Prerequisites

Ensure you have **Docker** and **Docker Compose** installed.

### 2. Setup

**1. Clone the repository:**

```bash
git clone https://github.com/ayoubchwt/atman.git
cd atman
git checkout mvp
```

**2. Configure Environment:** Each part of the app has its own `.env.example` file. Copy and fill in both:

```bash
cp client/.env.example client/.env
cp server/.env.example server/.env
```

`client/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

`server/.env`:
```
PORT=5000
MONGODB_URI=mongodb://mongodb:27017/Atman

JWT_SECRET=your_placeholder_secret_change_me
JWT_EXPIRATION="15m"
REFRESH_EXPIRATION="7d"
SALT_ROUNDS=10

NODE_ENV="development"
CLIENT_URL=http://localhost:5173
```

**3. Launch the Stack:**

```bash
docker-compose up --build
```

* Frontend: `http://localhost:5173`
* API Server: `http://localhost:5000`

## Tech Stack

* **Frontend:** React (Vite), Tailwind CSS, Nginx
* **Backend:** Node.js, Express, TypeScript (NodeNext)
* **Database:** MongoDB
* **Infrastructure:** Docker, Docker Compose

## Contributing

This is an MVP, and contributions are welcome to help move features from the roadmap to production!

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
