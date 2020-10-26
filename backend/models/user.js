const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const sequelize = require('../utils/database')

const User = sequelize.define('user',{
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
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
    

},  {
        hooks: {
            beforeCreate: (user) => {
              const salt = bcrypt.genSaltSync(10);
              user.password = bcrypt.hashSync(user.password, salt);
            }
          }
    }) 

User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}


module.exports = User