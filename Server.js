const express = require('express');
const cors = require('cors');
const app = express();

const formRoutes = require('./src/server/routes/form');
app.use('/api/form', formRoutes);

const pagesaRoutes = require('./src/server/routes/pagesa');
const menyraPagesesRoutes = require('./src/server/routes/menyraPageses');
const levizjaNeStokRoutes = require('./src/server/routes/levizjaNeStok');

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

//app.use(express.json());

app.use('/api', formRoutes);
app.use('/api/pagesa', pagesaRoutes);
app.use('/api/menyra-pageses', menyraPagesesRoutes);
app.use('/api/stock-moves', levizjaNeStokRoutes);

const port = 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
