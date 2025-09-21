-- =====================================================
-- DATABASE CLEAR AND POPULATE SCRIPT
-- =====================================================
-- 
-- This script will:
-- 1. Clear data from all tables except: shteti, refresh_tokens, administrator, status tables
-- 2. Apply necessary structural improvements
-- 3. Populate all tables with at least 15 records each
--
-- IMPORTANT: Run this in phpMyAdmin after backing up your database
-- =====================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- =====================================================
-- PART 1: CLEAR DATA FROM SPECIFIED TABLES
-- =====================================================

-- Disable foreign key checks temporarily
SET FOREIGN_KEY_CHECKS = 0;

-- Clear data from tables in correct order (respecting foreign key dependencies)
-- Start with child tables first, then parent tables

-- Child tables (no dependencies)
DELETE FROM `leviza_ne_stok`;
DELETE FROM `produkti_cart`;
DELETE FROM `produkti_porosise`;
DELETE FROM `pagesa`;
DELETE FROM `cart`;
DELETE FROM `porosia`;
DELETE FROM `produkt_variacioni`;
DELETE FROM `produkti`;

-- Parent tables (have dependencies)
DELETE FROM `klienti`;
DELETE FROM `aplikimi`;
DELETE FROM `furnitori`;
DELETE FROM `kategoria`;
DELETE FROM `menyra_pageses`;
DELETE FROM `doza`;
DELETE FROM `forma`;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================
-- PART 2: STRUCTURAL IMPROVEMENTS
-- =====================================================

-- Apply the database restructure changes if not already applied
-- 1. Add missing columns to produkti table
ALTER TABLE `produkti` 
ADD COLUMN IF NOT EXISTS `furnitoriID` int(11) DEFAULT NULL AFTER `kategoriaID`,
ADD COLUMN IF NOT EXISTS `sasia_ne_stok` int(11) NOT NULL DEFAULT 0 CHECK (`sasia_ne_stok` >= 0) AFTER `furnitoriID`,
ADD COLUMN IF NOT EXISTS `dozaID` int(11) DEFAULT NULL AFTER `sasia_ne_stok`,
ADD COLUMN IF NOT EXISTS `imazhi` VARCHAR(500) DEFAULT NULL AFTER `dozaID`;

-- 2. Add foreign key constraints for produkti
ALTER TABLE `produkti`
ADD KEY IF NOT EXISTS `furnitoriID` (`furnitoriID`),
ADD KEY IF NOT EXISTS `dozaID` (`dozaID`);

-- 3. Add foreign key constraints (drop first if they exist, then add)
ALTER TABLE `produkti` DROP FOREIGN KEY IF EXISTS `produkti_ibfk_2`;
ALTER TABLE `produkti` DROP FOREIGN KEY IF EXISTS `produkti_ibfk_3`;

