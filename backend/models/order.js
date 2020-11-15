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
    delivery:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    note:{
        type:Sequelize.STRING,
        allowNull:true
    }
    

}) 



module.exports = Order