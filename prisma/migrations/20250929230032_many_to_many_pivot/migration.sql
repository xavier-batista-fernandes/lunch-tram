/*
  Warnings:

  - You are about to drop the `_LunchToParticipant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_LunchToParticipant` DROP FOREIGN KEY `_LunchToParticipant_A_fkey`;

-- DropForeignKey
ALTER TABLE `_LunchToParticipant` DROP FOREIGN KEY `_LunchToParticipant_B_fkey`;

-- DropTable
DROP TABLE `_LunchToParticipant`;

-- CreateTable
CREATE TABLE `LunchParticipant` (
    `lunchId` VARCHAR(191) NOT NULL,
    `participantId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`lunchId`, `participantId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LunchParticipant` ADD CONSTRAINT `LunchParticipant_lunchId_fkey` FOREIGN KEY (`lunchId`) REFERENCES `Lunch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LunchParticipant` ADD CONSTRAINT `LunchParticipant_participantId_fkey` FOREIGN KEY (`participantId`) REFERENCES `Participant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
