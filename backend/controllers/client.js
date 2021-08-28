const asyncHandler = require("express-async-handler");
const Client = require("../models").Client;
const { Op } = require("sequelize");

//@desc     Create a client
//@route    POST /api/clients
//@access   Private/user
exports.createClient = asyncHandler(async (req, res) => {
    const { name, address, phone, email, dni } = req.body;
    const createdClient = await Client.create({
        name,
        address,
        phone,
        email,
        dni,
    });
    res.status(201).json(createdClient);
});

//@desc     Get all clients with pagination
//@route    GET /api/clients
//@access   Private/user
exports.getClients = asyncHandler(async (req, res) => {
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? req.query.keyword : null;
    let options = {
        attributes: {
            exclude: ["updatedAt"],
        },
        offset: pageSize * (page - 1),
        limit: pageSize,
    };

    if (keyword) {
        options = {
            ...options,
            where: {
                [Op.or]: [
                    { id: { [Op.like]: `%${keyword}%` } },
                    { name: { [Op.like]: `%${keyword}%` } },
                    { address: { [Op.like]: `%${keyword}%` } },
                    { phone: { [Op.like]: `%${keyword}%` } },
                    { email: { [Op.like]: `%${keyword}%` } },
                    { dni: { [Op.like]: `%${keyword}%` } },
                ],
            },
        };
    }

    const count = await Client.count({ ...options });
    const clients = await Client.findAll({ ...options });

    res.json({ clients, page, pages: Math.ceil(count / pageSize) });
});

//@desc     Get client by ID
//@route    GET /api/clients/:id
//@access   Private/user
exports.getClient = asyncHandler(async (req, res) => {
    const client = await Client.findByPk(req.params.id);

    if (client) {
        res.json(client);
    } else {
        res.status(404);
        throw new Error("Client not found");
    }
});

//@desc     Update client
//@route    PUT /api/clients/:id
//@access   Private/user
exports.updateClient = asyncHandler(async (req, res) => {
    const { name, address, phone, email, dni } = req.body;

    const client = await Client.findByPk(req.params.id);

    if (client) {
        client.name = name;
        client.address = address;
        client.phone = phone;
        client.email = email;
        client.dni = dni;
        const updatedClient = await client.save();
        res.json(updatedClient);
    } else {
        res.status(404);
        throw new Error("Client not found");
    }
});

//@desc     Delete a client
//@route    DELETE /api/clients/:id
//@access   Private/user
exports.deleteClient = asyncHandler(async (req, res) => {
    const client = await Client.findByPk(req.params.id);

    if (client) {
        await client.destroy();
        res.json({ message: "Client removed" });
    } else {
        res.status(404);
        throw new Error("Client not found");
    }
});
