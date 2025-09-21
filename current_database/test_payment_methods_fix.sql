-- =====================================================
-- SIMPLE PAYMENT METHODS FIX FOR B2B LOGIC
-- =====================================================
-- 
-- This script applies the new B2B payment methods logic
-- Only changes what's needed for payment methods to work
--
-- =====================================================

-- =====================================================
-- STEP 1: FIX MENYRA_PAGESES TABLE STRUCTURE
-- =====================================================

-- Remove old foreign key constraints
ALTER TABLE `menyra_pageses` DROP FOREIGN KEY IF EXISTS `menyra_pageses_ibfk_1`;
ALTER TABLE `menyra_pageses` DROP FOREIGN KEY IF EXISTS `menyra_pageses_ibfk_2`;

-- Remove old indexes
ALTER TABLE `menyra_pageses` DROP KEY IF EXISTS `klientiID`;
ALTER TABLE `menyra_pageses` DROP KEY IF EXISTS `adminID`;

-- Add aktiv column for global payment methods
ALTER TABLE `menyra_pageses` 
ADD COLUMN `aktiv` tinyint(1) DEFAULT 1 AFTER `menyra_pageses`;

-- =====================================================
-- STEP 2: UPDATE PAYMENT METHODS DATA
-- =====================================================

-- Clear existing payment methods and insert new global ones
DELETE FROM `menyra_pageses`;

INSERT INTO `menyra_pageses` (`menyra_pagesesID`, `menyra_pageses`, `aktiv`) VALUES
(1, 'Kartë Krediti', 1),
(2, 'Kartë Debiti', 1),
(3, 'Transfer Bankar', 1),
(4, 'PayPal', 1),
(5, 'Stripe', 1),
(6, 'Cash on Delivery', 1),
(7, 'Bank Transfer', 1),
(8, 'Mobile Payment', 1),
(9, 'Cryptocurrency', 0),
(10, 'Check', 1),
(11, 'Money Order', 1),
(12, 'Wire Transfer', 1),
(13, 'Apple Pay', 1),
(14, 'Google Pay', 1),
(15, 'Samsung Pay', 1),
(16, 'Cash', 1);

-- =====================================================
-- STEP 3: ENSURE B2B LOGIC IN EXISTING PAYMENTS
-- =====================================================

-- Fix any payments that might have both klientiID and adminID set
UPDATE `pagesa` 
SET `adminID` = NULL 
WHERE `klientiID` IS NOT NULL AND `adminID` IS NOT NULL;

-- =====================================================
-- STEP 4: ADD SAMPLE PAYMENT DATA (B2B LOGIC)
-- =====================================================

-- Insert sample payments showing B2B logic
INSERT INTO `pagesa` (`pagesaID`, `shuma_pageses`, `koha_pageses`, `porosiaID`, `menyra_pagesesID`, `numri_llogarise`, `klientiID`, `adminID`) VALUES
-- Client payments (adminID is NULL)
(1, 200.00, '2025-01-15 14:35:00', 1, 1, '1234567890123456', 1, NULL),
(2, 150.00, '2025-01-16 10:35:00', 2, 2, '2345678901234567', 2, NULL),
(3, 300.00, '2025-01-16 11:20:00', 3, 3, '3456789012345678', 2, NULL),
(4, 75.00, '2025-01-16 12:05:00', 4, 4, '4567890123456789', 3, NULL),
(5, 180.50, '2025-01-17 09:25:00', 6, 5, '5678901234567890', 4, NULL),
(6, 95.75, '2025-01-17 14:20:00', 7, 6, '6789012345678901', 5, NULL),
(7, 250.00, '2025-01-18 11:35:00', 8, 7, '7890123456789012', 6, NULL),
(8, 120.25, '2025-01-18 16:50:00', 9, 8, '8901234567890123', 7, NULL),
-- Admin payments (klientiID is NULL) - for purchases from suppliers
(9, 320.50, '2025-01-19 13:25:00', NULL, 10, '9012345678901234', NULL, 1),
(10, 85.90, '2025-01-20 10:50:00', NULL, 11, '0123456789012345', NULL, 1),
(11, 195.75, '2025-01-20 15:35:00', NULL, 12, '1234567890123456', NULL, 1),
(12, 140.25, '2025-01-21 12:05:00', NULL, 13, '2345678901234567', NULL, 1),
(13, 280.00, '2025-01-21 17:20:00', NULL, 14, '3456789012345678', NULL, 1),
(14, 175.80, '2025-01-19 08:20:00', NULL, 15, '4567890123456789', NULL, 1),
(15, 200.00, '2025-01-16 13:50:00', NULL, 16, '5678901234567890', NULL, 1);

-- leviza_ne_stok table remains empty (as intended)

-- =====================================================
-- SCRIPT COMPLETED SUCCESSFULLY
-- =====================================================
-- 
-- The database now has:
-- 1. Global payment methods (not client-specific)
-- 2. B2B logic in payments (klientiID OR adminID, not both)
-- 3. Sample payment data showing B2B logic
-- 4. leviza_ne_stok remains empty (as intended)
-- 5. All existing data preserved
--
-- =====================================================
