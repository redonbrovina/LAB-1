const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const Aplikimi = sequelize.define("Aplikimi", {
    aplikimiID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    emri_kompanise: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            isEmail: true
        }
    },
    aplikimi_statusID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'AplikimiStatus',
            key: 'aplikimi_statusID'
        }
    },
    koha_aplikimit: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    koha_kontrollimit: {
        type: DataTypes.DATE,
        allowNull: true
    },
    Arsyeja: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    adminID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Admin',
            key: 'adminID'
        }
    },
    adresa: {
        type: DataTypes.STRING(255),
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
    qyteti: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    kodi_postal: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'aplikimi',
    timestamps: false
});

// Define relationships after model is created
Aplikimi.associate = function(models) {
    Aplikimi.belongsTo(models.AplikimiStatus, { 
        foreignKey: 'aplikimi_statusID',
        as: 'statusi'
    });
    Aplikimi.belongsTo(models.Admin, { 
        foreignKey: 'adminID',
        as: 'admin'
    });
    Aplikimi.belongsTo(models.Shteti, { 
        foreignKey: 'shtetiID',
        as: 'shteti'
    });
    Aplikimi.hasOne(models.Klienti, { 
        foreignKey: 'aplikimiID',
        as: 'klienti'
    });
};

module.exports = Aplikimi;