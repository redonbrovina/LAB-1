const Admin = require('./Admin');
const Aplikimi = require('./Aplikimi');
const AplikimiStatus = require('./AplikimiStatus');
const Cart = require('./Cart');
const Doza = require('./Doza');
const Forma = require('./Forma');
const Furnitori = require('./Furnitori');
const Kategoria = require('./Kategoria');
const Klienti = require('./Klienti');
const LevizjaNeStok = require('./LevizjaNeStok');
const MenyraPageses = require('./MenyraPageses');
const Pagesa = require('./Pagesa');
const PagesaStatus = require('./PagesaStatus');
const Porosia = require('./Porosia');
const PorosiaStatus = require('./PorosiaStatus');
const ProduktCart = require('./PrdouktCart');
const Produkti = require('./Produkti');
const ProduktPorosise = require('./ProduktPorosise');
const ProduktVariacioni = require('./ProduktVariacioni');
const RefreshToken = require('./RefreshToken');
const Shteti = require('./Shteti');

// Define all models
const models = {
    Admin,
    Aplikimi,
    AplikimiStatus,
    Cart,
    Doza,
    Forma,
    Furnitori,
    Kategoria,
    Klienti,
    LevizjaNeStok,
    MenyraPageses,
    Pagesa,
    PagesaStatus,
    Porosia,
    PorosiaStatus,
    ProduktCart,
    Produkti,
    ProduktPorosise,
    ProduktVariacioni,
    RefreshToken,
    Shteti
};

// Set up all associations
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

module.exports = models;
