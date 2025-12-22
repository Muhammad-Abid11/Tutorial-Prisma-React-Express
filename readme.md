# 🚀 Prisma + React + Express Tutorial

Welcome to the **Ultimate Full-Stack Starter Kit**! 🌟

This project demonstrates a robust, modern integration of **Prisma** (ORM), **Express** (Backend), and **React** (Frontend). It is designed to help beginners and intermediate developers understand how to build a full-stack application with a PostgreSQL database.

## 🎯 Purpose

The main goals of this project are:

1.  **Demystify Prisma 7**: Show how to configure Prisma 7 with driver adapters (`@prisma/adapter-pg`) for modern Node.js environments.
2.  **Full-Stack Flow**: Demonstrate the complete data flow from a React component -> Express API -> Prisma -> PostgreSQL.
3.  **Best Practices**: Use a folder-based module structure, `zod` for validation, and proper environment configuration.

## 📸 Snapshot

Here is what the final application looks like! A sleek, dark-themed Todo List managed by your own database.

![Application UI](/Client/public/snap.png)

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS ⚛️
- **Backend**: Express.js, Node.js 🚀
- **Database**: PostgreSQL, Prisma ORM 🐘
- **Validation**: Zod 🛡️

## 🚀 Getting Started

### 1. Setup Server

```bash
cd Server
npm install
npx prisma generate
npx prisma db push
npm run dev
```

### 2. Setup Client

```bash
cd Client
npm install
npm run dev
```

Happy Coding! 💻✨
