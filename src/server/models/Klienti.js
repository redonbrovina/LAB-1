const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const Klienti = sequelize.define("Klienti", {
    klientiID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    adresa: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    qyteti: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    kodi_postal: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    shtetiID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Shteti',
            key: 'shtetiID'
        }
    },
    aplikimiID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Aplikimi',
            key: 'aplikimiID'
        }
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            isEmail: true
        }
    },
    emri_kompanise: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'klienti',
    timestamps: false,
    indexes: [
        {
            fields: ['shtetiID']
        },
        {
            fields: ['aplikimiID']
        }
    ]
});

// Define relationships after model is created
Klienti.associate = function(models) {
    Klienti.belongsTo(models.Shteti, { 
        foreignKey: 'shtetiID',
        as: 'shteti'
    });
    Klienti.belongsTo(models.Aplikimi, { 
        foreignKey: 'aplikimiID',
        as: 'aplikimi'
    });
    Klienti.hasMany(models.Cart, { 
        foreignKey: 'klientiID',
        as: 'carts'
    });
    Klienti.hasMany(models.Porosia, { 
        foreignKey: 'klientiID',
        as: 'porosite'
    });
};

module.exports = Klienti;