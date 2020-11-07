const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {
    createCategory,
    getCategory,
    getCategories,
    updateCategory,
    deleteCategory,
    getAllCategories
} = require('../controllers/category')


//ROUTES
router.route('/')
    .get(protect, getCategories)
    .post(protect, createCategory)

router.route('/all')
    .get(protect, getAllCategories)

router.route('/:id')
    .get(protect, getCategory)
    .put(protect, updateCategory)
    .delete(protect, deleteCategory)



module.exports = router;
