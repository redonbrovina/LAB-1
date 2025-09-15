const express = require('express');
const cors = require('cors');
const app = express();

const porosiaRoutes = require('./src/server/routes/porosiaRoutes');
const cartRoutes = require('./src/server/routes/cartRoutes');
const produktPorosiseRoutes = require('./src/server/routes/produktPorosiseRoutes');
const produktCartRoutes = require('./src/server/routes/produktCartRoutes');
const porosiaStatusRoutes = require('./src/server/routes/porosiaStatusRoutes');

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5000'],
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true
}));

app.use(express.json());

app.use('/api/porosite', porosiaRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/produkt-porosise', produktPorosiseRoutes);
app.use('/api/produkt-cart', produktCartRoutes);
app.use('/api/porosia-status', porosiaStatusRoutes);

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
