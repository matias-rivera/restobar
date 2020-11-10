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
    getActiveOrders,
    getAllOrders,
    getAllDeliveryOrders,
    getAllInPlaceOrders,
    getAllActiveOrders
} = require('../controllers/order')


//ROUTES
router.route('/')
    .post(protect, createOrder)
    .get(protect, getOrders)

router.route('/all')
    .get(protect,getAllOrders)

router.route('/all/delivery')
    .get(protect,getAllDeliveryOrders)

router.route('/all/in-place')
    .get(protect,getAllInPlaceOrders)

router.route('/active')
    .get(protect, getActiveOrders)

router.route('/active/all')
    .get(protect, getAllActiveOrders)

router.route('/:id')
    .get(protect, getOrder)
    .delete(protect, deleteOrder)

router.post('/:id/pay', protect, updateOrderPay)
router.post('/:id/delivery', protect, updateOrderDelivery)
router.route('/:id/items')
    .get(protect, getOrderItems)
    .put(protect, updateOrderItems)

module.exports = router;
