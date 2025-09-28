require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

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

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5000'],
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

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`🎀 Server running on port ${port} 🎀`);
    console.log('📧 Email configuration ready for order confirmations!');
});
