'use strict';

const models = require('../../models')
const Category = models.Category
const Product = models.Product

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

    const hamburguesas = await Category.findOne({ where: { name:'HAMBURGUESAS'} })
    const gaseosas = await Category.findOne({ where: { name:'GASEOSAS'} })

    await Product.bulkCreate([
      {
        name: 'HAMBRUGUESA CHICA',
        price: 120,
        stock:  50,
        categoryId: hamburguesas.id
      },
      {
        name: 'HAMBRUGUESA GRANDE',
        price: 180,
        stock:  70,
        categoryId: hamburguesas.id
      },
      {
        name: 'COCA COLA 3LTS',
        price: 180,
        stock:  70,
        categoryId: gaseosas.id
      },
      {
        name: 'COCA COLA 1.5LTS',
        price: 180,
        stock:  70,
        categoryId: gaseosas.id
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
     
     await queryInterface.bulkDelete('Products', null, {});
  }
};
