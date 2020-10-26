const User = require('../models/user')
const Category = require('../models/category')
const Client = require('../models/client')
const Order = require('../models/order')
const Product = require('../models/product')
const Table = require('../models/table')
const OrderItem = require('../models/order_item')

Order.belongsTo(User)
Order.belongsTo(Client)
Order.belongsTo(Table)

User.hasMany(Order)
Client.hasMany(Order)
Table.hasMany(Order)


Product.belongsTo(Category)
Category.hasMany(Product)


Order.belongsToMany(Product, {through: OrderItem})
Product.belongsToMany(Order,{through: OrderItem})
