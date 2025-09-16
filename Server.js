const express = require('express');
const cors = require('cors');
const app = express();


const formRoutes = require('./src/server/routes/formRoutes');
const pagesaRoutes = require('./src/server/routes/pagesaRoutes');
const menyraPagesesRoutes = require('./src/server/routes/menyraPagesesRoutes');
const levizjaNeStokRoutes = require('./src/server/routes/levizjaNeStokRoutes');

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5000'],
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));

app.use(express.json());

app.use('/api/form', formRoutes);
app.use('/api/pagesa', pagesaRoutes);
app.use('/api/menyra-pageses', menyraPagesesRoutes);
app.use('/api/levizje-stok', levizjaNeStokRoutes);

console.log("formRoutes:", formRoutes);
console.log("pagesaRoutes:", pagesaRoutes);
console.log("menyraPagesesRoutes:", menyraPagesesRoutes);
console.log("levizjaNeStokRoutes:", levizjaNeStokRoutes);


const port = 5000;
app.listen(port, () => console.log(`✅ Server running on port ${port}`));