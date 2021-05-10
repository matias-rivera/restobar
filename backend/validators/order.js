const { check } = require("express-validator");

exports.orderCreateValidator = [
    check("total")
        .notEmpty()
        .withMessage("Total price is required")
        .isFloat()
        .withMessage("Total price must be a number"),
    check("clientId")
        .notEmpty()
        .withMessage("Client ID is required")
        .isNumeric()
        .withMessage("Client ID must be a number"),
    check("tableId")
        .isNumeric()
        .withMessage("Client ID must be a number")
        .optional({ nullable: true }),
    check("products")
        .notEmpty()
        .withMessage("Products are required")
        .isArray()
        .withMessage("Products must be an array of items"),
];
