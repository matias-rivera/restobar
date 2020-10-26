const express = require('express')
const userController = require('../controllers/user')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

// register
router.route('/')
    .post(userController.registerUser)
    .get(protect,userController.getUsers)

router.post('/login',userController.login)


module.exports = router;
