"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable(
      "Tasks",
      {
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
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      },
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("Tasks");
  },
};
