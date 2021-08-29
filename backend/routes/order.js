const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const {
    createOrder,
    getOrders,
    getOrder,
    updateOrder,
    updateOrderPay,
    updateOrderDelivery,
    deleteOrder,
    getStatistics,
} = require("../controllers/order");

// VALIDATORS
const { runValidation } = require("../validators");
const { orderCreateValidator } = require("../validators/order");

//ROUTES
router
    .route("/")
    .post(protect, orderCreateValidator, runValidation, createOrder)
    .get(protect, getOrders);

router.route("/statistics").get(getStatistics);

router
    .route("/:id")
    .get(protect, getOrder)
    .put(protect, updateOrder)
    .delete(protect, deleteOrder);

router.post("/:id/pay", protect, updateOrderPay);
router.post("/:id/delivery", protect, updateOrderDelivery);

module.exports = router;
