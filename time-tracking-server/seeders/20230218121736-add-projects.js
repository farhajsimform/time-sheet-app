("use strict");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let dummyJSONProjects = [
      {
        name: "DC time tracking app",
        description: "Its a DC time tracking app",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "DC time tracking app2",
        description: "Its a DC time tracking app2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "DC time tracking app3",
        description: "Its a DC time tracking app2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "DC time tracking app4",
        description: "Its a DC time tracking app2",
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
