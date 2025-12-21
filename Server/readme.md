# Prisma + Express + PostgreSQL (Beginner's Guide)

This guide explains how to set up Prisma ORM with an Express server using PostgreSQL. It is tailored for a **JavaScript** project using Prisma 7.

## 1. Installation

First, install the necessary dependencies for your project.

### Core Dependencies
```bash
npm install express dotenv cors
```

### Prisma Dependencies
For Prisma 7 with PostgreSQL, we need a few specific packages:
- `prisma`: The CLI tool (development dependency).
- `@prisma/client`: The auto-generated database client.
- `@prisma/adapter-pg` & `pg`: Required for Prisma 7 to talk to PostgreSQL (using the modern driver adapter).

```bash
npm install @prisma/client @prisma/adapter-pg pg
npm install -D prisma nodemon
```

## 2. Initialization

Initialize Prisma in your project:
```bash
npx prisma init
```
This command:
- Creates a `prisma` folder containing `schema.prisma`.
- Creates a `.env` file for your environment variables.
- Creates `prisma.config.ts` (Prisma 7+ feature).

**Action:** Open `.env` and set your `DATABASE_URL` to your PostgreSQL connection string.

## 3. Configuration (Critical Step)

Prisma 7 defaults to TypeScript. Since this is a **JavaScript** project, we must explicitly configure it to generate a JavaScript-compatible client.

**File:** `prisma/schema.prisma`

Change availability `generator client` block to:

```prisma
generator client {
  provider = "prisma-client-js"       // <--- Forces JavaScript client generation
  output   = "../generated/prisma"    // <--- Custom output location
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## 4. Setting up the Prisma Client

We need a central file to configure and export the Prisma Client instance. This allows us to reuse the same connection throughout the app.

**File:** `prisma/prisma.js`

```javascript
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "../generated/prisma/index.js" // Import from our custom output

const connectionString = `${process.env.DATABASE_URL}`

// 1. Configure the PostgreSQL adapter
const adapter = new PrismaPg({ connectionString })

// 2. Initialize Prisma Client with the adapter
const prisma = new PrismaClient({ adapter })

// 3. Export as default for use in other files
export default prisma;

// Optional: Test function to verify connection
export async function PrismaConnect() {
    try {
        await prisma.$connect();
        console.log("✅ Prisma Database connected");
    } catch (e) {
        console.error("❌ DB connection error", e);
    }
}
```

## 5. Generating the Client

Whenever you make changes to `schema.prisma` (like adding a model), you must run key commands:

1.  **Generate the Client:** Creates the actual code for `PrismaClient`.
    ```bash
    npx prisma generate
    ```
    *Must run this every time you change schema.prisma!*

2.  **Push to Database:** Updates your database schema to match your Prisma schema.
    ```bash
    npx prisma db push
    ```

3.  **View Data:** Opens a GUI to view/edit your data.
    ```bash
    npx prisma studio
    ```

## 6. Using Prisma in your Server

Now you can import the `prisma` instance in your `index.js` or route files to query the database.

**File:** `index.js`

```javascript
import prisma from "./prisma/prisma.js"; // Import the client
import { PrismaConnect } from "./prisma/prisma.js"; // Optional test utility

// ... express setup ...

// Optional: Check connection on startup
PrismaConnect();

// Example: Get all todos
app.get("/todos", async (req, res) => {
    const todos = await prisma.todo.findMany();
    res.json(todos);
});
```

---

## Troubleshooting: Why did we do this?

If you faced crashes or `ERR_MODULE_NOT_FOUND` errors, here is why:
1.  **TypeScript vs JavaScript:** Prisma 7 often assumes TypeScript. By using `provider = "prisma-client-js"`, we forced it to be JS-friendly.
2.  **Exports:** Our `index.js` expects a `default` export (`import prisma from ...`), but the original code might have used a named export (`export { prisma }`). We matched them to avoid "undefined" errors.