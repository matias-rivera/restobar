const asyncHandler = require('express-async-handler')
const Client = require('../models/client')


//@desc     Create a client
//@route    POST /api/clients
//@access   Private/user
exports.createClient = asyncHandler(async (req, res) =>{
    
    const {name, address, phone, email, dni} = req.body;

    
    try {
        const createdClient = 
            await Client
                .create({name, address, phone, email, dni})
        res.status(201).json(createdClient)
    } catch (error) {
        res.status(404).json({error})
        throw new Error('Cannot create Client')
    }

})



//@desc     Get all clients
//@route    GET /api/clients
//@access   Private/user
exports.getClients = asyncHandler(async (req, res) =>{
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
