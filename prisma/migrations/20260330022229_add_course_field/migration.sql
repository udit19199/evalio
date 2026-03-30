-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "educationStatus" TEXT NOT NULL DEFAULT 'Undergraduate',
    "course" TEXT NOT NULL DEFAULT 'B.Tech (CS)',
    "hireabilityScore" REAL NOT NULL DEFAULT 0,
    "overallRank" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "educationStatus", "email", "firstName", "hireabilityScore", "id", "lastName", "overallRank", "passwordHash", "updatedAt") SELECT "createdAt", "educationStatus", "email", "firstName", "hireabilityScore", "id", "lastName", "overallRank", "passwordHash", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
