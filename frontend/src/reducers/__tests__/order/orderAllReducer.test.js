import {
    ORDER_ALL_FAIL,
    ORDER_ALL_REQUEST,
    ORDER_ALL_SUCCESS,
    ORDER_ALL_RESET,
} from "../../../constants/orderConstants";
import { orderAllReducer } from "../../orderReducers";

/* DATA */
const orders = [
    {
        id: 9,
        total: 1080,
        isPaid: false,
        delivery: true,
        note: "",
        userId: 2,
        clientId: 2,
        tableId: null,
        createdAt: "2021-05-25T13:00:30.000Z",
        updatedAt: "2021-05-25T13:00:30.000Z",
    },
    {
        id: 8,
        total: 660,
        isPaid: false,
        delivery: false,
        note: "teşk",
        userId: 2,
        clientId: 2,
        tableId: 6,
        createdAt: "2021-05-25T12:58:39.000Z",
        updatedAt: "2021-05-25T12:58:39.000Z",
    },
    {
        id: 7,
        total: 180,
        isPaid: false,
        delivery: true,
        note: "",
        userId: 1,
        clientId: 1,
        tableId: null,
        createdAt: "2021-05-20T17:32:05.000Z",
        updatedAt: "2021-05-20T17:32:05.000Z",
    },
    {
        id: 6,
        total: 360,
        isPaid: false,
        delivery: false,
        note: "",
        userId: 1,
        clientId: 2,
        tableId: 2,
        createdAt: "2021-05-19T05:39:24.000Z",
        updatedAt: "2021-05-19T05:39:24.000Z",
    },
    {
        id: 5,
        total: 360,
        isPaid: false,
        delivery: true,
        note: "",
        userId: 1,
        clientId: 1,
        tableId: null,
        createdAt: "2021-05-19T05:39:10.000Z",
        updatedAt: "2021-05-19T05:39:10.000Z",
    },
    {
        id: 4,
        total: 180,
        isPaid: true,
        delivery: false,
        note: "",
        userId: 1,
        clientId: 1,
        tableId: 1,
        createdAt: "2021-05-19T05:23:49.000Z",
        updatedAt: "2021-05-19T05:28:26.000Z",
    },
    {
        id: 3,
        total: 180,
        isPaid: true,
        delivery: false,
        note: "",
        userId: 1,
        clientId: 1,
        tableId: 1,
        createdAt: "2021-05-19T04:59:35.000Z",
        updatedAt: "2021-05-19T04:59:46.000Z",
    },
    {
        id: 2,
        total: 360,
        isPaid: true,
        delivery: false,
        note: "",
        userId: 1,
        clientId: 1,
        tableId: 1,
        createdAt: "2021-05-19T04:49:01.000Z",
        updatedAt: "2021-05-19T04:59:03.000Z",
    },
    {
        id: 1,
        total: 180,
        isPaid: true,
        delivery: false,
        note: "",
        userId: 1,
        clientId: 1,
        tableId: 1,
        createdAt: "2021-05-19T04:05:37.000Z",
        updatedAt: "2021-05-19T04:08:46.000Z",
    },
];

/* TESTS */
it("handles actions of type ORDER_ALL_REQUEST", () => {
    const action = {
        type: ORDER_ALL_REQUEST,
    };

    const newState = orderAllReducer({}, action);

    expect(newState).toEqual({ loading: true, orders: [] });
});

it("handles actions of type ORDER_ALL_SUCCESS", () => {
    const action = {
        type: ORDER_ALL_SUCCESS,
        payload: orders,
    };

    const newState = orderAllReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        orders: orders,
    });
});

it("handles actions of type ORDER_ALL_FAIL", () => {
    const action = {
        type: ORDER_ALL_FAIL,
        payload: "Request failed with status code 500",
    };

    const newState = orderAllReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        error: "Request failed with status code 500",
    });
});

it("handles actions of type ORDER_ALL_RESET", () => {
    const action = {
        type: ORDER_ALL_RESET,
    };

    const newState = orderAllReducer({}, action);

    expect(newState).toEqual({ orders: [] });
});

it("handles action with unknown type", () => {
    const action = {
        type: "UNKNOWN",
    };

    const newState = orderAllReducer({}, action);

    expect(newState).toEqual({});
});
