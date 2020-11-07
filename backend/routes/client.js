const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {
    createClient, getClients, getClient, updateClient, deleteClient, getAllClients,
} = require('../controllers/client')


//ROUTES
router.route('/')
.post(protect, createClient)
.get(protect, getClients)

router.route('/all')
    .get(protect, getAllClients)


router.route('/:id')
    .get(protect, getClient)
    .put(protect, updateClient)
    .delete(protect, deleteClient)


module.exports = router;
