const { getStatistics } = require("../order");
const Order = require("../../models").Order;
const Product = require("../../models").Product;

jest.mock("../../models", () => ({
    Order: {
        findAll: jest.fn(),
        sum: jest.fn(),
        count: jest.fn(),
    },
    Product: {
        findAll: jest.fn(),
    },
    Client: {},
    Table: {},
}));

describe("getStatistics", () => {
    let req;
    let res;

    beforeEach(() => {
        req = {};

        res = {
            json: jest.fn(),
        };

        jest.clearAllMocks();

        Order.sum.mockResolvedValue(0);
        Order.count.mockResolvedValue(0);
    });

    test("should calculate and sort top selling products by quantity sold", async () => {
        Order.findAll.mockResolvedValue([]);

        Product.findAll.mockResolvedValue([
            {
                id: 1,
                name: "Product A",
                price: 100,
                order: [
                    { OrderProduct: { quantity: 10 } },
                    { OrderProduct: { quantity: 5 } },
                ],
            },
            {
                id: 2,
                name: "Product B",
                price: 50,
                order: [
                    { OrderProduct: { quantity: 8 } },
                ],
            },
        ]);

        await getStatistics(req, res);

        const result = res.json.mock.calls[0][0];

        expect(result.topSelling).toEqual([
            {
                id: 1,
                name: "Product A",
                price: 100,
                quantitySold: 15,
            },
            {
                id: 2,
                name: "Product B",
                price: 50,
                quantitySold: 8,
            },
        ]);
    });

    test("should include only products from paid orders", async () => {
        Order.findAll.mockResolvedValue([]);

        Product.findAll.mockResolvedValue([
            {
                id: 1,
                name: "Paid Product",
                price: 100,
                order: [
                    { OrderProduct: { quantity: 5 } },
                ],
            },
        ]);

        await getStatistics(req, res);

        expect(Product.findAll).toHaveBeenCalledWith({
            include: {
                model: Order,
                as: "order",
                where: {
                    isPaid: true,
                },
                through: {
                    attributes: ["quantity"],
                },
            },
        });
    });

    test("should return maximum 5 top selling products", async () => {
        Order.findAll.mockResolvedValue([]);

        Product.findAll.mockResolvedValue(
            Array.from({ length: 7 }, (_, index) => ({
                id: index + 1,
                name: `Product ${index + 1}`,
                price: 10,
                order: [
                    { OrderProduct: { quantity: 10 - index } },
                ],
            }))
        );

        await getStatistics(req, res);

        const result = res.json.mock.calls[0][0];

        expect(result.topSelling).toHaveLength(5);
    });

    test("should create 24 hourly buckets", async () => {
        Order.findAll
            .mockResolvedValueOnce([])
            .mockResolvedValueOnce([]);

        Product.findAll.mockResolvedValue([]);

        await getStatistics(req, res);

        const result = res.json.mock.calls[0][0];

        expect(result.peakHours).toHaveLength(24);
        expect(result.peakHours[0].hour).toBe("00:00");
        expect(result.peakHours[14].hour).toBe("14:00");
        expect(result.peakHours[23].hour).toBe("23:00");
    });

    test("should calculate sales and order count for each hour", async () => {
        Order.findAll
            .mockResolvedValueOnce([])
            .mockResolvedValueOnce([
                {
                    total: 50,
                    createdAt: new Date("2026-09-05T14:15:00"),
                },
                {
                    total: 30,
                    createdAt: new Date("2026-09-05T14:45:00"),
                },
            ]);

        Product.findAll.mockResolvedValue([]);

        await getStatistics(req, res);

        const result = res.json.mock.calls[0][0];
        const hour14 = result.peakHours[14];

        expect(hour14.totalSales).toBe(80);
        expect(hour14.ordersCount).toBe(2);
    });

    test("should identify the peak hour by highest sales", async () => {
        Order.findAll
            .mockResolvedValueOnce([])
            .mockResolvedValueOnce([
                {
                    total: 50,
                    createdAt: new Date("2026-09-05T10:00:00"),
                },
                {
                    total: 200,
                    createdAt: new Date("2026-09-05T15:00:00"),
                },
            ]);

        Product.findAll.mockResolvedValue([]);

        await getStatistics(req, res);

        const result = res.json.mock.calls[0][0];

        expect(result.peakHourSummary.hour).toBe("15:00");
        expect(result.peakHourSummary.totalSales).toBe(200);
    });
});