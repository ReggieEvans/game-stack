# 🎮 Game Stack – Fullstack Game Library Tracker

A full-stack, modern web app for managing your personal game library. Built with the latest in Next.js (App Router), MongoDB, and Tailwind CSS — with authentication, game tracking, theming, and responsive UI out of the box.

> ✅ **Demo Ready. Developer Friendly. Production Capable.**

---

## ✨ Features

### 🎯 Game Library Tracker

- Add and manage games in your personal library
- Track hours played, completion status, and more
- View game summaries and screenshots

### 🔐 Auth & User Sessions

- Secure email/password login
- JWT authentication via HttpOnly cookies
- Role-based access support

### 🛠 Built for Devs

- Next.js 15 App Router + TypeScript
- MongoDB with Mongoose for data modeling
- Tailwind CSS + dark/light theme support
- Reusable shadcn/ui components
- Form validation with Zod + React Hook Form
- Path aliases (`@/`) for clean imports

---

## 🧱 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: MongoDB + Mongoose
- **Auth**: JSON Web Tokens (JWT) + bcrypt
- **Styling**: Tailwind CSS, shadcn/ui
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide
- **Type Checking**: TypeScript

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Environment File

```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

You'll also need an API key from IGDB. You can start [here](https://api-docs.igdb.com/#getting-started).

```bash
IGDB_CLIENT_ID=your_igdb_client_id
IGDB_CLIENT_SECRET=your_igdb_client_secret
```

### 3. Run Dev Server

```bash
npm run dev
```

Open http://localhost:3000 to view the app.

## 🏗️ Project Structure

```bash
/
├── app/                # Next.js route handlers & pages
├── components/         # Reusable UI components
├── context/            # User Context
├── hooks/              # Custom Hooks
├── lib/                # Helpers, utilities, validation schemas
├── models/             # Mongoose models
├── public/             # Static assets
├── types/              # Type Checking
```

## 🖼️ Screenshots

![Landing Page](/public/images/screenshots/gamestack-screenshot-4.png)
Landing Page

![The San Juan Mountains are beautiful!](/public/images/screenshots/gamestack-screenshot-1.png)
Library Page

![The San Juan Mountains are beautiful!](/public/images/screenshots/gamestack-screenshot-2.png)
Game Details

![The San Juan Mountains are beautiful!](/public/images/screenshots/gamestack-screenshot-3.png)
Fully Responsive

## 📌 About This Repo

This project is both a developer playground and a portfolio piece. It showcases full-stack development using cutting-edge tools in a way that's clean, scalable, and extensible.

Originally scaffolded from my modern [Next.js starter with custom auth and UI theming](https://github.com/ReggieEvans/nextjs-starter-template).

## 👨‍💻 Author

Made with 💪 by Reggie Evans  
📫 [revans911@gmail.com]  
🌐 [reggieevans.me]

## 📝 License

MIT – use it freely.
