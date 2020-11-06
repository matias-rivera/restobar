const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const generateToken = require('../utils/generateToken')
const bcrypt = require('bcrypt')

//@desc     Register a new user
//@route    POST /api/users
//@access   Private/admin

exports.registerUser = asyncHandler(async (req, res) =>{
    console.log(req)
    const {name, email, password, isAdmin} = req.body

    //check if email is already in use
    const userExists = await User.findOne({ where: { email } });
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    } 

    console.log('Is admin:',isAdmin)

    const user = await User.scope('withPassword').create({
        name,
        email,
        password,
        isAdmin
    })
    if(user){
        //return created user
        res.status(201).json({ 
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }

})

//@desc     Auth user & get token
//@route    POST /api/users/login
//@access   Public

exports.login = asyncHandler(async (req, res) =>{
    const {email, password} = req.body

    //check if email is already in use
    const user = await User.scope('withPassword').findOne({ where: { email } })

    //if user exist and entered password is the same
    if(user && (await user.validPassword(password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user.id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})


//@desc     Get user by ID
//@route    GET /api/users/:id
//@access   Private/admin
exports.getUser = asyncHandler(async (req, res) =>{
    const user = await User.findByPk(req.params.id)
    
    if(user){
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
    
})

//@desc     Get all users
//@route    GET /api/users
//@access   Private/admin
exports.getUsers = asyncHandler(async (req, res) =>{
    const users = await User.findAll({attributes: { exclude: ['password'] }})
    res.json(users)
})



//@desc     Update user
//@route    PUT /api/users/:id
//@access   Private/admin
exports.updateUser = asyncHandler(async (req, res) =>{
    
    const { name, email, password, isAdmin } = req.body

    const user = await User.findByPk(req.params.id)

    const salt = bcrypt.genSaltSync(10); 

    if(user){
        user.name = name
        user.email = email
        user.password = bcrypt.hashSync(password, salt)
        user.isAdmin = isAdmin
        const updatedUser =  await user.save()
        res.json(updatedUser)
    } else {
        res.status(404)
        throw new Error('User not found')
    }

})


//@desc     Delete an user
//@route    DELETE /api/users/:id
//@access   Private/admin
exports.deleteUser = asyncHandler(async (req, res) =>{
    const user = await User.findByPk(req.params.id)
    
    if(user){
        await user.destroy()
        res.json({message: 'User removed'})
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})
