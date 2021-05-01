"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Client extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Order, {
                foreignKey: "clientId",
                as: "orders",
            });
        }
    }
    Client.init(
        {
            name: DataTypes.STRING,
            address: DataTypes.STRING,
            phone: DataTypes.STRING,
            email: DataTypes.STRING,
            dni: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Client",
        }
    );
    return Client;
};
