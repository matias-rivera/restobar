const asyncHandler = require('express-async-handler')
const Client = require('../models/client')


//@desc     Create a client
//@route    POST /api/clients
//@access   Private/user
exports.createClient = asyncHandler(async (req, res) =>{
    
    const {name, address, phone, email, dni} = req.body;
    const createdClient = await Client.create({name, address, phone, email, dni})
    res.status(201).json(createdClient)

})



//@desc     Get all clients with pagination
//@route    GET /api/clients
//@access   Private/user
exports.getClients = asyncHandler(async (req, res) =>{
    const pageSize = 5
    const page = Number(req.query.pageNumber) || 1
    let clients
    let count

    const keyword =  req.query.keyword ? req.query.keyword : null


    if(keyword){
        count = await Client.count({ 
            where: {
               [Op.or]:[
                   {id: {[Op.like]: `%${keyword}%`}},
                   {name: {[Op.like]: `%${keyword}%`}},

               ]
               }
           })
        clients = await Client.findAll({ 
            where: { 
               [Op.or]:[
                   {id: {[Op.like]: `%${keyword}%`}},
                   {name: {[Op.like]: `%${keyword}%`}},

               ]
               }
           ,offset: (pageSize * (page - 1)), limit: pageSize})
    }
    else{
            count = await Client.count({})
            clients = await Client.findAll({offset: (pageSize * (page - 1)), limit: pageSize})
    }

   

   //const users = await User.findAll({attributes: { exclude: ['password'] }})

   res.json({clients, page, pages: Math.ceil(count / pageSize)})

})

//@desc     Get all clients
//@route    GET /api/clients/all
//@access   Private/user
exports.getAllClients = asyncHandler(async (req, res) =>{
    const clients = await Client.findAll({})
    res.json(clients)
})


//@desc     Get client by ID
//@route    GET /api/clients/:id
//@access   Private/user
exports.getClient = asyncHandler(async (req, res) =>{
    const client = await Client.findByPk(req.params.id)
    
    if(client){
        res.json(client)
    } else {
        res.status(404)
        throw new Error('Client not found')
    }
    
})


//@desc     Update client
//@route    PUT /api/clients/:id
//@access   Private/user
exports.updateClient = asyncHandler(async (req, res) =>{
    
    const {name, address, phone, email, dni} = req.body;

    const client = await Client.findByPk(req.params.id)

    if(client){
        client.name = name
        client.address = address
        client.phone = phone
        client.email = email
        client.dni = dni
        const updatedClient =  await client.save()
        res.json(updatedClient)
    } else {
        res.status(404)
        throw new Error('Client not found')
    }

})


//@desc     Delete a client
//@route    DELETE /api/clients/:id
//@access   Private/user
exports.deleteClient = asyncHandler(async (req, res) =>{
    const client = await Client.findByPk(req.params.id)
    
    if(client){
        await client.destroy()
        res.json({message: 'Client removed'})
    }else{
        res.status(404)
        throw new Error('Client not found')
    }
})
