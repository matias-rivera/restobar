const { getStatistics } = require("../order");
const Order = require("../../models").Order;
const Product = require("../../models").Product;
const OrderProduct = require("../../models").OrderProduct;

jest.mock("../../models", () => ({
    Order: {
        findAll: jest.fn(),
        sum: jest.fn(),
        count: jest.fn(),
    },
    Product: {
        findAll: jest.fn(),
    },
    OrderProduct: {
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
    test("should return top selling products aggregated by quantity sold", async () => {
        Order.findAll.mockResolvedValue([]);

        OrderProduct.findAll.mockResolvedValue([
            {
                productId: 1,
                quantitySold: 15,
                Product: {
                    id: 1,
                    name: "Product A",
                    price: 100,
                },
            },
            {
                productId: 2,
                quantitySold: 8,
                Product: {
                    id: 2,
                    name: "Product B",
                    price: 50,
                },
            },
        ]);

        await getStatistics(req, res);

        const result = res.json.mock.calls[0][0];

        expect(result.topSelling).toEqual([
            {
                productId: 1,
                quantitySold: 15,
                Product: {
                    id: 1,
                    name: "Product A",
                    price: 100,
                },
            },
            {
                productId: 2,
                quantitySold: 8,
                Product: {
                    id: 2,
                    name: "Product B",
                    price: 50,
                },
            },
        ]);
    });
    test("should include only paid orders in the aggregation", async () => {
        Order.findAll.mockResolvedValue([]);

        OrderProduct.findAll.mockResolvedValue([]);

        await getStatistics(req, res);

        expect(OrderProduct.findAll).toHaveBeenCalledWith(
            expect.objectContaining({
                include: expect.arrayContaining([
                    expect.objectContaining({
                        model: Order,
                        where: {
                            isPaid: true,
                        },
                    }),
                ]),
            })
        );
    });

    test("should limit top selling products to 5", async () => {
        Order.findAll.mockResolvedValue([]);

        OrderProduct.findAll.mockResolvedValue([]);

        await getStatistics(req, res);

        expect(OrderProduct.findAll).toHaveBeenCalledWith(
            expect.objectContaining({
                limit: 5,
            })
        );
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