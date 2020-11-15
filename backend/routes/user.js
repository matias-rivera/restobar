const express = require('express')
const {registerUser, getUsers, login, getUser, deleteUser, updateUser, updateProfile} = require('../controllers/user')
const router = express.Router()
const {protect, admin} = require('../middleware/authMiddleware')

// register
router.route('/')
    .post(protect, admin, registerUser)
    .get(protect, admin, getUsers)

router.route('/:id')
    .get(protect, getUser)
    .put(protect, admin, updateUser)
    .delete(protect, admin, deleteUser)

router.post('/login', login)

router.route('/profile/:id')
    .put(protect,updateProfile)


module.exports = router;
