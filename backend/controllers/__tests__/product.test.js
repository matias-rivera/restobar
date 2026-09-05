const { getLowStockProducts } = require("../product");
const Product = require("../../models").Product;
const { Op } = require("sequelize");

jest.mock("../../models", () => ({
    Product: {
        findAll: jest.fn(),
    },
    Category: {},
}));

describe("getLowStockProducts", () => {
    let req;
    let res;

    beforeEach(() => {
        req = {};

        res = {
            json: jest.fn(),
        };

        jest.clearAllMocks();
    });

    test("should return products with stock between 1 and 5", async () => {
        const products = [
            { id: 1, name: "Product 1", stock: 1 },
            { id: 2, name: "Product 2", stock: 3 },
            { id: 3, name: "Product 3", stock: 5 },
        ];

        Product.findAll.mockResolvedValue(products);

        await getLowStockProducts(req, res);

        expect(Product.findAll).toHaveBeenCalledWith({
            where: {
                stock: {
                    [Op.gt]: 0,
                    [Op.lte]: 5,
                },
            },
        });

        expect(res.json).toHaveBeenCalledWith(products);
    });

    test("should exclude products with stock equal to 0", async () => {
        Product.findAll.mockResolvedValue([
            { id: 1, name: "Out of Stock", stock: 0 },
            { id: 2, name: "Low Stock", stock: 3 },
        ]);

        await getLowStockProducts(req, res);

        const query = Product.findAll.mock.calls[0][0];

        expect(query.where.stock[Op.gt]).toBe(0);
        expect(query.where.stock[Op.lte]).toBe(5);
    });

    test("should exclude products with stock greater than 5", async () => {
        Product.findAll.mockResolvedValue([
            { id: 1, name: "Normal Stock", stock: 6 },
            { id: 2, name: "Low Stock", stock: 5 },
        ]);

        await getLowStockProducts(req, res);

        const query = Product.findAll.mock.calls[0][0];

        expect(query.where.stock[Op.gt]).toBe(0);
        expect(query.where.stock[Op.lte]).toBe(5);
    });
});