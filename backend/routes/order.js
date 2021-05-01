const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const {
    createOrder,
    getOrders,
    getOrderItems,
    getOrder,
    updateOrder,
    updateOrderPay,
    updateOrderDelivery,
    deleteOrder,
    updateOrderItems,
    getActiveOrders,
    getAllOrders,
    getAllDeliveryOrders,
    getAllInPlaceOrders,
    getAllActiveOrders,
    getAllSales,
} = require("../controllers/order");

// VALIDATORS
const { runValidation } = require("../validators");
const { orderCreateValidator } = require("../validators/order");

//ROUTES
router
    .route("/")
    .post(protect, orderCreateValidator, runValidation, createOrder)
    .get(protect, getOrders);

router.route("/all").get(protect, getAllOrders);

router.route("/all/delivery").get(protect, getAllDeliveryOrders);

router.route("/all/in-place").get(protect, getAllInPlaceOrders);

router.route("/all/sales").get(protect, admin, getAllSales);

router.route("/active").get(protect, getActiveOrders);

router.route("/active/all").get(protect, getAllActiveOrders);

router
    .route("/:id")
    .get(protect, getOrder)
    .put(protect, updateOrder)
    .delete(protect, deleteOrder);

router.post("/:id/pay", protect, updateOrderPay);
router.post("/:id/delivery", protect, updateOrderDelivery);
router
    .route("/:id/items")
    .get(protect, getOrderItems)
    .put(protect, updateOrderItems);

module.exports = router;
