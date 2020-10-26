const Sequelize = require('sequelize')
const sequelize = require('../database/database')

const Client = sequelize.define('client',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: Sequelize.STRING,
    phone: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        unique:true
    },
    dni: {
        type: Sequelize.STRING,
        unique:true
    }
    

}) 



module.exports = Client