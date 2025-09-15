const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");
const Produkti = require("./Produkti");
const Forma = require("./Forma");
const Doza = require("./Doza");
const Furnitori = require("./Furnitori");

const ProduktVariacioni = sequelize.define("ProduktVariacioni", {
  ProduktVariacioniID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ProduktiID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Produkti",
      key: "ProduktiID"
    }
  },
  FormaID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Forma",
      key: "FormaID"
    }
  },
  DozaID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Doza",
      key: "DozaID"
    }
  },
  FurnitoriID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Furnitori",
      key: "FurnitoriID"
    }
  },
  cmimi: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  sasia_ne_stok: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "ProduktVariacioni",
  timestamps: false
});

// 🔗 Associations
ProduktVariacioni.belongsTo(Produkti, { foreignKey: "ProduktiID" });
Produkti.hasMany(ProduktVariacioni, { foreignKey: "ProduktiID" });

ProduktVariacioni.belongsTo(Forma, { foreignKey: "FormaID" });
Forma.hasMany(ProduktVariacioni, { foreignKey: "FormaID" });

ProduktVariacioni.belongsTo(Doza, { foreignKey: "DozaID" });
Doza.hasMany(ProduktVariacioni, { foreignKey: "DozaID" });

ProduktVariacioni.belongsTo(Furnitori, { foreignKey: "FurnitoriID" });
Furnitori.hasMany(ProduktVariacioni, { foreignKey: "FurnitoriID" });

module.exports = ProduktVariacioni;
