-- CreateTable
CREATE TABLE `Usuario` (
    `idUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `admin` BOOLEAN NOT NULL,

    PRIMARY KEY (`idUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Marcador` (
    `idUsuario` INTEGER NOT NULL,
    `idLugar` INTEGER NOT NULL,

    PRIMARY KEY (`idUsuario`, `idLugar`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hotel` (
    `idHotel` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `plazasDisponibles` INTEGER NOT NULL,
    `plazasTotales` INTEGER NOT NULL,
    `telefono_contacto` VARCHAR(191) NOT NULL,
    `idLugar` INTEGER NOT NULL,

    PRIMARY KEY (`idHotel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reserva` (
    `idReserva` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha_inicio` DATETIME(3) NOT NULL,
    `fecha_fin` DATETIME(3) NOT NULL,
    `idUsuario` INTEGER NOT NULL,
    `idHotel` INTEGER NOT NULL,

    PRIMARY KEY (`idReserva`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lugar` (
    `idLugar` INTEGER NOT NULL AUTO_INCREMENT,
    `latitud` DOUBLE NOT NULL,
    `longitud` DOUBLE NOT NULL,
    `tipo_lugar` VARCHAR(191) NOT NULL,
    `nombrePais` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idLugar`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pais` (
    `nombre` VARCHAR(191) NOT NULL,
    `codigo_pais` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`nombre`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Marcador` ADD CONSTRAINT `Marcador_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Marcador` ADD CONSTRAINT `Marcador_idLugar_fkey` FOREIGN KEY (`idLugar`) REFERENCES `Lugar`(`idLugar`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hotel` ADD CONSTRAINT `Hotel_idLugar_fkey` FOREIGN KEY (`idLugar`) REFERENCES `Lugar`(`idLugar`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_idHotel_fkey` FOREIGN KEY (`idHotel`) REFERENCES `Hotel`(`idHotel`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lugar` ADD CONSTRAINT `Lugar_nombrePais_fkey` FOREIGN KEY (`nombrePais`) REFERENCES `Pais`(`nombre`) ON DELETE RESTRICT ON UPDATE CASCADE;