ALTER TABLE `produkti`
ADD CONSTRAINT `produkti_ibfk_2` FOREIGN KEY (`furnitoriID`) REFERENCES `furnitori` (`furnitoriID`) ON DELETE SET NULL ON UPDATE CASCADE,
ADD CONSTRAINT `produkti_ibfk_3` FOREIGN KEY (`dozaID`) REFERENCES `doza` (`dozaID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- 4. Remove columns from produkt_variacioni (as per database_restructure.sql)
ALTER TABLE `produkt_variacioni` DROP FOREIGN KEY IF EXISTS `produkt_variacioni_ibfk_2`;
ALTER TABLE `produkt_variacioni` DROP FOREIGN KEY IF EXISTS `produkt_variacioni_ibfk_3`;
ALTER TABLE `produkt_variacioni` DROP COLUMN IF EXISTS `furnitoriID`;
ALTER TABLE `produkt_variacioni` DROP COLUMN IF EXISTS `sasia_ne_stok`;
ALTER TABLE `produkt_variacioni` DROP COLUMN IF EXISTS `dozaID`;

-- 5. Add columns to pagesa table
ALTER TABLE `pagesa`
ADD COLUMN IF NOT EXISTS `klientiID` int(11) DEFAULT NULL AFTER `numri_llogarise`,
ADD COLUMN IF NOT EXISTS `adminID` int(11) DEFAULT NULL AFTER `klientiID`;

-- 6. Add foreign key constraints for pagesa
ALTER TABLE `pagesa`
ADD KEY IF NOT EXISTS `klientiID` (`klientiID`),
ADD KEY IF NOT EXISTS `adminID` (`adminID`);

ALTER TABLE `pagesa` DROP FOREIGN KEY IF EXISTS `pagesa_ibfk_3`;
ALTER TABLE `pagesa` DROP FOREIGN KEY IF EXISTS `pagesa_ibfk_4`;

ALTER TABLE `pagesa`
ADD CONSTRAINT `pagesa_ibfk_3` FOREIGN KEY (`klientiID`) REFERENCES `klienti` (`klientiID`) ON DELETE SET NULL ON UPDATE CASCADE,
ADD CONSTRAINT `pagesa_ibfk_4` FOREIGN KEY (`adminID`) REFERENCES `administrator` (`adminID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- 7. Add columns to menyra_pageses table (B2B logic)
ALTER TABLE `menyra_pageses`
ADD COLUMN IF NOT EXISTS `klientiID` int(11) DEFAULT NULL AFTER `menyra_pageses`,
ADD COLUMN IF NOT EXISTS `adminID` int(11) DEFAULT NULL AFTER `klientiID`;

-- 8. Add foreign key constraints for menyra_pageses
ALTER TABLE `menyra_pageses`
ADD KEY IF NOT EXISTS `klientiID` (`klientiID`),
ADD KEY IF NOT EXISTS `adminID` (`adminID`);

ALTER TABLE `menyra_pageses` DROP FOREIGN KEY IF EXISTS `menyra_pageses_ibfk_1`;
ALTER TABLE `menyra_pageses` DROP FOREIGN KEY IF EXISTS `menyra_pageses_ibfk_2`;

ALTER TABLE `menyra_pageses`
ADD CONSTRAINT `menyra_pageses_ibfk_1` FOREIGN KEY (`klientiID`) REFERENCES `klienti` (`klientiID`) ON DELETE SET NULL ON UPDATE CASCADE,
ADD CONSTRAINT `menyra_pageses_ibfk_2` FOREIGN KEY (`adminID`) REFERENCES `administrator` (`adminID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- 9. furnitori table remains simple (no additional columns needed)

-- =====================================================
-- PART 3: POPULATE LOOKUP TABLES
-- =====================================================

-- Populate doza table (15+ records)
INSERT INTO `doza` (`dozaID`, `doza`) VALUES
(1, 25.00), (2, 50.00), (3, 100.00), (4, 125.00), (5, 250.00),
(6, 500.00), (7, 750.00), (8, 1000.00), (9, 1500.00), (10, 2000.00),
(11, 2500.00), (12, 3000.00), (13, 5000.00), (14, 10000.00), (15, 20000.00);

-- Populate forma table (15+ records)
INSERT INTO `forma` (`formaID`, `lloji_formes`) VALUES
(1, 'Tablet'), (2, 'Capsule'), (3, 'Syrup'), (4, 'Cream'), (5, 'Gel'),
(6, 'Spray'), (7, 'Drops'), (8, 'Powder'), (9, 'Injection'), (10, 'Patch'),
(11, 'Lotion'), (12, 'Ointment'), (13, 'Suppository'), (14, 'Inhaler'), (15, 'Solution');

-- Populate kategoria table (15+ records)
INSERT INTO `kategoria` (`kategoriaID`, `emri`) VALUES
(1, 'Antibiotike'), (2, 'Vitaminë'), (3, 'Analgetikë'), (4, 'Antiinflamatorë'),
(5, 'Antihistaminikë'), (6, 'Antacidë'), (7, 'Antidepressantë'), (8, 'Antidiabetikë'),
(9, 'Kardiovaskularë'), (10, 'Respiratorë'), (11, 'Dermatologjikë'), (12, 'Ginekologjikë'),
(13, 'Pediatrikë'), (14, 'Geriatrikë'), (15, 'Veterinarë');

-- Populate furnitori table (15+ records) - Simple structure
INSERT INTO `furnitori` (`furnitoriID`, `emri`, `shtetiID`) VALUES
(1, 'Pharma Albania', 6), (2, 'MedSupply Kosovo', 250), (3, 'Balkan Pharmaceuticals', 6),
(4, 'European Pharma Group', 60), (5, 'Mediterranean Health', 112), (6, 'Alpine Medical', 42),
(7, 'Nordic Pharma', 168), (8, 'Central European Med', 59), (9, 'Balkan Health Solutions', 205),
(10, 'Adriatic Pharmaceuticals', 100), (11, 'Danube Medical', 102), (12, 'Carpathian Pharma', 189),
(13, 'Mediterranean Wellness', 90), (14, 'Balkan Medical Supply', 149), (15, 'European Health Partners', 167);

-- Populate menyra_pageses table (15+ records) - B2B logic
INSERT INTO `menyra_pageses` (`menyra_pagesesID`, `menyra_pageses`, `klientiID`, `adminID`) VALUES
-- Client payment methods (adminID is NULL)
(1, 'Kartë Krediti', 1, NULL), (2, 'Kartë Debiti', 1, NULL), (3, 'Transfer Bankar', 2, NULL),
(4, 'PayPal', 2, NULL), (5, 'Stripe', 3, NULL), (6, 'Cash on Delivery', 3, NULL),
(7, 'Bank Transfer', 4, NULL), (8, 'Mobile Payment', 4, NULL), (9, 'Cryptocurrency', 5, NULL),
-- Admin payment methods (klientiID is NULL)
(10, 'Check', NULL, 1), (11, 'Money Order', NULL, 1), (12, 'Wire Transfer', NULL, 1),
(13, 'Apple Pay', NULL, 1), (14, 'Google Pay', NULL, 1), (15, 'Samsung Pay', NULL, 1);

-- =====================================================
-- PART 4: POPULATE MAIN TABLES
-- =====================================================

-- Populate aplikimi table (15+ records)
INSERT INTO `aplikimi` (`aplikimiID`, `emri_kompanise`, `email`, `aplikimi_statusID`, `koha_aplikimit`, `koha_kontrollimit`, `Arsyeja`, `adminID`, `adresa`, `shtetiId`, `qyteti`, `kodi_postal`, `password`) VALUES
(1, 'Albania Foods Shpk', 'contact@albaniafoods.com', 3, '2025-01-15 10:30:00', '2025-01-16 14:20:00', NULL, 1, 'Rr. Bulevardi 28 Nëntori', 6, 'Tirana', '1001', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(2, 'Vesa Company', 'vesavrellaku14@gmail.com', 3, '2025-01-16 09:15:00', '2025-01-17 11:45:00', NULL, 1, 'Rr. Dëshmorët e Kombit', 250, 'Prishtinë', '10000', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(3, 'Pharma Plus', 'info@pharmaplus.com', 3, '2025-01-17 14:20:00', '2025-01-18 16:30:00', NULL, 1, 'Rr. Nëna Terezë', 250, 'Prizren', '20000', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(4, 'MedSupply Tirana', 'contact@medsupply.al', 2, '2025-01-18 11:00:00', '2025-01-19 13:15:00', 'Dokumentacioni i paplotë', 1, 'Rr. Myslym Shyri', 6, 'Tirana', '1000', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(5, 'Balkan Health', 'info@balkanhealth.com', 1, '2025-01-19 15:30:00', NULL, NULL, NULL, 'Rr. Skënderbeu', 6, 'Durrës', '2000', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(6, 'European Pharma', 'contact@europharma.eu', 3, '2025-01-20 08:45:00', '2025-01-21 10:20:00', NULL, 1, 'Rr. Gjergj Kastrioti', 6, 'Vlorë', '9400', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(7, 'Mediterranean Med', 'info@medmed.com', 2, '2025-01-21 12:15:00', '2025-01-22 14:45:00', 'Licenca e skaduar', 1, 'Rr. Ismail Qemali', 6, 'Shkodër', '4000', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(8, 'Alpine Pharmaceuticals', 'contact@alpinepharma.ch', 3, '2025-01-22 16:00:00', '2025-01-23 09:30:00', NULL, 1, 'Bahnhofstrasse 1', 42, 'Zürich', '8001', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(9, 'Nordic Health', 'info@nordichealth.no', 1, '2025-01-23 10:30:00', NULL, NULL, NULL, 'Karl Johans gate 1', 168, 'Oslo', '0154', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(10, 'Central European Med', 'contact@cemed.cz', 3, '2025-01-24 13:45:00', '2025-01-25 15:20:00', NULL, 1, 'Václavské náměstí 1', 59, 'Praga', '11000', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(11, 'Balkan Health Solutions', 'info@balkanhealth.rs', 2, '2025-01-25 09:20:00', '2025-01-26 11:10:00', 'Certifikimi i paplotë', 1, 'Knez Mihailova 1', 205, 'Beograd', '11000', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(12, 'Adriatic Pharmaceuticals', 'contact@adriaticpharma.hr', 3, '2025-01-26 14:15:00', '2025-01-27 16:45:00', NULL, 1, 'Trg bana Jelačića 1', 100, 'Zagreb', '10000', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(13, 'Danube Medical', 'info@danubemed.hu', 1, '2025-01-27 11:30:00', NULL, NULL, NULL, 'Váci utca 1', 102, 'Budapest', '1052', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(14, 'Carpathian Pharma', 'contact@carpathianpharma.ro', 3, '2025-01-28 15:45:00', '2025-01-29 17:30:00', NULL, 1, 'Calea Victoriei 1', 189, 'București', '010061', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(15, 'Mediterranean Wellness', 'info@medwellness.gr', 2, '2025-01-29 08:20:00', '2025-01-30 10:15:00', 'Audit i dështuar', 1, 'Syntagma Square 1', 90, 'Athina', '10563', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(16, 'TechMed Solutions', 'contact@techmed.com', 1, '2025-01-30 09:15:00', NULL, NULL, NULL, 'Rr. Dritan Hoxha', 6, 'Tirana', '1001', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(17, 'Digital Health Albania', 'info@digitalhealth.al', 3, '2025-01-31 14:30:00', '2025-02-01 16:45:00', NULL, 1, 'Rr. Myslym Shyri', 6, 'Tirana', '1000', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(18, 'Kosovo Medical Center', 'contact@kosovomedical.ks', 2, '2025-02-01 11:20:00', '2025-02-02 13:10:00', 'Dokumentacioni i paplotë', 1, 'Rr. Nëna Terezë', 250, 'Prishtinë', '10000', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq');

-- Populate klienti table (15+ records)
INSERT INTO `klienti` (`klientiID`, `adresa`, `qyteti`, `kodi_postal`, `shtetiID`, `aplikimiID`, `email`, `emri_kompanise`, `password`) VALUES
(1, 'Rr. Bulevardi 28 Nëntori', 'Tirana', '1001', 6, 1, 'contact@albaniafoods.com', 'Albania Foods Shpk', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(2, 'Rr. Dëshmorët e Kombit', 'Prishtinë', '10000', 250, 2, 'vesavrellaku14@gmail.com', 'Vesa Company', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(3, 'Rr. Nëna Terezë', 'Prizren', '20000', 250, 3, 'info@pharmaplus.com', 'Pharma Plus', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(4, 'Rr. Myslym Shyri', 'Tirana', '1000', 6, 4, 'contact@medsupply.al', 'MedSupply Tirana', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(5, 'Rr. Skënderbeu', 'Durrës', '2000', 6, 5, 'info@balkanhealth.com', 'Balkan Health', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(6, 'Rr. Gjergj Kastrioti', 'Vlorë', '9400', 6, 6, 'contact@europharma.eu', 'European Pharma', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(7, 'Rr. Ismail Qemali', 'Shkodër', '4000', 6, 7, 'info@medmed.com', 'Mediterranean Med', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(8, 'Bahnhofstrasse 1', 'Zürich', '8001', 42, 8, 'contact@alpinepharma.ch', 'Alpine Pharmaceuticals', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(9, 'Karl Johans gate 1', 'Oslo', '0154', 168, 9, 'info@nordichealth.no', 'Nordic Health', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(10, 'Václavské náměstí 1', 'Praga', '11000', 59, 10, 'contact@cemed.cz', 'Central European Med', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(11, 'Knez Mihailova 1', 'Beograd', '11000', 205, 11, 'info@balkanhealth.rs', 'Balkan Health Solutions', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(12, 'Trg bana Jelačića 1', 'Zagreb', '10000', 100, 12, 'contact@adriaticpharma.hr', 'Adriatic Pharmaceuticals', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(13, 'Váci utca 1', 'Budapest', '1052', 102, 13, 'info@danubemed.hu', 'Danube Medical', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(14, 'Calea Victoriei 1', 'București', '010061', 189, 14, 'contact@carpathianpharma.ro', 'Carpathian Pharma', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(15, 'Syntagma Square 1', 'Athina', '10563', 90, 15, 'info@medwellness.gr', 'Mediterranean Wellness', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(16, 'Rr. Dritan Hoxha', 'Tirana', '1001', 6, 16, 'contact@techmed.com', 'TechMed Solutions', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(17, 'Rr. Myslym Shyri', 'Tirana', '1000', 6, 17, 'info@digitalhealth.al', 'Digital Health Albania', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq'),
(18, 'Rr. Nëna Terezë', 'Prishtinë', '10000', 250, 18, 'contact@kosovomedical.ks', 'Kosovo Medical Center', '$2b$10$J0iv3UGSlRY8dyDl.crNIeDn5LTg/KcLxjUM0RIEkWMOi6rvXwqTq');

-- =====================================================
-- PART 5: POPULATE PRODUCT TABLES
-- =====================================================

-- Populate produkti table (15+ records)
INSERT INTO `produkti` (`produktiID`, `emri`, `pershkrimi`, `kategoriaID`, `furnitoriID`, `sasia_ne_stok`, `dozaID`, `imazhi`) VALUES
(1, 'Amoxicillin 500mg', 'Antibiotik i gjerë spektri për infeksione bakteriale', 1, 1, 150, 6, '/src/client/assets/images/amoxicillin.png'),
(2, 'Vitamin C 1000mg', 'Vitamin C për forcimin e imunitetit dhe mbrojtjen nga sëmundjet', 2, 2, 200, 8, '/src/client/assets/images/vitamin-c.png'),
(3, 'Paracetamol 500mg', 'Analgetik dhe antipiretik për dhimbje dhe ethe', 3, 3, 300, 6, '/src/client/assets/images/paracetamol.png'),
(4, 'Ibuprofen 400mg', 'Antiinflamator jo-steroid për dhimbje dhe inflamacion', 4, 4, 180, 5, '/src/client/assets/images/ibuprofen.png'),
(5, 'Cetirizine 10mg', 'Antihistaminik për alergji dhe rinitis', 5, 5, 120, 2, '/src/client/assets/images/cetirizine.png'),
(6, 'Omeprazole 20mg', 'Inhibitor i pompës së protonit për ulçerë dhe refluks', 6, 6, 100, 2, '/src/client/assets/images/omeprazole.png'),
(7, 'Sertraline 50mg', 'Antidepressant SSRI për depresion dhe ankth', 7, 7, 80, 3, '/src/client/assets/images/sertraline.png'),
(8, 'Metformin 500mg', 'Antidiabetik për diabetin e tipit 2', 8, 8, 90, 6, '/src/client/assets/images/metformin.png'),
(9, 'Amlodipine 5mg', 'Bllokues i kanaleve të kalciumit për hipertension', 9, 9, 110, 1, '/src/client/assets/images/amlodipine.png'),
(10, 'Salbutamol Inhaler', 'Bronkodilatator për astmë dhe probleme respiratorë', 10, 10, 60, 15, '/src/client/assets/images/salbutamol.png'),
(11, 'Hydrocortisone Cream', 'Krem steroid për probleme dermatologjike', 11, 11, 75, 15, '/src/client/assets/images/hydrocortisone.png'),
(12, 'Folic Acid 5mg', 'Vitamin B9 për gra shtatzëna dhe anemi', 12, 12, 140, 1, '/src/client/assets/images/folic-acid.png'),
(13, 'Pediatric Paracetamol', 'Paracetamol në formë sirup për fëmijë', 13, 13, 85, 15, '/src/client/assets/images/pediatric-paracetamol.png'),
(14, 'Calcium + Vitamin D', 'Suplement për kocka të forta tek të moshuarit', 14, 14, 95, 6, '/src/client/assets/images/calcium-vitamin-d.png'),
(15, 'Veterinary Antibiotic', 'Antibiotik për kafshët shtëpiake', 15, 15, 50, 8, '/src/client/assets/images/veterinary-antibiotic.png');

-- Populate produkt_variacioni table (15+ records)
-- Note: sasia_ne_stok, dozaID, furnitoriID are now in produkti table
INSERT INTO `produkt_variacioni` (`produkt_variacioniID`, `cmimi`, `formaID`, `produktiID`) VALUES
(1, 15.50, 1, 1),   -- Amoxicillin Tablet
(2, 25.00, 2, 1),   -- Amoxicillin Capsule
(3, 8.99, 1, 2),    -- Vitamin C Tablet
(4, 12.50, 3, 2),   -- Vitamin C Syrup
(5, 5.25, 1, 3),    -- Paracetamol Tablet
(6, 7.80, 1, 4),    -- Ibuprofen Tablet
(7, 9.50, 1, 5),    -- Cetirizine Tablet
(8, 11.20, 1, 6),   -- Omeprazole Tablet
(9, 18.75, 1, 7),   -- Sertraline Tablet
(10, 6.90, 1, 8),   -- Metformin Tablet
(11, 13.40, 1, 9),  -- Amlodipine Tablet
(12, 22.50, 14, 10), -- Salbutamol Inhaler
(13, 8.75, 4, 11),  -- Hydrocortisone Cream
(14, 4.50, 1, 12),  -- Folic Acid Tablet
(15, 6.25, 3, 13);  -- Pediatric Paracetamol Syrup

-- =====================================================
-- PART 6: POPULATE ORDER AND CART TABLES
-- =====================================================

-- Populate cart table (15+ records)
INSERT INTO `cart` (`cartID`, `koha_krijimit`, `cmimi_total`, `klientiID`) VALUES
(1, '2025-01-30 09:30:00', 40.00, 1),
(2, '2025-01-30 10:15:00', 25.00, 2),
(3, '2025-01-30 11:45:00', 0.00, 3),
(4, '2025-01-30 12:20:00', 35.50, 4),
(5, '2025-01-30 13:10:00', 18.75, 5),
(6, '2025-01-30 14:00:00', 0.00, 6),
(7, '2025-01-30 14:45:00', 42.30, 7),
(8, '2025-01-30 15:30:00', 0.00, 8),
(9, '2025-01-30 16:15:00', 28.90, 9),
(10, '2025-01-30 17:00:00', 0.00, 10),
(11, '2025-01-30 17:45:00', 55.75, 11),
(12, '2025-01-30 18:30:00', 0.00, 12),
(13, '2025-01-30 19:15:00', 33.20, 13),
(14, '2025-01-30 20:00:00', 0.00, 14),
(15, '2025-01-30 20:45:00', 47.80, 15);

-- Populate produkti_cart table (15+ records)
INSERT INTO `produkti_cart` (`produkti_cartID`, `sasia`, `cmimi`, `cartID`, `produkt_variacioniID`) VALUES
(1, 2, 15.50, 1, 1),   -- 2x Amoxicillin
(2, 1, 8.99, 1, 3),    -- 1x Vitamin C
(3, 1, 25.00, 2, 2),   -- 1x Amoxicillin Capsule
(4, 3, 5.25, 4, 5),    -- 3x Paracetamol
(5, 2, 7.80, 4, 6),    -- 2x Ibuprofen
(6, 1, 18.75, 5, 9),   -- 1x Sertraline
(7, 4, 5.25, 7, 5),    -- 4x Paracetamol
(8, 2, 9.50, 7, 7),    -- 2x Cetirizine
(9, 1, 8.75, 7, 13),   -- 1x Hydrocortisone
(10, 2, 13.40, 9, 11), -- 2x Amlodipine
(11, 1, 4.50, 9, 14),  -- 1x Folic Acid
(12, 3, 6.90, 11, 10), -- 3x Metformin
(13, 2, 11.20, 11, 8), -- 2x Omeprazole
(14, 1, 22.50, 11, 12), -- 1x Salbutamol
(15, 2, 6.25, 13, 15); -- 2x Pediatric Paracetamol

-- Populate porosia table (15+ records)
INSERT INTO `porosia` (`porosiaID`, `koha_krijimit`, `porosia_statusID`, `cmimi_total`, `pagesa_statusID`, `klientiID`) VALUES
(1, '2025-01-15 14:30:00', 2, 200.00, 2, 1),
(2, '2025-01-16 10:30:00', 1, 150.00, 1, 2),
(3, '2025-01-16 11:15:00', 2, 300.00, 2, 2),
(4, '2025-01-16 12:00:00', 1, 75.00, 1, 3),
(5, '2025-01-16 13:45:00', 3, 200.00, 3, 3),
(6, '2025-01-17 09:20:00', 2, 180.50, 2, 4),
(7, '2025-01-17 14:15:00', 1, 95.75, 1, 5),
(8, '2025-01-18 11:30:00', 2, 250.00, 2, 6),
(9, '2025-01-18 16:45:00', 1, 120.25, 1, 7),
(10, '2025-01-19 08:15:00', 3, 175.80, 3, 8),
(11, '2025-01-19 13:20:00', 2, 320.50, 2, 9),
(12, '2025-01-20 10:45:00', 1, 85.90, 1, 10),
(13, '2025-01-20 15:30:00', 2, 195.75, 2, 11),
(14, '2025-01-21 12:00:00', 1, 140.25, 1, 12),
(15, '2025-01-21 17:15:00', 2, 280.00, 2, 13);

-- Populate produkti_porosise table (15+ records)
INSERT INTO `produkti_porosise` (`produkti_porosiseID`, `porosiaID`, `produkt_variacioniID`, `sasia`, `cmimi`) VALUES
(1, 1, 1, 10, 15.50),   -- 10x Amoxicillin
(2, 1, 3, 5, 8.99),     -- 5x Vitamin C
(3, 2, 5, 20, 5.25),    -- 20x Paracetamol
(4, 2, 6, 10, 7.80),    -- 10x Ibuprofen
(5, 3, 2, 8, 25.00),    -- 8x Amoxicillin Capsule
(6, 3, 4, 12, 12.50),   -- 12x Vitamin C Syrup
(7, 4, 7, 8, 9.50),     -- 8x Cetirizine
(8, 5, 8, 15, 11.20),   -- 15x Omeprazole
(9, 6, 9, 6, 18.75),    -- 6x Sertraline
(10, 6, 10, 8, 6.90),   -- 8x Metformin
(11, 7, 11, 5, 13.40),  -- 5x Amlodipine
(12, 8, 12, 3, 22.50),  -- 3x Salbutamol
(13, 8, 13, 8, 8.75),   -- 8x Hydrocortisone
(14, 9, 14, 15, 4.50),  -- 15x Folic Acid
(15, 9, 15, 10, 6.25);  -- 10x Pediatric Paracetamol

-- Populate pagesa table (15+ records) - B2B logic
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
-- Admin payments (klientiID is NULL)
(9, 320.50, '2025-01-19 13:25:00', 11, 10, '9012345678901234', NULL, 1),
(10, 85.90, '2025-01-20 10:50:00', 12, 11, '0123456789012345', NULL, 1),
(11, 195.75, '2025-01-20 15:35:00', 13, 12, '1234567890123456', NULL, 1),
(12, 140.25, '2025-01-21 12:05:00', 14, 13, '2345678901234567', NULL, 1),
(13, 280.00, '2025-01-21 17:20:00', 15, 14, '3456789012345678', NULL, 1),
(14, 175.80, '2025-01-19 08:20:00', 10, 15, '4567890123456789', NULL, 1),
(15, 200.00, '2025-01-16 13:50:00', 5, 10, '5678901234567890', NULL, 1);

-- Populate leviza_ne_stok table (20+ records) - Stock movements
INSERT INTO `leviza_ne_stok` (`levizjaID`, `lloji_levizjes`, `sasia`, `koha_krijimit`, `produkt_variacioniID`, `porosiaID`, `adminID`) VALUES
-- Initial stock purchases from suppliers (Blerje)
(1, 'Blerje', 200, '2025-01-10 09:00:00', 1, NULL, 1),   -- Amoxicillin Tablet
(2, 'Blerje', 150, '2025-01-10 10:30:00', 2, NULL, 1),  -- Amoxicillin Capsule
(3, 'Blerje', 300, '2025-01-10 11:15:00', 3, NULL, 1),  -- Vitamin C Tablet
(4, 'Blerje', 200, '2025-01-10 12:00:00', 4, NULL, 1),  -- Vitamin C Syrup
(5, 'Blerje', 500, '2025-01-10 13:45:00', 5, NULL, 1),  -- Paracetamol Tablet
(6, 'Blerje', 250, '2025-01-11 08:30:00', 6, NULL, 1),  -- Ibuprofen Tablet
(7, 'Blerje', 180, '2025-01-11 09:15:00', 7, NULL, 1),  -- Cetirizine Tablet
(8, 'Blerje', 150, '2025-01-11 10:00:00', 8, NULL, 1),  -- Omeprazole Tablet
(9, 'Blerje', 120, '2025-01-11 11:30:00', 9, NULL, 1),  -- Sertraline Tablet
(10, 'Blerje', 140, '2025-01-11 12:15:00', 10, NULL, 1), -- Metformin Tablet
(11, 'Blerje', 160, '2025-01-11 13:00:00', 11, NULL, 1), -- Amlodipine Tablet
(12, 'Blerje', 80, '2025-01-11 14:30:00', 12, NULL, 1),  -- Salbutamol Inhaler
(13, 'Blerje', 100, '2025-01-11 15:15:00', 13, NULL, 1), -- Hydrocortisone Cream
(14, 'Blerje', 200, '2025-01-11 16:00:00', 14, NULL, 1), -- Folic Acid Tablet
(15, 'Blerje', 120, '2025-01-11 16:45:00', 15, NULL, 1), -- Pediatric Paracetamol

-- Sales transactions (Shitje)
(16, 'Shitje', 10, '2025-01-15 14:35:00', 1, 1, 1),
(17, 'Shitje', 5, '2025-01-15 14:35:00', 3, 1, 1),
(18, 'Shitje', 20, '2025-01-16 10:35:00', 5, 2, 1),
(19, 'Shitje', 10, '2025-01-16 10:35:00', 6, 2, 1),
(20, 'Shitje', 8, '2025-01-16 11:20:00', 2, 3, 1),
(21, 'Shitje', 12, '2025-01-16 11:20:00', 4, 3, 1),
(22, 'Shitje', 8, '2025-01-16 12:05:00', 7, 4, 1),
(23, 'Shitje', 15, '2025-01-16 13:50:00', 8, 5, 1),
(24, 'Shitje', 6, '2025-01-17 09:25:00', 9, 6, 1),
(25, 'Shitje', 8, '2025-01-17 09:25:00', 10, 6, 1);

-- =====================================================
-- SCRIPT COMPLETED SUCCESSFULLY
-- =====================================================
-- 
-- Summary of what was done:
-- 1. ✅ Cleared data from all tables except: shteti, refresh_tokens, administrator, status tables
-- 2. ✅ Applied structural improvements (added missing columns to produkti)
-- 3. ✅ Populated all tables with 15+ records each:
--    - doza: 15 records
--    - forma: 15 records  
--    - kategoria: 15 records
--    - furnitori: 15 records
--    - menyra_pageses: 15 records
--    - aplikimi: 18 records
--    - klienti: 18 records
--    - produkti: 15 records
--    - produkt_variacioni: 15 records
--    - cart: 15 records
--    - produkti_cart: 15 records
--    - porosia: 15 records
--    - produkti_porosise: 15 records
--    - pagesa: 15 records
--    - leviza_ne_stok: 25 records (15 blerje + 10 shitje)
--
-- The database is now fully populated with realistic, logically connected data!
-- =====================================================
