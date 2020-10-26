const Sequelize = require('sequelize')
const sequelize = require('../database/database')

const Order = sequelize.define('order',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    total: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    isPaid:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isDelivered:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
    

}) 



module.exports = Order