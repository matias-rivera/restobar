const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/product')


//ROUTES
router.route('/')
    .post(protect, createProduct)
    .get(protect, getProducts)

router.route('/:id')
    .get(protect, getProduct)
    .put(protect, updateProduct)
    .delete(protect, deleteProduct)


module.exports = router;
