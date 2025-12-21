# Package Dependencies
npm i dotenv express nodemon

# now we are going to install prisma

- npm i cors @prisma/client prisma
- npm i --save-dev @types/node

- npx prisma init 
    - this will create a prisma folder with a file named prisma.schema and a file named prisma.config.ts 
      and .env file in root directory (update .env file DATABASE_URL)
    - Next, choose how you want to set up your database:

    CONNECT EXISTING DATABASE: (*Not Understand/USED/TRY)
      1. Configure your DATABASE_URL in .env file
      2. Run prisma db pull to introspect your database.

    CREATE NEW DATABASE:(Recommended)
      Local: npx prisma dev (runs Postgres locally in your terminal)
      Cloud: npx create-db (creates a free Prisma Postgres database)
      - This will provide us 2 databases
      - - 1st is ready to used connection string also provided just update .env file DATABASE_URL
      - - 2nd is cloud database that need to login by prisma "https://console.prisma.io/" and get connection string and update .env file DATABASE_URL


    When you successfully updated .env file DATABASE_URL then
    - first add a model in schema.prisma file
    - then run following command this will create a client for your database
      "npx prisma generate"
      "npx prisma db push"
      "npx prisma studio"
    - Now You see the table in prisma studio

    
    Now we are going to setup "prisma client" so we can use it in our application for database operations
    - Install Prisma Client
      "npm i @prisma/client"
      "npm i @prisma/adapter-pg"
    - Create a db.js(prisma.js) file in the root path of the project or in prisma folder

    # Prisma Client Configuration Fix Walkthrough
    - When I importing "PrismaClient" from "../generated/prisma", the server is getting crashed so I have corrected the Prisma Client configuration to work with Prisma 7 in my JavaScript project.

    # The Issue
    - The Server was crashing because:
    - Prisma 7 generated TypeScript files by default, which Node.js (JavaScript) could not run directly.
    - The prisma.js file used a named export (export { prisma }) but index.js expected a default export.
    - Module resolution path errors.

    # The Solution
    1. Schema Configuration (schema.prisma)
    - Switched the generator to prisma-client-js and set a custom output path that ensures mostly JavaScript output (or compatible structure).

      # NOT USED BECAUSE IT GENERATE TS-BASED PRISMA CLIENT
      generator client {
        provider = "prisma-client"
        output   = "../generated/prisma"
      }

      # USED BECAUSE IT GENERATE JS-BASED PRISMA CLIENT
      generator client {
        provider = "prisma-client-js"
        output   = "../generated/prisma"
      }

# Prisma-Express-Server
install dependencies:
npm install

run server:
npm run dev