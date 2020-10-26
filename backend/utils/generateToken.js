const jwt = require('jsonwebtoken')

//create token
const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}

module.exports = generateToken