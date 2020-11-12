const express = require('express')
const {registerUser, getUsers, login, getUser, deleteUser, updateUser} = require('../controllers/user')
const router = express.Router()
const {protect, admin} = require('../middleware/authMiddleware')

// register
router.route('/')
    .post(protect, admin, registerUser)
    .get(protect, admin, getUsers)

router.route('/:id')
    .get(protect, admin, getUser)
    .put(protect, admin, updateUser)
    .delete(protect, admin, deleteUser)

router.post('/login', login)


module.exports = router;
