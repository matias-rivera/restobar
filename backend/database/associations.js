const User = require('../models/user')
const Category = require('../models/category')
const Client = require('../models/client')
const Order = require('../models/order')
const Product = require('../models/product')
const Table = require('../models/table')
const OrderItem = require('../models/order_item')

Order.belongsTo(User, {onDelete: 'CASCADE'})
Order.belongsTo(Client, {onDelete: 'CASCADE'})
Order.belongsTo(Table, {onDelete: 'CASCADE'})

User.hasMany(Order)
Client.hasMany(Order)
Table.hasMany(Order)


Product.belongsTo(Category, {onDelete: 'CASCADE'})
Category.hasMany(Product)


Order.belongsToMany(Product, {onDelete: 'CASCADE', through: OrderItem})
Product.belongsToMany(Order,{onDelete: 'CASCADE', through: OrderItem})
