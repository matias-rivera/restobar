const asyncHandler = require('express-async-handler')
const Order = require('../models/order')
const Product = require('../models/product')
const { Op } = require("sequelize");
const Client = require('../models/client');
const Table = require('../models/table')


//@desc     Create a Order
//@route    POST /api/orders
//@access   Private/user
/* exports.createOrder = asyncHandler(async (req, res) =>{
     
  const {total, table, client, products, quantities} = req.body

  //create order
  const createdOrder = await Order.create({
      total,
      tableId: table,
      userId: req.user.id,
      clientId: client
  })
  
    // create order items
    for (let index = 0; index < products.length; index++) {
      const product = await Product.findByPk(products[index])
      createdOrder.addProduct(product,{
        through:{quantity: quantities[index]}
      })
    }


  res.status(201).json(createdOrder)

}) */

//@desc     Create a Order
//@route    POST /api/orders
//@access   Private/user
exports.createOrder = asyncHandler(async (req, res) =>{
     
  const {total, table, client, products} = req.body

  //create order
  const createdOrder = await Order.create({
      total,
      tableId: table,
      userId: req.user.id,
      clientId: client
  })
  

    // create order items
    products.map(product =>{
      createdOrder.addProduct(product.id,{
        through:{quantity: product.quantity}
      })
    } )

    
    /* for (let index = 0; index < products.length; index++) {
      const product = await Product.findByPk(products[index])
      createdOrder.addProduct(product,{
        through:{quantity: quantities[index]}
      })
    } */


  res.status(201).json(createdOrder)

})


//@desc     Get all order
//@route    GET /api/order
//@access   Private/user
exports.getOrders = asyncHandler(async (req, res) =>{
  const orders = await Order.findAll()
  res.json(orders)
})


//@desc     Get all active orders
//@route    GET /api/orders/active
//@access   Private/user
exports.getActiveOrders = asyncHandler(async (req, res) =>{
  
  const pageSize = 5
  const page = Number(req.query.pageNumber) || 1
  let orders
  let count

  const keyword =  req.query.keyword ? req.query.keyword : null

  if(keyword){
      count = await Order.count({
          include: [ { model: Client, as: 'client' },{ model: Table, as: 'table' } ], 
          where: {
            [Op.or]:[
                {id: {[Op.like]: `%${keyword}%`}},
                {total: keyword},
                {'$client.name$':{[Op.like]: `%${keyword}%`}},
                {'$table.name$':{[Op.like]: `%${keyword}%`}}
              ]
              ,
            [Op.and]:{
              [Op.or]:[
                {isPaid: false },
                {isDelivered: false},
              ]
            }
            
          }
        })
      orders = await Order.findAll({
          include: [ { model: Client, as: 'client' },{ model: Table, as: 'table' } ],
          attributes: {
            exclude: ['userId','clientId','tableId','updatedAt']  
          },   
          where: {

              [Op.or]:[
                  {id: {[Op.like]: `%${keyword}%`}},
                  {total: keyword},
                  {'$client.name$':{[Op.like]: `%${keyword}%`}},
                  {'$table.name$':{[Op.like]: `%${keyword}%`}}
                ]
              ,
              [Op.and]:{
                [Op.or]:[
                  {isPaid: false },
                  {isDelivered: false},
                ]
              }
            } 
            
        ,offset: (pageSize * (page - 1)), limit: pageSize})
  }
  else{
      count = await Order.count({
        where:{
          [Op.or]:[
          {isPaid: false },
          {isDelivered: false},
          ]
        }
      })
      orders = await Order.findAll({
        include: [ { model: Client, as: 'client' },{ model: Table, as: 'table' } ],
        attributes: {
          exclude: ['userId','clientId','tableId','updatedAt']  
        }, 
        where:{
            [Op.or]:[
            {isPaid: false },
            {isDelivered: false},
            ]
      }})
  }


 /*  [Op.or]:[
    {isPaid: false },
    {isDelivered: false},
  ] */
  //const users = await User.findAll({attributes: { exclude: ['password'] }})

  res.json({orders, page, pages: Math.ceil(count / pageSize)})





})




//@desc     Get order by ID
//@route    GET /api/order/:id
//@access   Private/user
exports.getOrder = asyncHandler(async (req, res) =>{
  const order = await Order.findByPk(req.params.id,{ include: { all: true }})
  //,{ model: Table, as: 'table' },{ model: Client, as: 'client' }
  //{attributes: { exclude: ['password'] }}
  //{include: [ { model: User, as: 'user' }]}
  //{ include: { all: true }}
  if(order){
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
  
})



//@desc     Get order items by ID
//@route    GET /api/order/:id/items
//@access   Private/user
exports.getOrderItems = asyncHandler(async (req, res) =>{
  const order = await Order.findByPk(req.params.id)
  
  if(order){
    const orderItems = await order.getProducts()
    res.json(orderItems)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
  
})


//@desc     Update order to paid
//@route    POST /api/orders/:id/pay
//@access   Private/user
exports.updateOrderPay = asyncHandler(async (req, res) =>{

  const order = await Order.findByPk(req.params.id)

  if(order){
      order.isPaid = !order.isPaid
      const updatedOrder =  await order.save()
      res.json(updatedOrder)
  } else {
      res.status(404)
      throw new Error('Order not found')
  }

})

//@desc     Update order to delivered
//@route    POST /api/orders/:id/delivery
//@access   Private/user
exports.updateOrderDelivery = asyncHandler(async (req, res) =>{

  const order = await Order.findByPk(req.params.id)

  if(order){
    order.isDelivered = !order.isDelivered
    const updatedOrder =  await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }

})


//@desc     Update order items
//@route    PUT /api/orders/:id/items
//@access   Private/user
exports.updateOrderItems = asyncHandler(async (req, res) =>{

  const order = await Order.findByPk(req.params.id)

  const {products} = req.body
  

  if(order){

    //delete order items
    order.setProducts(null).then( item => {
      // create order items
      products.map(product =>{
        order.addProduct(product.id,{
          through:{quantity: product.quantity}
        })
      } )
    })
    
  
    
    
    /* for (let index = 0; index < products.length; index++) {
      const product = await Product.findByPk(products[index])
      order.addProduct(product,{
        through:{quantity: quantities[index]}
      })
    } */
    
    //save
    //const updatedOrder =  await order.save()
    const orders = await order.getProducts()
    res.json(orders)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }

})




//@desc     Delete a order
//@route    DELETE /api/orders/:id
//@access   Private/user
exports.deleteOrder = asyncHandler(async (req, res) =>{
    const order = await Order.findByPk(req.params.id)
    
    if(order){
        await order.destroy()
        res.json({message: 'Order removed'})
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})


