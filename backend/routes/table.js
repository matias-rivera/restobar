const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const { getTables, getAllTables, createTable, getTable, updateTable, deleteTable, getAllAvailableTables, getAllTablesWithOrders } = require('../controllers/table')


//ROUTES
router.route('/')
    .get(protect, getTables)
    .post(protect, createTable)
    
router.route('/all')
    .get(protect, getAllTables)

router.route('/all/available')
    .get(protect, getAllAvailableTables)

    router.route('/all/with-orders')
    .get(protect, getAllTablesWithOrders)
    
router.route('/:id')
    .get(protect, getTable)
    .put(protect, updateTable)
    .delete(protect, deleteTable)

module.exports = router;
