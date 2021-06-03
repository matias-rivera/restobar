import {
    ORDER_DELIVERY_FAIL,
    ORDER_DELIVERY_REQUEST,
    ORDER_DELIVERY_SUCCESS,
    ORDER_DELIVERY_RESET,
} from "../../../constants/orderConstants";
import { orderDeliveryListReducer } from "../../orderReducers";

/* DATA */
const orders = [
    {
        id: 10,
        total: 1,
        isPaid: false,
        delivery: true,
        note: null,
        createdAt: "2021-06-03T01:38:08.000Z",
        client: {
            id: 1,
            name: "Particular",
            address: "PARTICULAR 999",
            phone: "999999999",
            email: "particular@example.com",
            dni: "999999999",
            createdAt: "2021-05-19T03:54:19.000Z",
            updatedAt: "2021-05-19T03:54:19.000Z",
        },
        table: null,
    },
    {
        id: 9,
        total: 1080,
        isPaid: false,
        delivery: true,
        note: "",
        createdAt: "2021-05-25T13:00:30.000Z",
        client: {
            id: 2,
            name: "John Doe",
            address: "Barrio Centro, Rivadavia 1030",
            phone: "3804123123",
            email: "johndoe@example.com",
            dni: "40123123",
            createdAt: "2021-05-19T03:54:19.000Z",
            updatedAt: "2021-05-19T03:54:19.000Z",
        },
        table: null,
    },
    {
        id: 7,
        total: 180,
        isPaid: false,
        delivery: true,
        note: "",
        createdAt: "2021-05-20T17:32:05.000Z",
        client: {
            id: 1,
            name: "Particular",
            address: "PARTICULAR 999",
            phone: "999999999",
            email: "particular@example.com",
            dni: "999999999",
            createdAt: "2021-05-19T03:54:19.000Z",
            updatedAt: "2021-05-19T03:54:19.000Z",
        },
        table: null,
    },
    {
        id: 5,
        total: 360,
        isPaid: false,
        delivery: true,
        note: "",
        createdAt: "2021-05-19T05:39:10.000Z",
        client: {
            id: 1,
            name: "Particular",
            address: "PARTICULAR 999",
            phone: "999999999",
            email: "particular@example.com",
            dni: "999999999",
            createdAt: "2021-05-19T03:54:19.000Z",
            updatedAt: "2021-05-19T03:54:19.000Z",
        },
        table: null,
    },
];

/* TESTS */
it("handles actions of type ORDER_DELIVERY_REQUEST", () => {
    const action = {
        type: ORDER_DELIVERY_REQUEST,
    };

    const newState = orderDeliveryListReducer({}, action);

    expect(newState).toEqual({ loading: true, orders: [] });
});

it("handles actions of type ORDER_DELIVERY_SUCCESS", () => {
    const action = {
        type: ORDER_DELIVERY_SUCCESS,
        payload: {
            orders: orders,
            page: 1,
            pages: 1,
        },
    };

    const newState = orderDeliveryListReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        orders: orders,
        page: 1,
        pages: 1,
    });
});

it("handles actions of type ORDER_DELIVERY_FAIL", () => {
    const action = {
        type: ORDER_DELIVERY_FAIL,
        payload: "Request failed with status code 500",
    };

    const newState = orderDeliveryListReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        error: "Request failed with status code 500",
        orders: [],
    });
});

it("handles actions of type ORDER_DELIVERY_RESET", () => {
    const action = {
        type: ORDER_DELIVERY_RESET,
    };

    const newState = orderDeliveryListReducer({}, action);

    expect(newState).toEqual({ orders: [] });
});

it("handles action with unknown type", () => {
    const action = {
        type: "UNKNOWN",
    };

    const newState = orderDeliveryListReducer({}, action);

    expect(newState).toEqual({});
});
