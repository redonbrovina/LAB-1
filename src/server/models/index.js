const Admin = require('./Admin');
const Aplikimi = require('./Aplikimi');
const AplikimiStatus = require('./AplikimiStatus');
const Cart = require('./Cart');
const Contract = require('./Contract');
const Doza = require('./Doza');
const Employee = require('./Employee');
const Furnitori = require('./Furnitori');
const Kategoria = require('./Kategoria');
const Klienti = require('./Klienti');
const Lecture = require('./Lecture');
const Lecturer = require('./Lecturer');
const MenyraPageses = require('./MenyraPageses');
const Pagesa = require('./Pagesa');
const PagesaStatus = require('./PagesaStatus');
const Player = require('./Player');
const Porosia = require('./Porosia');
const PorosiaStatus = require('./PorosiaStatus');
const ProduktCart = require('./PrdouktCart');
const Produkti = require('./Produkti');
const ProduktPorosise = require('./ProduktPorosise');
const RefreshToken = require('./RefreshToken');
const Shteti = require('./Shteti');
const Team = require('./Team');

// Define all models
const models = {
    Admin,
    Aplikimi,
    AplikimiStatus,
    Cart,
    Contract,
    Doza,
    Employee,
    Furnitori,
    Kategoria,
    Klienti,
    Lecture,
    Lecturer,
    MenyraPageses,
    Pagesa,
    PagesaStatus,
    Player,
    Porosia,
    PorosiaStatus,
    ProduktCart,
    Produkti,
    ProduktPorosise,
    RefreshToken,
    Shteti,
    Team
};

// Set up all associations
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

module.exports = models;
