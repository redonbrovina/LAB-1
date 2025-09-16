<<<<<<< Updated upstream
const express = require('express')
const cors = require('cors')
const app = express()
const formRoutes = require('./src/server/routes/formRoutes')

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
=======
const express = require('express');
const cors = require('cors');
const app = express();


const formRoutes = require('./src/server/routes/formRoutes');  // fixed
const porosiaRoutes = require('./src/server/routes/porosiaRoutes');
const cartRoutes = require('./src/server/routes/cartRoutes');
const produktPorosiseRoutes = require('./src/server/routes/produktPorosiseRoutes');
const produktCartRoutes = require('./src/server/routes/produktCartRoutes');
const porosiaStatusRoutes = require('./src/server/routes/porosiaStatusRoutes');
const pagesaRoutes = require('./src/server/routes/pagesaRoutes');
const menyraPagesesRoutes = require('./src/server/routes/menyraPagesesRoutes');
const levizjaNeStokRoutes = require('./src/server/routes/levizjaNeStokRoutes');

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5000'],
  methods: ['GET','POST','PUT','DELETE'],
>>>>>>> Stashed changes
  credentials: true
}));

app.use(express.json());

<<<<<<< Updated upstream
app.use('/api', formRoutes);
app.use('/api', pagesaRoutes);
=======
app.use('/api/form', formRoutes);
app.use('/api/porosite', porosiaRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/produkt-porosise', produktPorosiseRoutes);
app.use('/api/produkt-cart', produktCartRoutes);
app.use('/api/porosia-status', porosiaStatusRoutes);
>>>>>>> Stashed changes

app.use('/api/pagesa', pagesaRoutes);
app.use('/api/menyra-pageses', menyraPagesesRoutes);
app.use('/api/levizje-stok', levizjaNeStokRoutes);

console.log("formRoutes:", formRoutes);
console.log("porosiaRoutes:", porosiaRoutes);
console.log("cartRoutes:", cartRoutes);
console.log("produktPorosiseRoutes:", produktPorosiseRoutes);
console.log("produktCartRoutes:", produktCartRoutes);
console.log("porosiaStatusRoutes:", porosiaStatusRoutes);
console.log("pagesaRoutes:", pagesaRoutes);
console.log("menyraPagesesRoutes:", menyraPagesesRoutes);
console.log("levizjaNeStokRoutes:", levizjaNeStokRoutes);


const port = 5000;
<<<<<<< Updated upstream
app.listen(port, () => console.log(`Server is running on port ${port}`));
=======
app.listen(port, () => console.log(`✅ Server running on port ${port}`));
>>>>>>> Stashed changes
