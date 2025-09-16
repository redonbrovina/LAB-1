require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Routes ekzistuese
const porosiaRoutes = require('./src/server/routes/porosiaRoutes');
const cartRoutes = require('./src/server/routes/cartRoutes');
const produktPorosiseRoutes = require('./src/server/routes/produktPorosiseRoutes');
const produktCartRoutes = require('./src/server/routes/produktCartRoutes');
const porosiaStatusRoutes = require('./src/server/routes/porosiaStatusRoutes');
const formRoutes = require('./src/server/routes/formRoutes');
const aplikimiRoutes = require('./src/server/routes/aplikimiRoutes');
const klientiRoutes = require('./src/server/routes/klientiRoutes');
const adminRoutes = require('./src/server/routes/adminRoutes');
const furnitoriRoutes = require('./src/server/routes/furnitoriRoutes');
const produktiRoutes = require('./src/server/routes/produktiRoutes');
const produktVariacioniRoutes = require('./src/server/routes/produktVariacioniRoutes');

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5000'],
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true
}));
app.use(express.json());

// Rutat e grupit
app.use('/api/klienti', klientiRoutes);
app.use('/api/aplikimi', aplikimiRoutes);
app.use('/api/form', formRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/porosite', porosiaRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/produkt-porosise', produktPorosiseRoutes);
app.use('/api/produkt-cart', produktCartRoutes);
app.use('/api/porosia-status', porosiaStatusRoutes);
app.use('/api/furnitore', furnitoriRoutes);
app.use('/api/produkte', produktiRoutes);
app.use('/api/variacione', produktVariacioniRoutes);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
