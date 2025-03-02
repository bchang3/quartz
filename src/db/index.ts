import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { db: PrismaClient };

export const db = globalForPrisma.db || new PrismaClient({ log: ["info"] });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.db = db;
}
