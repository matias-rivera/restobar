const Sequelize = require('sequelize')
const sequelize = require('../database/database')

const Table = sequelize.define('table',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    occupied: Sequelize.BOOLEAN
}) 



module.exports = Table