const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

module.exports = sequelize.define("Logs", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  log_start_time: Sequelize.STRING(30),
  log_end_time: Sequelize.STRING(30),
  duration: Sequelize.INTEGER(25),
  date: Sequelize.DATE,
  project_id: {
    type: Sequelize.INTEGER(11),
    references: {
      model: "Projects",
      key: "id",
    },
  },
  task_id: {
    type: Sequelize.INTEGER(11),
    references: {
      model: "Tasks",
      key: "id",
    },
  },
  user_id: {
    type: Sequelize.INTEGER(11),
    references: {
      model: "Users",
      key: "id",
    },
  },
  status: Sequelize.STRING(20),
  comment: Sequelize.STRING(300),
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
