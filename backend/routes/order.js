const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const { 
    createOrder, 
    getOrders, 
    getOrderItems, 
    getOrder, 
    updateOrderPay, 
    updateOrderDelivery, 
    deleteOrder,
    updateOrderItems, 
    getActiveOrders
} = require('../controllers/order')


//ROUTES
router.route('/')
    .post(protect, createOrder)
    .get(protect, getOrders)

router.route('/active')
    .get(protect, getActiveOrders)

router.route('/:id')
    .get(protect, getOrder)
    .delete(protect, deleteOrder)

router.post('/:id/pay', protect, updateOrderPay)
router.post('/:id/delivery', protect, updateOrderDelivery)
router.route('/:id/items')
    .get(protect, getOrderItems)
    .put(protect, updateOrderItems)

module.exports = router;
