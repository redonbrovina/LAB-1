-- Fix foreign key constraints with CASCADE DELETE
-- Run this in phpMyAdmin or MySQL command line

-- Disable foreign key checks temporarily
SET FOREIGN_KEY_CHECKS = 0;

-- Fix Cart -> Klienti relationship
ALTER TABLE cart 
DROP FOREIGN KEY cart_ibfk_1;

ALTER TABLE cart 
ADD CONSTRAINT cart_ibfk_1 
FOREIGN KEY (klientiID) 
REFERENCES klienti(klientiID) 
ON DELETE CASCADE;

-- Fix Porosia -> Klienti relationship
ALTER TABLE porosia 
DROP FOREIGN KEY porosia_ibfk_1;

ALTER TABLE porosia 
ADD CONSTRAINT porosia_ibfk_1 
FOREIGN KEY (klientiID) 
REFERENCES klienti(klientiID) 
ON DELETE CASCADE;

-- Fix Pagesa -> Porosia relationship
ALTER TABLE pagesa 
DROP FOREIGN KEY pagesa_ibfk_1;

ALTER TABLE pagesa 
ADD CONSTRAINT pagesa_ibfk_1 
FOREIGN KEY (porosiaID) 
REFERENCES porosia(porosiaID) 
ON DELETE CASCADE;

-- Fix ProduktiCart -> Cart relationship
ALTER TABLE produkti_cart 
DROP FOREIGN KEY produkti_cart_ibfk_1;

ALTER TABLE produkti_cart 
ADD CONSTRAINT produkti_cart_ibfk_1 
FOREIGN KEY (cartID) 
REFERENCES cart(cartID) 
ON DELETE CASCADE;

-- Fix Klienti -> Aplikimi relationship
ALTER TABLE klienti 
DROP FOREIGN KEY klienti_ibfk_2;

ALTER TABLE klienti 
ADD CONSTRAINT klienti_ibfk_2 
FOREIGN KEY (aplikimiID) 
REFERENCES aplikimi(aplikimiID) 
ON DELETE CASCADE;

-- Fix LevizaNeStok -> Porosia relationship
ALTER TABLE leviza_ne_stok 
DROP FOREIGN KEY leviza_ne_stok_ibfk_2;

ALTER TABLE leviza_ne_stok 
ADD CONSTRAINT leviza_ne_stok_ibfk_2 
FOREIGN KEY (porosiaID) 
REFERENCES porosia(porosiaID) 
ON DELETE CASCADE;

-- Fix ProduktiPorosise -> Porosia relationship
ALTER TABLE produkti_porosise 
DROP FOREIGN KEY produkti_porosise_ibfk_1;

ALTER TABLE produkti_porosise 
ADD CONSTRAINT produkti_porosise_ibfk_1 
FOREIGN KEY (porosiaID) 
REFERENCES porosia(porosiaID) 
ON DELETE CASCADE;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Show success message
SELECT 'Foreign key constraints fixed with CASCADE DELETE!' as message;
