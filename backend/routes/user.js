const express = require('express')
const userController = require('../controllers/user')
const router = express.Router()

// register
router.post('/',userController.registerUser)

router.post('/login',userController.login)


module.exports = router;
