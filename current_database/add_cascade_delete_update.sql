-- Add CASCADE DELETE and UPDATE to all foreign key constraints
-- Run this in phpMyAdmin to enable automatic deletion/updating of related records

-- ===========================================
-- 1. APLIKIMI TABLE CONSTRAINTS
-- ===========================================

-- aplikimi -> aplikimi_status
ALTER TABLE `aplikimi` DROP FOREIGN KEY `aplikimi_ibfk_1`;
ALTER TABLE `aplikimi` 
ADD CONSTRAINT `aplikimi_ibfk_1` 
FOREIGN KEY (`aplikimi_statusID`) REFERENCES `aplikimi_status` (`aplikimi_statusID`) 
ON DELETE SET NULL ON UPDATE CASCADE;

-- aplikimi -> administrator
ALTER TABLE `aplikimi` DROP FOREIGN KEY `aplikimi_ibfk_2`;
ALTER TABLE `aplikimi` 
ADD CONSTRAINT `aplikimi_ibfk_2` 
FOREIGN KEY (`adminID`) REFERENCES `administrator` (`adminID`) 
ON DELETE SET NULL ON UPDATE CASCADE;

-- aplikimi -> shteti
ALTER TABLE `aplikimi` DROP FOREIGN KEY `fk_aplikimi_shteti`;
ALTER TABLE `aplikimi` 
ADD CONSTRAINT `fk_aplikimi_shteti` 
FOREIGN KEY (`shtetiId`) REFERENCES `shteti` (`shtetiID`) 
ON DELETE SET NULL ON UPDATE CASCADE;

-- ===========================================
-- 2. CART TABLE CONSTRAINTS
-- ===========================================

