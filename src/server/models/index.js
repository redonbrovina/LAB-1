const Admin = require('./Admin');
const Aplikimi = require('./Aplikimi');
const AplikimiStatus = require('./AplikimiStatus');
const Cart = require('./Cart');
const Doza = require('./Doza');
const Furnitori = require('./Furnitori');
const Kategoria = require('./Kategoria');
const Klienti = require('./Klienti');
const MenyraPageses = require('./MenyraPageses');
const Pagesa = require('./Pagesa');
const PagesaStatus = require('./PagesaStatus');
const Porosia = require('./Porosia');
const PorosiaStatus = require('./PorosiaStatus');
const ProduktCart = require('./PrdouktCart');
const Produkti = require('./Produkti');
const ProduktPorosise = require('./ProduktPorosise');
const RefreshToken = require('./RefreshToken');
const Shteti = require('./Shteti');
const Ligjeruesi = require('./Ligjeruesi');
const Ligjerata = require('./Ligjerata');

// Define all models
const models = {
    Admin,
    Aplikimi,
    AplikimiStatus,
    Cart,
    Doza,
    Furnitori,
    Kategoria,
    Klienti,
    MenyraPageses,
    Pagesa,
    PagesaStatus,
    Porosia,
    PorosiaStatus,
    ProduktCart,
    Produkti,
    ProduktPorosise,
    RefreshToken,
    Shteti,
    Ligjeruesi,
    Ligjerata
};

Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

module.exports = models;
