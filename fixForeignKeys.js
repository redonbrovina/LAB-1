// Load environment variables first
require('dotenv').config();

const Database = require('./src/server/database/Database');

async function fixForeignKeys() {
    try {
        console.log('Fixing foreign key constraints with CASCADE DELETE...');
        
        // Connect to database
        await Database.authenticate();
        console.log('✅ Database connected successfully');
        
        // Disable foreign key checks temporarily
        await Database.query('SET FOREIGN_KEY_CHECKS = 0;');
        
        // Fix Cart -> Klienti relationship
        await Database.query(`
            ALTER TABLE cart 
            DROP FOREIGN KEY cart_ibfk_1;
        `);
        
        await Database.query(`
            ALTER TABLE cart 
            ADD CONSTRAINT cart_ibfk_1 
            FOREIGN KEY (klientiID) 
            REFERENCES klienti(klientiID) 
            ON DELETE CASCADE;
        `);
        
        // Fix Porosia -> Klienti relationship
        await Database.query(`
            ALTER TABLE porosia 
            DROP FOREIGN KEY porosia_ibfk_1;
        `);
        
        await Database.query(`
            ALTER TABLE porosia 
            ADD CONSTRAINT porosia_ibfk_1 
            FOREIGN KEY (klientiID) 
            REFERENCES klienti(klientiID) 
            ON DELETE CASCADE;
        `);
        
        // Fix Pagesa -> Porosia relationship
        await Database.query(`
            ALTER TABLE pagesa 
            DROP FOREIGN KEY pagesa_ibfk_1;
        `);
        
        await Database.query(`
            ALTER TABLE pagesa 
            ADD CONSTRAINT pagesa_ibfk_1 
            FOREIGN KEY (porosiaID) 
            REFERENCES porosia(porosiaID) 
            ON DELETE CASCADE;
        `);
        
        // Fix ProduktiCart -> Cart relationship
        await Database.query(`
            ALTER TABLE produkti_cart 
            DROP FOREIGN KEY produkti_cart_ibfk_1;
        `);
        
        await Database.query(`
            ALTER TABLE produkti_cart 
            ADD CONSTRAINT produkti_cart_ibfk_1 
            FOREIGN KEY (cartID) 
            REFERENCES cart(cartID) 
            ON DELETE CASCADE;
        `);
        
        // Fix Klienti -> Aplikimi relationship
        await Database.query(`
            ALTER TABLE klienti 
            DROP FOREIGN KEY klienti_ibfk_2;
        `);
        
        await Database.query(`
            ALTER TABLE klienti 
            ADD CONSTRAINT klienti_ibfk_2 
            FOREIGN KEY (aplikimiID) 
            REFERENCES aplikimi(aplikimiID) 
            ON DELETE CASCADE;
        `);
        
        // Fix LevizaNeStok -> Porosia relationship
        await Database.query(`
            ALTER TABLE leviza_ne_stok 
            DROP FOREIGN KEY leviza_ne_stok_ibfk_2;
        `);
        
        await Database.query(`
            ALTER TABLE leviza_ne_stok 
            ADD CONSTRAINT leviza_ne_stok_ibfk_2 
            FOREIGN KEY (porosiaID) 
            REFERENCES porosia(porosiaID) 
            ON DELETE CASCADE;
        `);
        
        // Fix ProduktiPorosise -> Porosia relationship
        await Database.query(`
            ALTER TABLE produkti_porosise 
            DROP FOREIGN KEY produkti_porosise_ibfk_1;
        `);
        
        await Database.query(`
            ALTER TABLE produkti_porosise 
            ADD CONSTRAINT produkti_porosise_ibfk_1 
            FOREIGN KEY (porosiaID) 
            REFERENCES porosia(porosiaID) 
            ON DELETE CASCADE;
        `);
        
        // Re-enable foreign key checks
        await Database.query('SET FOREIGN_KEY_CHECKS = 1;');
        
        console.log('✅ ALL foreign key constraints fixed with CASCADE DELETE!');
        console.log('Now you can delete applications and all related data will be deleted automatically.');
        
    } catch (error) {
        console.error('❌ Error fixing foreign key constraints:', error);
    } finally {
        await Database.close();
    }
}

// Run migration if this file is executed directly
if (require.main === module) {
    fixForeignKeys();
}

module.exports = fixForeignKeys;
