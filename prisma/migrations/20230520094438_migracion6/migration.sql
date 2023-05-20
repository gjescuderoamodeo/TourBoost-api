/*
  Warnings:

  - Added the required column `expirado` to the `Reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numeroPersonas` to the `Reserva` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Reserva` ADD COLUMN `expirado` BOOLEAN NOT NULL,
    ADD COLUMN `numeroPersonas` INTEGER NOT NULL;
