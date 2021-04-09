'use strict';
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)


module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', salt),
        isAdmin: true
      },
      {
        name: 'User',
        email: 'user@example.com',
        isAdmin: false,
        password: bcrypt.hashSync('123456', salt)
      }
    ])

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users',null, {})

  }
};
