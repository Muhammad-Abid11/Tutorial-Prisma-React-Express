# Prisma Team Workflow Scenario

Your friend updated `schema.prisma` and pushed the changes to Git. Now you pulled the latest code.

## ✅ What YOU should do (depends on what your friend did)

### 🔹 Case 1: Your friend already ran `migrate dev` (MOST COMMON)

If your friend:
1. Ran `npx prisma migrate dev --name meaningful_name`
2. Ran `git push`

Then your repo now contains:
```text
prisma/
  migrations/
    2025xxxx_some_change/
```

👉 **You ONLY need to run:**
```bash
npx prisma migrate deploy
```
*Or (in dev environment):*
```bash
npx prisma migrate dev
```

📌 **This will:**
- Apply the new migration to your DB.
- Sync schema.
- Regenerate Prisma Client.

✅ **Done. No conflicts.**

---

### 🔹 Case 2: Your friend changed `schema.prisma` BUT did NOT create a migration ❌

This is a mistake in team environments. 

If they only edited `schema.prisma`:
```prisma
model Todo {
  description String?
}
```
But didn’t run `npx prisma migrate dev`, then **YOU SHOULD NOT GUESS.**

🚫 **Do NOT run:**
```bash
prisma db push
```

✅ **Correct action:**
Ask your friend: “Please create and commit the migration.”

They must run:
```bash
npx prisma migrate dev --name add_description
git push
```

---

### 🔹 Case 3: You are BOTH working locally (learning project)

If this is a local-only project and no data matters, you can safely run:
```bash
npx prisma migrate dev
```

Prisma will:
- Detect schema change.
- Create migration.
- Apply it.

> [!IMPORTANT]
> But only one person should create migrations in real teams.

---

## 🧠 Team Rule (IMPORTANT)

✋ **Only the person who changes the schema creates the migration.**

Everyone else:
- Pulls code.
- Runs migrations.
- Never edits migration SQL manually.

---

## 📦 Full team workflow (BEST PRACTICE)

### 👨‍💻 Developer A (your friend)
1. Update `schema.prisma`
2. Create migration:
   ```bash
   npx prisma migrate dev --name add_description
   ```
3. Commit:
   ```bash
   git add prisma/
   git commit -m "Add description to Todo"
   git push
   ```

### 👨‍💻 Developer B (you)
1. Pull code:
   ```bash
   git pull
   ```
2. Apply migrations:
   ```bash
   npx prisma migrate deploy
   ```

---

## ⚠️ Common mistakes to avoid

- ❌ Running `db push` in a team.
- ❌ Editing migration SQL manually.
- ❌ Creating migrations twice for same change.
- ❌ Deleting `migrations/` folder.

## 🧠 Easy memory rule

- **Schema change** = migration creator
- **Code puller** = migration applier

---

## Bonus tip (recommended for you)

### Prisma Workflow
- Schema changes → `npx prisma migrate dev`
- Pull latest code → `npx prisma migrate deploy`
- Never use `db push` in team project
