-- =====================================================
-- IMPORT INSTRUCTIONS
-- =====================================================
-- 
-- 1. shkoni ne phpMyAdmin
-- 2. e selektoni databazen e projektit
-- 3. e boni click "Import" tab
-- 4. choose this file edhe click "Go"
--
-- =====================================================

-- Set SQL mode and timezone
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- =====================================================
-- ORDER STATUS LOOKUP TABLE
-- =====================================================

-- Insert order status values (required for order system)
INSERT INTO `porosia_status` (`porosia_statusID`, `statusi`) VALUES
(1, 'Në proces'),
(2, 'Përfunduar'),
(3, 'Anuluar');

-- =====================================================
-- PAYMENT STATUS LOOKUP TABLE
-- =====================================================

-- Insert payment status values (required for order system)
INSERT INTO `pagesa_status` (`pagesa_statusID`, `statusi`) VALUES
(1, 'Në pritje'),
(2, 'E paguar'),
(3, 'E refuzuar');

-- =====================================================
-- INITIAL ORDERS DATA
-- =====================================================

-- Insert initial orders (from original system)
INSERT INTO `porosia` (`porosiaID`, `koha_krijimit`, `porosia_statusID`, `cmimi_total`, `pagesa_statusID`, `klientiID`) VALUES
(5, '2025-09-15 14:30:00', 3, 200.00, 2, 1),
(6, '2025-09-15 14:30:00', 3, 50.00, 2, 1),
(9, '2025-09-15 14:30:00', 2, 200.00, 2, 1),
(10, '2025-09-15 14:30:00', 3, 50.00, 2, 1);

-- =====================================================
-- ADDITIONAL CLIENTS DATA
-- =====================================================

-- Insert additional clients (for testing with multiple clients)
INSERT INTO `klienti` (`klientiID`, `adresa`, `qyteti`, `kodi_postal`, `shtetiID`, `aplikimiID`, `email`, `emri_kompanise`, `password`) VALUES
(2, 'Rr. Dëshmorët e Kombit', 'Prishtinë', '10000', 250, 2, 'vesavrellaku14@gmail.com', 'Vesa Company', 'vesa123'),
(3, 'Rr. Nëna Terezë', 'Prizren', '20000', 250, 3, 'info@pharmaplus.com', 'Pharma Plus', 'pharma123');

-- =====================================================
-- ADDITIONAL ORDERS DATA
-- =====================================================

-- Insert additional orders (for testing with multiple clients and statuses)
INSERT INTO `porosia` (`porosiaID`, `koha_krijimit`, `porosia_statusID`, `cmimi_total`, `pagesa_statusID`, `klientiID`) VALUES
(11, '2025-09-16 10:30:00', 1, 150.00, 1, 2),
(12, '2025-09-16 11:15:00', 2, 300.00, 2, 2),
(13, '2025-09-16 12:00:00', 1, 75.00, 1, 3),
(14, '2025-09-16 13:45:00', 3, 200.00, 3, 3);

-- =====================================================
-- Ndryshimet ne kete pjese
-- =====================================================
-- 
-- klientet qe jane shtu:
-- - Client #2: Vesa Company (Prishtinë) - vesa@example.com
-- - Client #3: Pharma Plus (Prizren) - info@pharmaplus.com
--
-- orders te reja (njehere jon kon order 5,6,9,10) tash edhe keto te rejat
-- - Order #11: Client #2, €150.00, Status: Në proces (1)
-- - Order #12: Client #2, €300.00, Status: Përfunduar (2)  
-- - Order #13: Client #3, €75.00, Status: Në proces (1)
-- - Order #14: Client #3, €200.00, Status: Anuluar (3)
--
-- statusi qe shfaqet edhe ne dashboard
-- 1 = Në proces (Yellow)
-- 2 = Përfunduar (Green)
-- 3 = Anuluar (Red)
--
-- edhe payment statusi
-- 1 = Në pritje
-- 2 = E paguar
-- 3 = E refuzuar

