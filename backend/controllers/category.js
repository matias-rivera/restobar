const asyncHandler = require("express-async-handler");
const Category = require("../models").Category;
const { Op } = require("sequelize");

//@desc     Create a category
//@route    POST /api/categories
//@access   Private/user
exports.createCategory = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const createdCategory = await Category.create({ name });
    res.status(201).json(createdCategory);
});

//@desc     Get all categories with pagination
//@route    GET /api/categories
//@access   Private/user
exports.getCategories = asyncHandler(async (req, res) => {
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? req.query.keyword : null;

    /* SEARCH OPTIONS */
    let options = {
        attributes: {
            exclude: ["updatedAt"],
        },
        offset: pageSize * (page - 1),
        limit: pageSize,
    };

    /* CHECK IF THERE IS A KEYWORD */
    if (keyword) {
        options = {
            ...options,
            where: {
                [Op.or]: [
                    { id: { [Op.like]: `%${keyword}%` } },
                    { name: { [Op.like]: `%${keyword}%` } },
                ],
            },
        };
    }

    /* QUERY */
    const count = await Category.count({ ...options });
    const categories = await Category.findAll({
        ...options,
    });

    /* RESPONSE */
    res.json({ categories, page, pages: Math.ceil(count / pageSize) });
});

//@desc     Get category by ID
//@route    GET /api/categories/:id
//@access   Private/user
exports.getCategory = asyncHandler(async (req, res) => {
    const category = await Category.findByPk(req.params.id);

    if (category) {
        res.json(category);
    } else {
        res.status(404);
        throw new Error("Category not found");
    }
});

//@desc     Update category
//@route    PUT /api/categories/:id
//@access   Private/user
exports.updateCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const category = await Category.findByPk(req.params.id);

    if (category) {
        category.name = name;
        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } else {
        res.status(404);
        throw new Error("Category not found");
    }
});

//@desc     Delete a category
//@route    DELETE /api/categories/:id
//@access   Private/user
exports.deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findByPk(req.params.id);

    if (category) {
        await category.destroy();
        res.json({ message: "Category removed" });
    } else {
        res.status(404);
        throw new Error("Category not found");
    }
});
