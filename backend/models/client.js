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
    address: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Address'
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Address'
    },
    email: {
        type: Sequelize.STRING,
        unique:true,
        allowNull: false,
    },
    dni: {
        type: Sequelize.STRING,
        unique:true,
        allowNull: false
    }
    

}) 



module.exports = Client