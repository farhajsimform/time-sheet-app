const Sequelize = require("sequelize");
const sequelize = require('../database/connection')

module.exports = sequelize.define("Projects", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(50),
    unique: true,
    allowNull: false,
  },
  description: Sequelize.STRING(50),
});
