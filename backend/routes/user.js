const express = require("express");
const {
    registerUser,
    getUsers,
    login,
    getUser,
    deleteUser,
    updateUser,
    updateProfile,
} = require("../controllers/user");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

// VALIDATORS
const { runValidation } = require("../validators");
const {
    userRegisterValidator,
    userSigninValidator,
} = require("../validators/user");

// ROUTES
router
    .route("/")
    .post(protect, admin, userRegisterValidator, runValidation, registerUser)
    .get(protect, admin, getUsers);

router
    .route("/:id")
    .get(protect, getUser)
    .put(protect, admin, updateUser)
    .delete(protect, admin, deleteUser);

router.post("/login", userSigninValidator, runValidation, login);

router.route("/profile/:id").put(protect, updateProfile);

module.exports = router;
