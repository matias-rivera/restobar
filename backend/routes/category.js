const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    createCategory,
    getCategory,
    getCategories,
    updateCategory,
    deleteCategory,
    getAllCategories,
} = require("../controllers/category");

// VALIDATORS
const { categoryCreateValidator } = require("../validators/category");
const { runValidation } = require("../validators");

//ROUTES
router
    .route("/")
    .get(protect, getCategories)
    .post(protect, categoryCreateValidator, runValidation, createCategory);

router
    .route("/:id")
    .get(protect, getCategory)
    .put(protect, updateCategory)
    .delete(protect, deleteCategory);

module.exports = router;
