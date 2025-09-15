const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const Kategoria = sequelize.define("Kategoria", {
  KategoriaID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  emri: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: "Kategoria",
  timestamps: false
});

module.exports = Kategoria;
