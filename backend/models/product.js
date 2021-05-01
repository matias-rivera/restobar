"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Category, {
                foreignKey: "categoryId",
                as: "category",
            });
            this.belongsToMany(models.Order, {
                through: "OrderProduct",
                foreignKey: "productId",
                as: "order",
            });
        }
    }
    Product.init(
        {
            name: DataTypes.STRING,
            price: DataTypes.DOUBLE,
            stock: DataTypes.INTEGER,
            categoryId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Product",
        }
    );
    return Product;
};
