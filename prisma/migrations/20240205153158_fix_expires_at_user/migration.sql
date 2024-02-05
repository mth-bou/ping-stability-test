/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `sessions` table. All the data in the column will be lost.
  - Added the required column `expires` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "session_token" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "expires" DATETIME NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_sessions" ("created_at", "id", "session_token", "updated_at", "user_id") SELECT "created_at", "id", "session_token", "updated_at", "user_id" FROM "sessions";
DROP TABLE "sessions";
ALTER TABLE "new_sessions" RENAME TO "sessions";
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
