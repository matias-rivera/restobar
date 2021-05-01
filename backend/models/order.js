"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Client, {
                foreignKey: "clientId",
                as: "client",
            });
            this.belongsTo(models.Table, {
                foreignKey: "tableId",
                as: "table",
            });
            this.belongsTo(models.User, { foreignKey: "userId", as: "user" });
            this.belongsToMany(models.Product, {
                through: "OrderProduct",
                foreignKey: "orderId",
                as: "products",
            });
        }
    }
    Order.init(
        {
            total: DataTypes.DOUBLE,
            isPaid: DataTypes.BOOLEAN,
            delivery: DataTypes.BOOLEAN,
            note: DataTypes.STRING,
            userId: DataTypes.INTEGER,
            clientId: DataTypes.INTEGER,
            tableId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Order",
        }
    );
    return Order;
};
