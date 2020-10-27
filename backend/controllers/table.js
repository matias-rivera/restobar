const asyncHandler = require('express-async-handler')
const Table = require('../models/table')


//@desc     Create a table
//@route    POST /api/tables
//@access   Private/user

exports.createTable = asyncHandler(async (req, res) =>{
    
    const name = req.body.name;
    const createdTable = await Table.create({name})
    res.status(201).json(createdTable)

})



//@desc     Get all tables
//@route    GET /api/tables
//@access   Private/user
exports.getTables = asyncHandler(async (req, res) =>{
    const tables = await Table.findAll({})
    res.json(tables)
})


//@desc     Get table by ID
//@route    GET /api/tables/:id
//@access   Private/user
exports.getTable = asyncHandler(async (req, res) =>{
    const table = await Table.findByPk(req.params.id)
    
    if(table){
        res.json(table)
    } else {
        res.status(404)
        throw new Error('Table not found')
    }
    
})


//@desc     Update table
//@route    PUT /api/tables/:id
//@access   Private/user
exports.updateTable = asyncHandler(async (req, res) =>{
    
    const { name } = req.body

    const table = await Table.findByPk(req.params.id)

    if(table){
        table.name = name
        const updatedTable =  await table.save()
        res.json(updatedTable)
    } else {
        res.status(404)
        throw new Error('Table not found')
    }

})


//@desc     Delete a table
//@route    DELETE /api/tables/:id
//@access   Private/user
exports.deleteTable = asyncHandler(async (req, res) =>{
    const table = await Table.findByPk(req.params.id)
    
    if(table){
        await table.destroy()
        res.json({message: 'Table removed'})
    }else{
        res.status(404)
        throw new Error('Table not found')
    }
})