-- cart -> klienti (already has CASCADE, but let's make sure it has UPDATE too)
ALTER TABLE `cart` DROP FOREIGN KEY `cart_ibfk_1`;
ALTER TABLE `cart` 
ADD CONSTRAINT `cart_ibfk_1` 
FOREIGN KEY (`klientiID`) REFERENCES `klienti` (`klientiID`) 
ON DELETE CASCADE ON UPDATE CASCADE;

-- ===========================================
-- 3. FURNITORI TABLE CONSTRAINTS
-- ===========================================

-- furnitori -> shteti
ALTER TABLE `furnitori` DROP FOREIGN KEY `furnitori_ibfk_1`;
ALTER TABLE `furnitori` 
ADD CONSTRAINT `furnitori_ibfk_1` 
FOREIGN KEY (`shtetiID`) REFERENCES `shteti` (`shtetiID`) 
ON DELETE SET NULL ON UPDATE CASCADE;

-- ===========================================
-- 4. KLIENTI TABLE CONSTRAINTS
-- ===========================================

-- klienti -> shteti
ALTER TABLE `klienti` DROP FOREIGN KEY `klienti_ibfk_1`;
ALTER TABLE `klienti` 
ADD CONSTRAINT `klienti_ibfk_1` 
FOREIGN KEY (`shtetiID`) REFERENCES `shteti` (`shtetiID`) 
ON DELETE SET NULL ON UPDATE CASCADE;

-- klienti -> aplikimi (already has CASCADE, but let's make sure it has UPDATE too)
ALTER TABLE `klienti` DROP FOREIGN KEY `klienti_ibfk_2`;
ALTER TABLE `klienti` 
ADD CONSTRAINT `klienti_ibfk_2` 
FOREIGN KEY (`aplikimiID`) REFERENCES `aplikimi` (`aplikimiID`) 
ON DELETE CASCADE ON UPDATE CASCADE;

-- ===========================================
-- 5. LEVIZA_NE_STOK TABLE CONSTRAINTS
-- ===========================================

-- leviza_ne_stok -> produkt_variacioni
ALTER TABLE `leviza_ne_stok` DROP FOREIGN KEY `leviza_ne_stok_ibfk_1`;
ALTER TABLE `leviza_ne_stok` 
ADD CONSTRAINT `leviza_ne_stok_ibfk_1` 
FOREIGN KEY (`produkt_variacioniID`) REFERENCES `produkt_variacioni` (`produkt_variacioniID`) 
ON DELETE SET NULL ON UPDATE CASCADE;

-- leviza_ne_stok -> porosia (already has CASCADE, but let's make sure it has UPDATE too)
ALTER TABLE `leviza_ne_stok` DROP FOREIGN KEY `leviza_ne_stok_ibfk_2`;
ALTER TABLE `leviza_ne_stok` 
ADD CONSTRAINT `leviza_ne_stok_ibfk_2` 
FOREIGN KEY (`porosiaID`) REFERENCES `porosia` (`porosiaID`) 
ON DELETE CASCADE ON UPDATE CASCADE;

-- leviza_ne_stok -> administrator
ALTER TABLE `leviza_ne_stok` DROP FOREIGN KEY `leviza_ne_stok_ibfk_3`;
ALTER TABLE `leviza_ne_stok` 
ADD CONSTRAINT `leviza_ne_stok_ibfk_3` 
FOREIGN KEY (`adminID`) REFERENCES `administrator` (`adminID`) 
ON DELETE SET NULL ON UPDATE CASCADE;

-- ===========================================
-- 6. MENYRA_PAGESES TABLE CONSTRAINTS
-- ===========================================

-- menyra_pageses -> klienti
ALTER TABLE `menyra_pageses` DROP FOREIGN KEY `menyra_pageses_ibfk_1`;
ALTER TABLE `menyra_pageses` 
ADD CONSTRAINT `menyra_pageses_ibfk_1` 
FOREIGN KEY (`klientiID`) REFERENCES `klienti` (`klientiID`) 
ON DELETE SET NULL ON UPDATE CASCADE;

-- menyra_pageses -> administrator
ALTER TABLE `menyra_pageses` DROP FOREIGN KEY `menyra_pageses_ibfk_2`;
ALTER TABLE `menyra_pageses` 
ADD CONSTRAINT `menyra_pageses_ibfk_2` 
FOREIGN KEY (`adminID`) REFERENCES `administrator` (`adminID`) 
ON DELETE SET NULL ON UPDATE CASCADE;

-- ===========================================
-- 7. PAGESA TABLE CONSTRAINTS
-- ===========================================

-- pagesa -> porosia (already has CASCADE, but let's make sure it has UPDATE too)
ALTER TABLE `pagesa` DROP FOREIGN KEY `pagesa_ibfk_1`;
ALTER TABLE `pagesa` 
ADD CONSTRAINT `pagesa_ibfk_1` 
FOREIGN KEY (`porosiaID`) REFERENCES `porosia` (`porosiaID`) 
ON DELETE CASCADE ON UPDATE CASCADE;

-- pagesa -> menyra_pageses
ALTER TABLE `pagesa` DROP FOREIGN KEY `pagesa_ibfk_2`;
ALTER TABLE `pagesa` 
ADD CONSTRAINT `pagesa_ibfk_2` 
FOREIGN KEY (`menyra_pagesesID`) REFERENCES `menyra_pageses` (`menyra_pagesesID`) 
ON DELETE SET NULL ON UPDATE CASCADE;

-- pagesa -> klienti
ALTER TABLE `pagesa` DROP FOREIGN KEY `pagesa_ibfk_3`;
ALTER TABLE `pagesa` 
ADD CONSTRAINT `pagesa_ibfk_3` 
FOREIGN KEY (`klientiID`) REFERENCES `klienti` (`klientiID`) 
ON DELETE SET NULL ON UPDATE CASCADE;

-- pagesa -> administrator
ALTER TABLE `pagesa` DROP FOREIGN KEY `pagesa_ibfk_4`;
ALTER TABLE `pagesa` 
ADD CONSTRAINT `pagesa_ibfk_4` 
FOREIGN KEY (`adminID`) REFERENCES `administrator` (`adminID`) 
ON DELETE SET NULL ON UPDATE CASCADE;

-- ===========================================
-- 8. POROSIA TABLE CONSTRAINTS
-- ===========================================

-- porosia -> klienti (already has CASCADE, but let's make sure it has UPDATE too)
ALTER TABLE `porosia` DROP FOREIGN KEY `porosia_ibfk_1`;
ALTER TABLE `porosia` 
ADD CONSTRAINT `porosia_ibfk_1` 
FOREIGN KEY (`klientiID`) REFERENCES `klienti` (`klientiID`) 
ON DELETE CASCADE ON UPDATE CASCADE;

-- porosia -> pagesa_status
ALTER TABLE `porosia` DROP FOREIGN KEY `porosia_ibfk_2`;
ALTER TABLE `porosia` 
ADD CONSTRAINT `porosia_ibfk_2` 
FOREIGN KEY (`pagesa_statusID`) REFERENCES `pagesa_status` (`pagesa_statusID`) 
ON DELETE SET NULL ON UPDATE CASCADE;

-- Remove duplicate constraint (porosia_ibfk_3 is duplicate of porosia_ibfk_1)
ALTER TABLE `porosia` DROP FOREIGN KEY `porosia_ibfk_3`;

-- ===========================================
-- 9. PRODUKTI TABLE CONSTRAINTS
-- ===========================================

-- produkti -> kategoria
ALTER TABLE `produkti` DROP FOREIGN KEY `produkti_ibfk_1`;
ALTER TABLE `produkti` 
ADD CONSTRAINT `produkti_ibfk_1` 
FOREIGN KEY (`kategoriaID`) REFERENCES `kategoria` (`kategoriaID`) 
ON DELETE SET NULL ON UPDATE CASCADE;

-- produkti -> furnitori
ALTER TABLE `produkti` DROP FOREIGN KEY `produkti_ibfk_2`;
ALTER TABLE `produkti` 
ADD CONSTRAINT `produkti_ibfk_2` 
FOREIGN KEY (`furnitoriID`) REFERENCES `furnitori` (`furnitoriID`) 
ON DELETE SET NULL ON UPDATE CASCADE;

-- produkti -> doza
ALTER TABLE `produkti` DROP FOREIGN KEY `produkti_ibfk_3`;
ALTER TABLE `produkti` 
ADD CONSTRAINT `produkti_ibfk_3` 
FOREIGN KEY (`dozaID`) REFERENCES `doza` (`dozaID`) 
ON DELETE SET NULL ON UPDATE CASCADE;

-- ===========================================
-- 10. PRODUKTI_CART TABLE CONSTRAINTS
-- ===========================================

-- produkti_cart -> cart (already has CASCADE, but let's make sure it has UPDATE too)
ALTER TABLE `produkti_cart` DROP FOREIGN KEY `produkti_cart_ibfk_1`;
ALTER TABLE `produkti_cart` 
ADD CONSTRAINT `produkti_cart_ibfk_1` 
FOREIGN KEY (`cartID`) REFERENCES `cart` (`cartID`) 
ON DELETE CASCADE ON UPDATE CASCADE;

-- produkti_cart -> produkt_variacioni
ALTER TABLE `produkti_cart` DROP FOREIGN KEY `produkti_cart_ibfk_2`;
ALTER TABLE `produkti_cart` 
ADD CONSTRAINT `produkti_cart_ibfk_2` 
FOREIGN KEY (`produkt_variacioniID`) REFERENCES `produkt_variacioni` (`produkt_variacioniID`) 
ON DELETE CASCADE ON UPDATE CASCADE;

-- ===========================================
-- 11. PRODUKTI_POROSISE TABLE CONSTRAINTS
-- ===========================================

-- produkti_porosise -> porosia (already has CASCADE, but let's make sure it has UPDATE too)
ALTER TABLE `produkti_porosise` DROP FOREIGN KEY `produkti_porosise_ibfk_1`;
ALTER TABLE `produkti_porosise` 
ADD CONSTRAINT `produkti_porosise_ibfk_1` 
FOREIGN KEY (`porosiaID`) REFERENCES `porosia` (`porosiaID`) 
ON DELETE CASCADE ON UPDATE CASCADE;

-- produkti_porosise -> produkt_variacioni
ALTER TABLE `produkti_porosise` DROP FOREIGN KEY `produkti_porosise_ibfk_2`;
ALTER TABLE `produkti_porosise` 
ADD CONSTRAINT `produkti_porosise_ibfk_2` 
FOREIGN KEY (`produkt_variacioniID`) REFERENCES `produkt_variacioni` (`produkt_variacioniID`) 
ON DELETE CASCADE ON UPDATE CASCADE;

-- ===========================================
-- 12. PRODUKT_VARIACIONI TABLE CONSTRAINTS
-- ===========================================

-- produkt_variacioni -> forma
ALTER TABLE `produkt_variacioni` DROP FOREIGN KEY `produkt_variacioni_ibfk_1`;
ALTER TABLE `produkt_variacioni` 
ADD CONSTRAINT `produkt_variacioni_ibfk_1` 
FOREIGN KEY (`formaID`) REFERENCES `forma` (`formaID`) 
ON DELETE SET NULL ON UPDATE CASCADE;

-- produkt_variacioni -> produkti (THIS IS THE MAIN ONE FOR YOUR ISSUE)
ALTER TABLE `produkt_variacioni` DROP FOREIGN KEY `produkt_variacioni_ibfk_4`;
ALTER TABLE `produkt_variacioni` 
ADD CONSTRAINT `produkt_variacioni_ibfk_4` 
FOREIGN KEY (`produktiID`) REFERENCES `produkti` (`produktiID`) 
ON DELETE CASCADE ON UPDATE CASCADE;

-- ===========================================
-- SUMMARY OF CHANGES:
-- ===========================================
-- 1. All foreign keys now have ON UPDATE CASCADE
-- 2. Parent-child relationships use ON DELETE CASCADE (e.g., produkti -> produkt_variacioni)
-- 3. Reference relationships use ON DELETE SET NULL (e.g., produkti -> kategoria)
-- 4. Removed duplicate constraint (porosia_ibfk_3)
-- 5. Now you can delete products and all related variations will be deleted automatically
-- 6. You can delete clients and all their orders, carts, etc. will be deleted automatically
-- 7. You can delete orders and all related order items will be deleted automatically
