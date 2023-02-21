"use strict";
const ProjectsModel = require("../models/Projects");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const getAllProjects = await ProjectsModel.findAll({});
    const TaskNames = [
      "User profile setup",
      "Image scroll issue",
      "Background color issue",
      "Navbar implementation",
      "Add logic for unique name",
      "User profile testing",
      "Login signup implementation",
    ];
    for (const object of getAllProjects) {
      const taskData = [...Array(5).keys()].map((el) => {
        return {
          task_name: TaskNames[Math.floor(Math.random() * TaskNames.length)],
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

