
-- ekzekuto ne phpMyAdmin

-- 1. Shtoj kolonat e reja në tabelën produkti
ALTER TABLE `produkti` 
ADD COLUMN `furnitoriID` int(11) DEFAULT NULL AFTER `kategoriaID`,
ADD COLUMN `sasia_ne_stok` int(11) NOT NULL DEFAULT 0 CHECK (`sasia_ne_stok` >= 0) AFTER `furnitoriID`,
ADD COLUMN `dozaID` int(11) DEFAULT NULL AFTER `sasia_ne_stok`;

-- 2. Shtoj foreign key constraints për produkti
ALTER TABLE `produkti`
ADD KEY `furnitoriID` (`furnitoriID`),
ADD KEY `dozaID` (`dozaID`);

-- 3. Shtoj foreign key constraints për produkti
ALTER TABLE `produkti`
ADD CONSTRAINT `produkti_ibfk_2` FOREIGN KEY (`furnitoriID`) REFERENCES `furnitori` (`furnitoriID`),
ADD CONSTRAINT `produkti_ibfk_3` FOREIGN KEY (`dozaID`) REFERENCES `doza` (`dozaID`);

-- 4. Heq kolonat nga produkt_variacioni
ALTER TABLE `produkt_variacioni` 
DROP FOREIGN KEY `produkt_variacioni_ibfk_2`, -- dozaID constraint
DROP FOREIGN KEY `produkt_variacioni_ibfk_3`, -- furnitoriID constraint
DROP COLUMN `furnitoriID`,
DROP COLUMN `sasia_ne_stok`,
DROP COLUMN `dozaID`;

-- 5. Shtoj klientiID dhe adminID në tabelën pagesa
ALTER TABLE `pagesa`
ADD COLUMN `klientiID` int(11) DEFAULT NULL AFTER `numri_llogarise`,
ADD COLUMN `adminID` int(11) DEFAULT NULL AFTER `klientiID`;

-- 6. Shtoj foreign key constraints për pagesa
ALTER TABLE `pagesa`
ADD KEY `klientiID` (`klientiID`),
ADD KEY `adminID` (`adminID`);

ALTER TABLE `pagesa`
ADD CONSTRAINT `pagesa_ibfk_3` FOREIGN KEY (`klientiID`) REFERENCES `klienti` (`klientiID`),
ADD CONSTRAINT `pagesa_ibfk_4` FOREIGN KEY (`adminID`) REFERENCES `administrator` (`adminID`);

-- 7. Shtoj klientiID dhe adminID në tabelën menyra_pageses
ALTER TABLE `menyra_pageses`
ADD COLUMN `klientiID` int(11) DEFAULT NULL AFTER `menyra_pageses`,
ADD COLUMN `adminID` int(11) DEFAULT NULL AFTER `klientiID`;

-- 8. Shtoj foreign key constraints për menyra_pageses
ALTER TABLE `menyra_pageses`
ADD KEY `klientiID` (`klientiID`),
ADD KEY `adminID` (`adminID`);

ALTER TABLE `menyra_pageses`
ADD CONSTRAINT `menyra_pageses_ibfk_1` FOREIGN KEY (`klientiID`) REFERENCES `klienti` (`klientiID`),
ADD CONSTRAINT `menyra_pageses_ibfk_2` FOREIGN KEY (`adminID`) REFERENCES `administrator` (`adminID`);

-- !!!!!!!!!!!!!KUJJJJJJJJJJJDESSSSSSSSSS!!!!!!!!!!!!!!!!
-- 9. Migrimi i të dhënave (nëse ka të dhëna ekzistuese)
-- Kujdes: Kjo duhet të bëhet me kujdes nëse ka të dhëna ekzistuese
-- Për shembull, nëse ka produkt_variacioni me furnitoriID, duhet t'i zhvendosim në produkti

-- Shembull për migrimin e të dhënave (komento nëse nuk ka të dhëna):
/*
UPDATE produkti p
INNER JOIN produkt_variacioni pv ON p.produktiID = pv.produktiID
SET p.furnitoriID = pv.furnitoriID,
    p.sasia_ne_stok = pv.sasia_ne_stok,
    p.dozaID = pv.dozaID
WHERE pv.furnitoriID IS NOT NULL OR pv.sasia_ne_stok IS NOT NULL OR pv.dozaID IS NOT NULL;
*/
