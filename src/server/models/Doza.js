const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const Doza = sequelize.define("Doza", {
  DozaID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  doza: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: "Doza",
  timestamps: false
});

module.exports = Doza;
