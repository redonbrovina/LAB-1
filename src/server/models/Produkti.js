const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");
const Kategoria = require("./Kategoria");

const Produkti = sequelize.define("Produkti", {
  ProduktiID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  emri: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  pershkrimi: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  KategoriaID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Kategoria",
      key: "KategoriaID"
    }
  }
}, {
  tableName: "Produkti",
  timestamps: false
});

// Associations
Produkti.belongsTo(Kategoria, { foreignKey: "KategoriaID" });
Kategoria.hasMany(Produkti, { foreignKey: "KategoriaID" });

module.exports = Produkti;
