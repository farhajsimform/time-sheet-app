const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

module.exports = sequelize.define("Tasks", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  task_name: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  project_id: {
    type: Sequelize.INTEGER(11),
    references: {
      model: "Projects",
      key: "id",
    },
  },
});
