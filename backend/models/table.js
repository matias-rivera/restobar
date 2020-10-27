const Sequelize = require('sequelize')
const sequelize = require('../database/database')

const Table = sequelize.define('table',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    occupied: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
    }) 



module.exports = Table