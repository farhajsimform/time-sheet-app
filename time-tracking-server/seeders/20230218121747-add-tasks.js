"use strict";
const ProjectsModel = require("../models/Projects");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const getAllProjects = await ProjectsModel.findAll({});
    for (const object of getAllProjects) {
      const taskData = [...Array(5).keys()].map((el) => {
        let uniqueId = Math.random().toString(16).slice(2);
        return {
          task_name: `DC test ${uniqueId}`,
          project_id: object.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });
      await queryInterface.bulkInsert("Tasks", taskData, {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tasks", null, {});
  },
};
