const asyncHandler = require('express-async-handler')
const Product =  require('../models').Product
const Category =  require('../models').Category
const { Op } = require("sequelize");


//@desc     Create a product
//@route    POST /api/products
//@access   Private/product

exports.createProduct = asyncHandler(async (req, res) =>{
    
    const {name, price, stock, categoryId} = req.body;
    const category = await Category.findByPk(categoryId)
    
    if(category){
        createdProduct = await category.createProduct({name,price,stock})
        res.json(createdProduct)
    }else{
        res.status(404)
        throw new Error('Category not found')
    }
    
})


//@desc     Get all products
//@route    GET /api/products
//@access   Private/user
exports.getProducts = asyncHandler(async (req, res) =>{

    const pageSize = 5
    const page = Number(req.query.pageNumber) || 1
    let products
    let count

    const keyword =  req.query.keyword ? req.query.keyword : null

    if(keyword){
        count = await Product.count({
            include: [ { model: Category, as: 'category' } ],
            where: {
                [Op.or]:[
                   {id: {[Op.like]: `%${keyword}%`}},
                   {name: {[Op.like]: `%${keyword}%`}},
                   {price: keyword},
                   {'$category.name$':{[Op.like]: `%${keyword}%`}}
               ]
               }
           })
        products = await Product.findAll({ 
            include: [ { model: Category, as: 'category' } ],
            attributes: {
                exclude: ['categoryId','updatedAt']  
            }, 
            where: { 
               [Op.or]:[
                   {id: {[Op.like]: `%${keyword}%`}},
                   {name: {[Op.like]: `%${keyword}%`}},
                   {price: keyword},
                   {'$category.name$':{[Op.like]: `%${keyword}%`}}
               ]
               },
               offset: (pageSize * (page - 1)), limit: pageSize})
    }
    else{
            count = await Product.count({})
            products = await Product.findAll({
                    include: [ { model: Category, as: 'category' } ],
                    attributes: {
                        exclude: ['categoryId','updatedAt']  
                    }, 

                offset: (pageSize * (page - 1)), limit: pageSize
            })
    }

   res.json({products, page, pages: Math.ceil(count / pageSize)})

})


//@desc     Get product by ID
//@route    GET /api/products/:id
//@access   Private/user
exports.getProduct = asyncHandler(async (req, res) =>{
    const product = await Product.findByPk(req.params.id,{include: [ { model: Category, as: 'category' } ]})
    
    if(product){
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
    
})


//@desc     Update a product
//@route    PUT /api/products/:id
//@access   Private/user
exports.updateProduct = asyncHandler(async (req, res) =>{
    
    const {name, price, stock, category} = req.body;

    const product = await Product.findByPk(req.params.id)

    if(product){
        product.name = name
        product.price = price
        product.stock = stock
        product.categoryId = category
        const updatedProduct =  await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})


//@desc     Delete a product
//@route    DELETE /api/products/:id
//@access   Private/user
exports.deleteProduct = asyncHandler(async (req, res) =>{
    const product = await Product.findByPk(req.params.id)
    
    if(product){
        await product.destroy()
        res.json({message: 'Product removed'})
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})
