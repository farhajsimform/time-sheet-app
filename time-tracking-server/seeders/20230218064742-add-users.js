("use strict");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let dummyJSONUsers = [
      {
        username: "testuser",
        createdAt: new Date(),
        updatedAt: new Date(),
        password: "testuser",
        type: "user",
      },
      {
        username: "testuser1",
        createdAt: new Date(),
        updatedAt: new Date(),
        password: "testuser1",
        type: "user",
      },
      {
        username: "testuser2",
        createdAt: new Date(),
        updatedAt: new Date(),
        password: "testuser2",
        type: "user",
      },
    ];

    await queryInterface.bulkInsert("Users", dummyJSONUsers, {});

    let dummyJSONAdmins = [
      {
        username: "testadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
        password: "testadmin",
        type: "admin",
      },
      {
        username: "testadmin1",
        createdAt: new Date(),
        updatedAt: new Date(),
        password: "testadmin1",
        type: "admin",
      },
    ];

    await queryInterface.bulkInsert("Users", dummyJSONAdmins, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
