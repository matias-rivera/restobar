const Product = require("../models").Product;
const Table = require("../models").Table;
const Order = require("../models").Order;

/* check stock of each product */
exports.stock = async (list) => {
    for (let index = 0; index < list.length; index++) {
        const productSearched = await Product.findByPk(list[index].id);
        if (productSearched.stock < list[index].quantity) {
            return false;
        }
    }
    return true;
};

/* update table */
exports.updateTable = async (id, occupied) => {
    const table = await Table.findByPk(id);
    table.occupied = occupied;
    await table.save();
};

/* Add products  */
exports.addProductsInOrder = async (order, products) => {
    products.forEach(async (product) => {
        await order.addProduct(product.id, {
            through: { quantity: product.quantity },
        });
    });
};

/* 
Update stock from products
condition
    +1 INCREASE STOCK 
    -1 DECREASE STOCK
*/
exports.updateProductsStock = async (products, condition) => {
    await products.forEach(async (product) => {
        const productToUpdate = await Product.findByPk(product.id);

        if (productToUpdate) {
            if (condition >= 1) {
                productToUpdate.stock += product.quantity;
            } else {
                productToUpdate.stock -= product.quantity;
            }
            await productToUpdate.save();
        }
    });
};
