import {
    ORDER_SALES_FAIL,
    ORDER_SALES_REQUEST,
    ORDER_SALES_SUCCESS,
    ORDER_SALES_RESET,
} from "../../../constants/orderConstants";
import { orderAllSalesReducer } from "../../orderReducers";

/* DATA */
const orders = [
    {
        id: 4,
        delivery: false,
        total: 180,
        updatedAt: "2021-05-19T05:28:26.000Z",
        total_products: 1,
    },
    {
        id: 3,
        delivery: false,
        total: 180,
        updatedAt: "2021-05-19T04:59:46.000Z",
        total_products: 1,
    },
    {
        id: 2,
        delivery: false,
        total: 360,
        updatedAt: "2021-05-19T04:59:03.000Z",
        total_products: 1,
    },
    {
        id: 1,
        delivery: false,
        total: 180,
        updatedAt: "2021-05-19T04:08:46.000Z",
        total_products: 1,
    },
];

/* TESTS */
it("handles actions of type ORDER_SALES_REQUEST", () => {
    const action = {
        type: ORDER_SALES_REQUEST,
    };

    const newState = orderAllSalesReducer({}, action);

    expect(newState).toEqual({ loading: true, orders: [] });
});

it("handles actions of type ORDER_SALES_SUCCESS", () => {
    const action = {
        type: ORDER_SALES_SUCCESS,
        payload: orders,
    };

    const newState = orderAllSalesReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        orders: orders,
    });
});

it("handles actions of type ORDER_SALES_FAIL", () => {
    const action = {
        type: ORDER_SALES_FAIL,
        payload: "Request failed with status code 500",
    };

    const newState = orderAllSalesReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        error: "Request failed with status code 500",
    });
});

it("handles actions of type ORDER_SALES_RESET", () => {
    const action = {
        type: ORDER_SALES_RESET,
    };

    const newState = orderAllSalesReducer({}, action);

    expect(newState).toEqual({ orders: [] });
});

it("handles action with unknown type", () => {
    const action = {
        type: "UNKNOWN",
    };

    const newState = orderAllSalesReducer({}, action);

    expect(newState).toEqual({});
});
