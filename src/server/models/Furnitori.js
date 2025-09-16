const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const Furnitori = sequelize.define("Furnitori", {
  FurnitoriID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  emri: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  ShtetiID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Shteti",
      key: "ShtetiID"
    }
  }
}, {
  tableName: "Furnitori",
  timestamps: false
});

module.exports = Furnitori;
