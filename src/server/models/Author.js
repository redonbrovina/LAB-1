const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

/**
 * AUTHOR MODEL - Entiteti Parent
 * 
 * Kjo është tabela kryesore që ka relacionin One-to-Many me Book
 * Një Author mund të ketë shumë Books
 */
const Author = sequelize.define("Author", {
    // PRIMARY KEY - ID unik për çdo Author
    AuthorID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,  // Rritet automatikisht (1, 2, 3...)
        allowNull: false      // Nuk mund të jetë NULL (e detyrueshme)
    },
    
    // EMRI i autorit
    Name: {
        type: DataTypes.STRING(255),  // Maksimum 255 karaktere
        allowNull: true               // Mund të jetë NULL (opsionale)
    },
    
    // EMAIL i autorit (shembull për validim)
    Email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        // Validim për email format
        validate: {
            isEmail: true  // Duhet të jetë format valid email
        }
    },
    
    // COUNTRY - Vendi i autorit
    Country: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    
    // SOFT DELETE - Për ta markuar si të fshirë pa e fshirë realisht
    IsDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false  // Default është false (jo i fshirë)
    },
    
    // IS ACTIVE - Shembull tjetër për status
    IsActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true  // Default është true (aktiv)
    }
}, {
    tableName: "author",    // Emri i tabelës në databazë
    timestamps: false       // Nuk i përdorim createdAt dhe updatedAt
});

/**
 * RELACIONE (Associations)
 * 
 * Kjo funksion përcakton relacionet me modelet e tjera
 * Thirret automatikisht nga models/index.js
 */
Author.associate = function(models) {
    // ONE-TO-MANY: Një Author ka shumë Books
    Author.hasMany(models.Book, { 
        foreignKey: 'AuthorID',      // Fusha në tabelën Book që lidhet këtu
        as: 'books',                 // Si ta quajmë relacionin kur e marrim
        onDelete: 'CASCADE',         // Kur fshijmë Author, fshihen edhe Books
        onUpdate: 'CASCADE'          // Kur përditësojmë AuthorID, përditësohen edhe Books
    });
};

module.exports = Author;
