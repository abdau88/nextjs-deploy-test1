/*
  Warnings:

  - Added the required column `npm` to the `Mahasiswa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mahasiswa" ADD COLUMN     "npm" TEXT NOT NULL;
