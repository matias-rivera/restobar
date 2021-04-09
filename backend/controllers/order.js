const asyncHandler = require('express-async-handler')
const Order =  require('../models').Order
const Product =  require('../models').Product
const { Op } = require("sequelize");
const Client =  require('../models').Client
const Table =  require('../models').Table
const { sequelize } = require('../models')


//utils
const {stock, checkNoStock, inOrder, getProductDifference} = require('../utils/order')

//@desc     Create a Order
//@route    POST /api/orders
//@access   Private/user
exports.createOrder = asyncHandler(async (req, res) =>{
     
  //get data from request
  const {total, table, client, products ,delivery, note} = req.body
  
  const transaction = await sequelize.transaction()
  const productsTransaction = await sequelize.transaction()

  
  stock(products).then(async stock => {
    if(stock){

      try {
 
        //create order
        const createdOrder = await Order.create({
            total,
            tableId: !delivery ? table : null,
            userId: req.user.id,
            clientId: client,
            delivery: delivery,
            note:note
        }, {transaction: transaction}) 


        //create order products
        products.forEach(async product => {
          await createdOrder.addProduct(product.id, {through:{quantity: product.quantity, transaction: transaction}})
        })
        
        //update table to occupied
        if(!delivery){
          const tableUpdated = await Table.findByPk(createdOrder.tableId)
          tableUpdated.occupied = true
          await tableUpdated.save( {transaction: transaction})
        }
        
        
        //update stock
        products.forEach(async product => {
          const productToSave = await Product.findByPk(product.id)
          productToSave.stock = productToSave.stock - product.quantity 
          await productToSave.save( {transaction: productsTransaction})
        })

        //response OK
        await transaction.commit()
        await productsTransaction.commit()

        res.status(201).json(createdOrder)
 
    
  
    
    
  } catch (e) {
    await transaction.rollback()
    await productsTransaction.rollback()
    res.status(404)
  }

    } else {
      res.status(400).json({message: "There is no stock available"})
    }
  })
  
  

  

  
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


//@desc     Get all sales
//@route    GET /api/orders/sales
//@access   Private/user
exports.getAllSales = asyncHandler(async (req, res) =>{
  orders = await Order.findAll({
    group: ["order.id"],
    includeIgnoreAttributes:false,
    attributes: [
      'id',
      'delivery',
      'total',
      'updatedAt',
      [sequelize.fn("COUNT", "products.id"), "total_products"]
  ],
    include: [{
      model: Product,
      as: 'products',
      attributes: [],
      duplicating: false
  }],
  order:[['updatedAt','DESC']],
    where:{isPaid:true}})
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
  const order = await Order.findByPk(req.params.id,{ include: { all: true, nested:true}})

  console.log(order)
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
      if(order.tableId){
        const table = await Table.findByPk(order.tableId)
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


//@desc     Update order
//@route    PUT /api/orders/:id
//@access   Private/user
exports.updateOrder = asyncHandler(async (req, res) =>{

  const order = await Order.findByPk(req.params.id, { include: { all: true, nested:true}})
  const {total, client, table, delivery, products, note} = req.body;


  if(order){

    let error = false

    //if product were updated
    if(parseInt(order.total) !== parseInt(total)){

    
      await order.getProducts().then(async productsIn => {
        
        //get list of products to update
        const productsToUpdate = productsIn.filter(function (item) {
          return inOrder(item,products)
        })

        //check stock
        const productsCheck = productsToUpdate.map(async product => {
          await checkNoStock(product,products).then(stock => {
            if(stock){
              error = stock
            }
          })
        })

        //wait for stock checking
        Promise.all(productsCheck).then(() => {
          //if there is no stock available
          if(error){
            res.status(404).json(error)
          }else{
            //get list of products to delete
            const productsToDelete  = productsIn.filter(function (item){
              return !inOrder(item, products)
            })

            //Decrease stock for each product added
            productsToUpdate.map(async product => {
              
              const difference = getProductDifference(product,products)
              const UpdatedProduct = await Product.findByPk(product.id)
              UpdatedProduct.stock = UpdatedProduct.stock + difference
              UpdatedProduct.save()
          })
            //increase stock of each deleted product
            productsToDelete.map(async productToDelete => {
              const productToDeleteUpdated = await Product.findByPk(productToDelete.id)
              productToDeleteUpdated.stock = productToDeleteUpdated.stock + productToDelete.OrderProduct.quantity
              productToDeleteUpdated.save()
            })


            



            //delete related products
            order.setProducts(null).then( item => {
              // create order items
              products.map(product =>{
                order.addProduct(product.id,{
                  through:{quantity: product.quantity}
                })
              } )
            })
          

            //save
            order.clientId= client
            order.delivery = delivery
            order.note = note
            order.tableId = table ? table : null
            order.save()
            res.status(200).json('updated')
          }

        })
        
   
      })
            
            
    }else{
      //save
      order.clientId= client
      order.delivery = delivery
      order.note = note
      order.tableId = table ? table : null
      const updatedOrder = await order.save()
      res.status(200).json(updatedOrder)
    }


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



