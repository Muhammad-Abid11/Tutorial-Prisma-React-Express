// CREATED BY USER ( PRISMA CLIENT CONFIGURATION )
// COPY FROM PRISMA DOCUMENTATION

import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "../generated/prisma/index.js";


const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export default prisma


/* 
Q: is their any way so that I can get Prisma connected successfully, like mongoose.connect, since Prisma is also an ORM, so there is also some way to connect it to the database.

A: NO, Prisma does NOT connect like mongoose.connect() — and that’s by design. 
Prisma (PostgreSQL / SQL)
- Prisma uses:
    - A query engine
    - Lazy connections
    - Connection pooling handled internally

- So Prisma:
    - Does NOT connect at app startup
    - Connects only when a query runs
    - Reconnects automatically if needed

👉 That’s why you don’t see prisma.connect()


Furthermore
- const prisma = new PrismaClient();

- The above line:
    - Initializes Prisma Client
    - Loads schema
    - Prepares the DB engine
    - But no DB connection yet.
- Connection happens here:
    - await prisma.user.findMany(); // FIRST real connection

*/

// Just for testing Prisma connected or not ( NOT NEEDED IN PRODUCTION )
export async function PrismaConnect() {
    try {
        await prisma.$connect();
        console.log("✅ Prisma Database connected");
    } catch (e) {
        console.error("❌ DB connection error", e);
    }
}