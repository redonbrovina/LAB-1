const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

/**
 * BOOK MODEL - Entiteti Child
 * 
 * Kjo është tabela që varet nga Author
 * Çdo Book ka një Author (Foreign Key)
 */
const Book = sequelize.define("Book", {
    // PRIMARY KEY - ID unik për çdo Book
    BookID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    
    // TITULLI i librit
    Title: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    
    // PËRSHKRIMI i librit (text i gjatë)
    Description: {
        type: DataTypes.TEXT,  // TEXT për tekst të gjatë (jo limit si STRING)
        allowNull: true
    },
    
    // VITI i publikimit
    PublishYear: {
        type: DataTypes.INTEGER,
        allowNull: true,
        // Validim: duhet të jetë midis 1000 dhe vitit aktual
        validate: {
            min: 1000,
            max: new Date().getFullYear() + 1  // Lejon edhe vitin e ardhshëm
        }
    },
    
    // ÇMIMI i librit
    Price: {
        type: DataTypes.DECIMAL(10, 2),  // 10 shifra totale, 2 pas presjes (99999999.99)
        allowNull: true,
        // Validim: duhet të jetë pozitiv
        validate: {
            min: 0
        }
    },
    
    // ISBN - Numri unik i librit
    ISBN: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: true  // Duhet të jetë unik (nuk lejohen dublikata)
    },
    
    // FOREIGN KEY - Lidhja me Author
    AuthorID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'author',    // Tabela që referencohet
            key: 'AuthorID'     // Fusha që referencohet
        }
    },
    
    // SOFT DELETE
    IsDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    
    // IN STOCK - A është në stok
    InStock: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    }
}, {
    tableName: "book",
    timestamps: false
});

/**
 * RELACIONE (Associations)
 */
Book.associate = function(models) {
    // MANY-TO-ONE: Shumë Books i përkasin një Author
    Book.belongsTo(models.Author, { 
        foreignKey: 'AuthorID',      // Fusha në këtë tabelë që lidhet
        as: 'author'                 // Si ta quajmë relacionin
    });
};

module.exports = Book;
