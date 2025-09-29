-- CreateTable
CREATE TABLE `Lunch` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Participant` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
