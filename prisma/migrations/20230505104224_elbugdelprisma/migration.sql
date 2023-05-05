/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `Lugar` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Lugar_nombre_key` ON `Lugar`(`nombre`);
