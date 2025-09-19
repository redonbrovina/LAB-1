-- Add image field to produkti table
ALTER TABLE `produkti` ADD COLUMN `imazhi` VARCHAR(500) DEFAULT NULL AFTER `kategoriaID`;

-- Update existing products with default pill bottle image
UPDATE `produkti` SET `imazhi` = '/src/client/assets/images/default-pill-bottle.png' WHERE `imazhi` IS NULL;
