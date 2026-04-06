/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_CategoryToPost_B_index";

-- DropIndex
DROP INDEX "_CategoryToPost_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Category";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CategoryToPost";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Funcionarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_AlunosToCursos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AlunosToCursos_A_fkey" FOREIGN KEY ("A") REFERENCES "Alunos" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AlunosToCursos_B_fkey" FOREIGN KEY ("B") REFERENCES "Cursos" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cursos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "professor" TEXT,
    "cargaHoraria" INTEGER NOT NULL,
    "descricao" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Cursos" ("cargaHoraria", "createdAt", "descricao", "id", "nome", "professor", "updatedAt") SELECT "cargaHoraria", "createdAt", "descricao", "id", "nome", "professor", "updatedAt" FROM "Cursos";
DROP TABLE "Cursos";
ALTER TABLE "new_Cursos" RENAME TO "Cursos";
CREATE UNIQUE INDEX "Cursos_nome_key" ON "Cursos"("nome");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Funcionarios_email_key" ON "Funcionarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_AlunosToCursos_AB_unique" ON "_AlunosToCursos"("A", "B");

-- CreateIndex
CREATE INDEX "_AlunosToCursos_B_index" ON "_AlunosToCursos"("B");
