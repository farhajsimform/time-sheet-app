
("use strict");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let dummyJSONUsers = [];

    dummyJSONUsers.push({
      username: "testuser1",
      createdAt: new Date(),
      updatedAt: new Date(),
      password: 'testuser1',
      type: "user",
    });

    await queryInterface.bulkInsert("Users", dummyJSONUsers, {});

    let dummyJSONAdmins = [];

    dummyJSONAdmins.push({
      username: "testadmin1",
      createdAt: new Date(),
      updatedAt: new Date(),
      password: 'testadmin1',
      type: "admin",
    });

    await queryInterface.bulkInsert("Users", dummyJSONAdmins, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
