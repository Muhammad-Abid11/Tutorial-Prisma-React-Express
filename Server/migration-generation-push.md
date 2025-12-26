# Prisma: migrate vs db push vs generate

This document explains the **core Prisma commands** used in a **React + Express + Prisma + PostgreSQL** project, especially for CRUD features like **Todo**.

---

## 📌 Quick Summary (TL;DR)

| Command | Purpose |
| ------ | -------- |
| `prisma migrate dev` | Safely update **database structure** with history |
| `prisma db push` | Force sync schema to DB (no history) |
| `prisma generate` | Generate Prisma Client (code only) |

---

## 🧠 Core Concept

> **Migrate changes the DATABASE**  
> **Generate changes the CODE**  
> **DB Push force-syncs WITHOUT history**

---

## 1️⃣ `npx prisma migrate dev`

### ✅ What it does
- Creates **SQL migration files**
- Applies schema changes to **PostgreSQL**
- Tracks history in `prisma/migrations`
- Stores applied migrations in `_prisma_migrations`
- Auto-runs `prisma generate`
- **Production safe**

---

### 📝 Example (Todo)

#### `schema.prisma`
```prisma
model Todo {
  id Int @id @default(autoincrement())
  title String
  completed Boolean @default(false)
}
```

**Run:**
```bash
npx prisma migrate dev --name add_completed
```

**Generated SQL:**
```sql
ALTER TABLE "Todo" ADD COLUMN "completed" BOOLEAN DEFAULT false;
```

✔️ Database updated  
✔️ Migration tracked  
✔️ Prisma Client regenerated

#### 🧩 When to use migrate dev
- Adding/removing columns
- Changing field types
- Creating relations (User ↔ Todo)
- Any production or team project

---

## 2️⃣ `npx prisma db push`

### ⚠️ What it does
- Directly syncs schema to DB
- **NO** migration files
- **NO** history
- **NO** rollback
- Auto-runs `prisma generate`

### 📝 Example

**schema.prisma**
```prisma
model Todo {
  id Int @id @default(autoincrement())
  title String
  priority Int
}
```

**Run:**
```bash
npx prisma db push
```

**Internally runs:**
```sql
ALTER TABLE "Todo" ADD COLUMN "priority" INTEGER;
```

❌ No migration saved  
❌ Team members won’t know  
❌ Dangerous for production

#### 🧩 When to use db push
- Learning Prisma
- Prototyping
- Throwaway databases
- One-person experiments
- MongoDB projects (where migrations aren't used)

🚫 **Never use in production with PostgreSQL**

---

## 3️⃣ `npx prisma generate`

### ✅ What it does
- Generates Prisma Client
- Allows your backend to access models
- Reads `schema.prisma`
- Does **NOT** change database

### 📝 Example

**After generating:**
```typescript
await prisma.todo.create({
  data: { title: "Learn Prisma" }
})
```

**Without generate:**
```text
Property 'todo' does not exist on type PrismaClient
```

#### 🧩 When to use generate
- After installing Prisma
- After pulling repo from GitHub
- When Prisma Client errors occur
- After changing generator config

---

## 4️⃣ Side-by-Side Comparison

| Feature | migrate dev | db push | generate |
| :--- | :---: | :---: | :---: |
| Changes DB | ✅ | ✅ | ❌ |
| Creates migrations | ✅ | ❌ | ❌ |
| Tracks history | ✅ | ❌ | ❌ |
| Production safe | ✅ | ❌ | ✅ |
| Affects code | ❌ | ❌ | ✅ |
| Auto runs generate | ✅ | ✅ | ❌ |

---

## 5️⃣ Recommended Workflow (PostgreSQL)

**Development**
```bash
npx prisma migrate dev
```

**Production**
```bash
npx prisma migrate deploy
```

**Never in production**
```bash
npx prisma db push
```

---

## 6️⃣ Easy Mental Model 🧠

```
schema.prisma
   ├─ migrate  → DATABASE (safe + tracked)
   ├─ db push  → DATABASE (unsafe + untracked)
   └─ generate → CODE (Prisma Client)
```

---

## 7️⃣ Final Rule (Remember Forever)

- If **data matters** → **MIGRATE**
- If **data doesn’t matter** → **DB PUSH**
- If **code complains** → **GENERATE**

---

## 🎯 Interview-Ready Answer

- **Prisma migrate** creates versioned SQL migrations and is safe for production.
- **Prisma db push** directly syncs schema without history and should only be used for prototyping.
- **Prisma generate** creates the Prisma Client used in application code.
