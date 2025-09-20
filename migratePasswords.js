// Load environment variables first
require('dotenv').config();

const PasswordUtils = require('./src/server/utils/PasswordUtils');
const Database = require('./src/server/database/Database');
const { Klienti, Admin } = require('./src/server/models');

async function migratePasswords() {
    try {
        console.log('Starting password migration...');
        
        // Connect to database
        await Database.authenticate();
        console.log('Database connected successfully');
        
        // Migrate client passwords
        console.log('Migrating client passwords...');
        const clients = await Klienti.findAll();
        
        for (const client of clients) {
            // Check if password is already hashed (bcrypt hashes start with $2b$)
            if (!client.password.startsWith('$2b$')) {
                console.log(`Hashing password for client: ${client.email}`);
                const hashedPassword = await PasswordUtils.hashPassword(client.password);
                await client.update({ password: hashedPassword });
            }
        }
        
        // Migrate admin passwords
        console.log('Migrating admin passwords...');
        const admins = await Admin.findAll();
        
        for (const admin of admins) {
            // Check if password is already hashed
            if (!admin.pass.startsWith('$2b$')) {
                console.log(`Hashing password for admin: ${admin.email}`);
                const hashedPassword = await PasswordUtils.hashPassword(admin.pass);
                await admin.update({ pass: hashedPassword });
            }
        }
        
        console.log('Password migration completed successfully!');
        process.exit(0);
        
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

// Run migration if this file is executed directly
if (require.main === module) {
    migratePasswords();
}

module.exports = migratePasswords;
