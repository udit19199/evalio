import { PrismaClient } from "../generated/client/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: "prisma/dev.db"
});

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
