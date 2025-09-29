require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

// Initialize models to ensure associations are set up
require('./src/server/models');

const pagesaRoutes = require('./src/server/routes/pagesaRoutes');
const menyraPagesesRoutes = require('./src/server/routes/menyraPagesesRoutes');
const porosiaRoutes = require('./src/server/routes/porosiaRoutes');
const cartRoutes = require('./src/server/routes/cartRoutes');
const produktPorosiseRoutes = require('./src/server/routes/produktPorosiseRoutes');
const produktCartRoutes = require('./src/server/routes/produktCartRoutes');
const porosiaStatusRoutes = require('./src/server/routes/porosiaStatusRoutes');
const pagesaStatusRoutes = require('./src/server/routes/pagesaStatusRoutes');
const formRoutes = require('./src/server/routes/formRoutes');
const aplikimiRoutes = require('./src/server/routes/aplikimiRoutes');
const aplikimiStatusRoutes = require('./src/server/routes/aplikimiStatusRoutes');
const klientiRoutes = require('./src/server/routes/klientiRoutes');
const adminRoutes = require('./src/server/routes/adminRoutes');
const furnitoriRoutes = require('./src/server/routes/furnitoriRoutes');
const produktiRoutes = require('./src/server/routes/produktiRoutes');
const kategoriaRoutes = require('./src/server/routes/kategoriaRoutes');
const dozaRoutes = require('./src/server/routes/dozaRoutes');
const shtetiRoutes = require('./src/server/routes/shtetiRoutes');
const teamRoutes = require('./src/server/routes/teamRoutes');
const playerRoutes = require('./src/server/routes/playerRoutes');
const employeeRoutes = require('./src/server/routes/employeeRoutes');
const contractRoutes = require('./src/server/routes/contractRoutes');
const lecturerRoutes = require('./src/server/routes/lecturerRoutes');
const lectureRoutes = require('./src/server/routes/lectureRoutes');
const planetRoutes = require('./src/server/routes/planetRoutes');
const satelliteRoutes = require('./src/server/routes/satelliteRoutes');
const studentsRoutes = require('./src/server/routes/studentsRoutes');
const coursesRoutes = require('./src/server/routes/coursesRoutes');
const doctorsRoutes = require('./src/server/routes/doctorsRoutes');
const appointmentsRoutes = require('./src/server/routes/appointmentsRoutes');
const moviesRoutes = require('./src/server/routes/moviesRoutes');
const actorsRoutes = require('./src/server/routes/actorsRoutes');
const teachersRoutes = require('./src/server/routes/teachersRoutes');
const subjectsRoutes = require('./src/server/routes/subjectsRoutes');
const storesRoutes = require('./src/server/routes/storesRoutes');
const productsRoutes = require('./src/server/routes/productsRoutes');
const flightsRoutes = require('./src/server/routes/flightsRoutes');
const passengersRoutes = require('./src/server/routes/passengersRoutes');
const librariesRoutes = require('./src/server/routes/librariesRoutes');
const booksRoutes = require('./src/server/routes/booksRoutes');

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5000'],
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());


app.use('/api/pagesa', pagesaRoutes);
app.use('/api/menyra-pageses', menyraPagesesRoutes);
app.use('/api/klienti', klientiRoutes);
app.use('/api/aplikimi', aplikimiRoutes);
app.use('/api/aplikimi-status', aplikimiStatusRoutes);
app.use('/api/form', formRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/porosite', porosiaRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/produkt-porosise', produktPorosiseRoutes);
app.use('/api/produkt-cart', produktCartRoutes);
app.use('/api/porosia-status', porosiaStatusRoutes);
app.use('/api/pagesa-status', pagesaStatusRoutes);
app.use('/api/furnitore', furnitoriRoutes);
app.use('/api/produkte', produktiRoutes);
app.use('/api/kategorite', kategoriaRoutes);
app.use('/api/doza', dozaRoutes);
app.use('/api/shteti', shtetiRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/lecturers', lecturerRoutes);
app.use('/api/lectures', lectureRoutes);
app.use('/api/planets', planetRoutes);
app.use('/api/satellites', satelliteRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/doctors', doctorsRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/movies', moviesRoutes);
app.use('/api/actors', actorsRoutes);
app.use('/api/teachers', teachersRoutes);
app.use('/api/subjects', subjectsRoutes);
app.use('/api/stores', storesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/flights', flightsRoutes);
app.use('/api/passengers', passengersRoutes);
app.use('/api/libraries', librariesRoutes);
app.use('/api/books', booksRoutes);

// Initialize database connection
const sequelize = require('./src/server/database/Database');

// Test database connection and start server
sequelize.authenticate().then(() => {
    console.log('💌 Database connection established successfully! 💌');
    
    // Create only the new tables we need
    const createNewTables = async () => {
        try {
            // Create libraries table if it doesn't exist
            await sequelize.query(`
                CREATE TABLE IF NOT EXISTS libraries (
                    LibraryId INT AUTO_INCREMENT PRIMARY KEY,
                    Name VARCHAR(200) NOT NULL,
                    City VARCHAR(100) NOT NULL,
                    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
            `);
            
            // Create books table if it doesn't exist
            await sequelize.query(`
                CREATE TABLE IF NOT EXISTS books (
                    BookId INT AUTO_INCREMENT PRIMARY KEY,
                    Title VARCHAR(200) NOT NULL,
                    Author VARCHAR(100) NOT NULL,
                    LibraryId INT NOT NULL,
                    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (LibraryId) REFERENCES libraries(LibraryId) ON DELETE CASCADE
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
            `);
            
            // Check if books table exists and add missing columns
            const [booksTable] = await sequelize.query("SHOW TABLES LIKE 'books'");
            if (booksTable.length > 0) {
                // Check if Author column exists
                const [columns] = await sequelize.query("SHOW COLUMNS FROM books LIKE 'Author'");
                if (columns.length === 0) {
                    console.log('Adding missing Author column to books table...');
                    await sequelize.query("ALTER TABLE books ADD COLUMN Author VARCHAR(100) NOT NULL DEFAULT ''");
                }
                
                // Check if LibraryId column exists
                const [libraryIdColumns] = await sequelize.query("SHOW COLUMNS FROM books LIKE 'LibraryId'");
                if (libraryIdColumns.length === 0) {
                    console.log('Adding missing LibraryId column to books table...');
                    await sequelize.query("ALTER TABLE books ADD COLUMN LibraryId INT NOT NULL DEFAULT 1");
                }
                
                // Check if CreatedAt column exists
                const [createdAtColumns] = await sequelize.query("SHOW COLUMNS FROM books LIKE 'CreatedAt'");
                if (createdAtColumns.length === 0) {
                    console.log('Adding missing CreatedAt column to books table...');
                    await sequelize.query("ALTER TABLE books ADD COLUMN CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP");
                }
                
                // Check if UpdatedAt column exists
                const [updatedAtColumns] = await sequelize.query("SHOW COLUMNS FROM books LIKE 'UpdatedAt'");
                if (updatedAtColumns.length === 0) {
                    console.log('Adding missing UpdatedAt column to books table...');
                    await sequelize.query("ALTER TABLE books ADD COLUMN UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");
                }
            }
            
            console.log('✅ New tables created/updated successfully');
        } catch (error) {
            console.log('ℹ️ Tables may already exist:', error.message);
        }
    };
    
    createNewTables().then(() => {
        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            console.log(`🎀 Server running on port ${port} 🎀`);
            console.log('📧 Email configuration ready for order confirmations!');
        });
    });
}).catch(err => {
    console.error('❌ Database connection failed:', err);
});
