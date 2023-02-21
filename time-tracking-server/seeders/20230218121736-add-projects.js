("use strict");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let dummyJSONProjects = [
      {
        name: "Time tracking app",
        description: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Gamers club application",
        description: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Voting application",
        description: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Chat application",
        description: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Projects", dummyJSONProjects, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Projects", null, {});
  },
};
