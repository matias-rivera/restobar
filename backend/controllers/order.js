const asyncHandler = require('express-async-handler')
const Order = require('../models/order')
const Product = require('../models/product')
const { Op } = require("sequelize");
const Client = require('../models/client');
const Table = require('../models/table');



//@desc     Create a Order
//@route    POST /api/orders
//@access   Private/user
exports.createOrder = asyncHandler(async (req, res) =>{
     
  //get data from request
  const {total, table, client, products ,delivery} = req.body

  //calc stock of each product in order
  const stock = async (list) => {
    for (let index = 0; index < list.length; index++) {
      const productSearched = await Product.findByPk(list[index].id)
      if(productSearched.stock < list[index].quantity){
        return productSearched.name
      }
      
    }
    return false
  }
  
  //calc stock
  stock(products).then(result =>{
    //if there's one product with not stock available
    if(result){
      //return product name
      return result
    }else{
      //return created order
      return Order.create({
          total,
          tableId: !delivery ? table : null,
          userId: req.user.id,
          clientId: client,
          delivery: delivery
      }) 
    }
  }
  ).then( async createdOrder => {
    //return message with product name which one has no stock
     if(typeof createdOrder === 'string'){
       const message= `There is not enough stock for ${createdOrder}`
       //responde ERROR
       res.status(404).json({message})
    //add products in orderitems table
    }else{
      products.map(product =>{
        //add product in order
        createdOrder.addProduct(product.id,{
          through:{quantity: product.quantity}
        }).then(async result => {
          //update product stock
          const productIn = await Product.findByPk(product.id)
          productIn.stock = productIn.stock - product.quantity
          await productIn.save()
        })
      } )
  
      //update table to occupied
      if(!delivery){
        const tableUpdated = await Table.findByPk(createdOrder.tableId)
        tableUpdated.occupied = true
        await tableUpdated.save()
      }

      //response OK
      res.status(201).json(createdOrder)
    } 
  }

  )

  
  
  





})

//@desc     Get all orders
//@route    GET /api/orders/all
//@access   Private/user
exports.getAllOrders = asyncHandler(async (req, res) =>{

  orders = await Order.findAll({order:[['id','DESC']]})
  res.json(orders)
})


//@desc     Get all active orders
//@route    GET /api/orders/active/all
//@access   Private/user
exports.getAllActiveOrders = asyncHandler(async (req, res) =>{

  orders = await Order.findAll({ include: [ { model: Client, as: 'client' },{ model: Table, as: 'table' } ], order:[['id','DESC']], where:{isPaid: false}})
  res.json(orders)
})

//@desc     Get all delivery orders
//@route    GET /api/orders/all/delivery
//@access   Private/user
exports.getAllDeliveryOrders = asyncHandler(async (req, res) =>{

  orders = await Order.findAll({order:[['id','DESC']],where:{delivery:true}})
  res.json(orders)
})

//@desc     Get all in place orders
//@route    GET /api/orders/all/in-place
//@access   Private/user
exports.getAllInPlaceOrders = asyncHandler(async (req, res) =>{

  orders = await Order.findAll({order:[['id','DESC']],where:{delivery:false}})
  res.json(orders)
})



//@desc     Get all orders
//@route    GET /api/orders
//@access   Private/user
exports.getOrders = asyncHandler(async (req, res) =>{
  
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
          },
          order: [['id','DESC']],
            
        offset: (pageSize * (page - 1)), limit: pageSize})
  }
  else{
      count = await Order.count({})
      orders = await Order.findAll({
        include: [ { model: Client, as: 'client' },{ model: Table, as: 'table' } ],
        attributes: {
          exclude: ['userId','clientId','tableId','updatedAt']  
        },
        order: [['id','DESC']],
        offset: (pageSize * (page - 1)), limit: pageSize})
  }


  res.json({orders, page, pages: Math.ceil(count / pageSize)})


})



//@desc     Get all active orders
//@route    GET /api/orders/active
//@access   Private/user
exports.getActiveOrders = asyncHandler(async (req, res) =>{
  
  const pageSize = 5
  const page = Number(req.query.pageNumber) || 1
  const delivery = req.query.delivery ? true : false
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
                false ?  {isPaid: false } : ''
              ]
            },
            [Op.and]:{delivery: delivery}
            
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
                  {isPaid: false }
                  
                ]
              },
              [Op.and]:{delivery: delivery}
            },
            order: [['id','DESC']],
 
            
            offset: (pageSize * (page - 1)), limit: pageSize})
  }
  else{
      count = await Order.count({
        where:{
          [Op.or]:[
          {isPaid: false }
          ],
          [Op.and]:{delivery: delivery}
        }
      })
      orders = await Order.findAll({
        include: [ { model: Client, as: 'client' },{ model: Table, as: 'table' } ],
        attributes: {
          exclude: ['userId','clientId','tableId','updatedAt']  
        }, 
        where:{
            [Op.or]:[
              {isPaid: false }
            ],
            [Op.and]:{delivery: delivery}
        }, 
        order: [['id','DESC']],
        offset: (pageSize * (page - 1)), limit: pageSize})
  }


  res.json({orders, page, pages: Math.ceil(count / pageSize)})


})





//@desc     Get order by ID
//@route    GET /api/order/:id
//@access   Private/user
exports.getOrder = asyncHandler(async (req, res) =>{
  const order = await Order.findByPk(req.params.id,{ include: { all: true}})
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
      if(!order.delivery){
        const table = await Table.findByPk(order.tableId).then()
        table.occupied = false
        table.save()
      }

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
    order.delivery = !order.delivery
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


