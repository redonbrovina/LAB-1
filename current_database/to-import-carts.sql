-- 
--disa te dhena te shtuara per me testu pjesen e cart
--
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

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


INSERT INTO `kategoria` (`kategoriaID`, `emri`) VALUES
(1, 'Antibiotike'),
(2, 'Vitaminë');


INSERT INTO `furnitori` (`furnitoriID`, `emri`, `shtetiID`) VALUES
(1, 'Pharma Albania', 6),
(2, 'MedSupply Kosovo', 250);


INSERT INTO `produkti` (`produktiID`, `emri`, `pershkrimi`, `kategoriaID`) VALUES
(1, 'Amoxicillin', 'Antibiotik për infeksione bakteriale', 1),
(2, 'Vitamin C', 'Vitamin C për forcimin e imunitetit', 2);


INSERT INTO `produkt_variacioni` (`produkt_variacioniID`, `cmimi`, `sasia_ne_stok`, `formaID`, `dozaID`, `furnitoriID`, `produktiID`) VALUES

(1, 15.50, 100, 1, 2, 1, 1),  
(2, 25.00, 50, 2, 3, 1, 1),   


(3, 8.99, 200, 1, 2, 2, 2);   


INSERT INTO `cart` (`cartID`, `koha_krijimit`, `cmimi_total`, `klientiID`) VALUES
(1, '2025-09-17 09:30:00', 40.00, 1),  -- Cart for client 1
(2, '2025-09-17 10:15:00', 25.00, 2),  -- Cart for client 2  
(3, '2025-09-17 11:45:00', 0.00, 3);   -- Empty cart for client 3


INSERT INTO `produkti_cart` (`produkti_cartID`, `sasia`, `cmimi`, `cartID`, `produkt_variacioniID`) VALUES
(1, 2, 15.50, 1, 1),
(2, 1, 8.99, 1, 3),
(3, 1, 25.00, 2, 2);


