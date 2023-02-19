const Sequelize = require("sequelize");
const sequelize = require('../database/connection')

module.exports = sequelize.define("Users", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING(50),
    unique: true,
    allowNull: false,
  },
  password: Sequelize.STRING(200),
  type: Sequelize.STRING(10)
});
