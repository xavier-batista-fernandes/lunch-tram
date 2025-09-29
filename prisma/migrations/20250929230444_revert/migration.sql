/*
  Warnings:

  - You are about to drop the `LunchParticipant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `LunchParticipant` DROP FOREIGN KEY `LunchParticipant_lunchId_fkey`;

-- DropForeignKey
ALTER TABLE `LunchParticipant` DROP FOREIGN KEY `LunchParticipant_participantId_fkey`;

-- DropTable
DROP TABLE `LunchParticipant`;

-- CreateTable
CREATE TABLE `_LunchToParticipant` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_LunchToParticipant_AB_unique`(`A`, `B`),
    INDEX `_LunchToParticipant_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_LunchToParticipant` ADD CONSTRAINT `_LunchToParticipant_A_fkey` FOREIGN KEY (`A`) REFERENCES `Lunch`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LunchToParticipant` ADD CONSTRAINT `_LunchToParticipant_B_fkey` FOREIGN KEY (`B`) REFERENCES `Participant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
