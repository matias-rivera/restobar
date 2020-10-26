const asyncHandler = require('express-async-handler')
const Product = require('../models/product')
const Category = require('../models/category')


//@desc     Create a product
//@route    POST /api/products
//@access   Private/product

exports.createProduct = asyncHandler(async (req, res) =>{
    
    const {name, price, stock, category} = req.body;
    Category.findByPk(category)
        .then(category => {
            return category.createProduct({name,price,stock})
        })
        .then(product => {
            res.status(201).json(product)
        })
        .catch(error => {
            res.status(404).json({error})
            throw new Error('Cannot create Product')
        })
})



//@desc     Get all products
//@route    GET /api/products
//@access   Private/user
exports.getProducts = asyncHandler(async (req, res) =>{
    const products = await Product.findAll({include: [ { model: Category, as: 'category' } ]})
    res.json(products)
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
    
    const {name, price, stock} = req.body;

    const product = await Product.findByPk(req.params.id)

    if(product){
        product.name = name
        product.price = price
        product.stock = stock
        const updatedProduct =  await product.save()
        console.log(product)
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Category not found')
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
