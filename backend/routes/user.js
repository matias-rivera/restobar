const express = require('express')
const {registerUser, getUsers, login} = require('../controllers/user')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

// register
router.route('/')
    .post(registerUser)
    .get(protect, getUsers)

router.post('/login', login)


module.exports = router;
