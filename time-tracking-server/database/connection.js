const Sequelize = require("sequelize");

const sequelize = new Sequelize("time_tracking_app", "farhaj", "test", {
  host: "0.0.0.0",
  port: 3307,
  dialect: "mysql",
  operatorsAliases: false,
});

module.exports = sequelize;
global.sequelize = sequelize;