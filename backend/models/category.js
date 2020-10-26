const Sequelize = require('sequelize')
const sequelize = require('../database/database')

const Category = sequelize.define('category',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }

}) 



module.exports = Category