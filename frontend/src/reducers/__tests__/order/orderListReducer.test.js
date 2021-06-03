import {
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_RESET,
} from "../../../constants/orderConstants";
import { orderListReducer } from "../../orderReducers";

/* DATA */
const orders = [
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
        id: 8,
        total: 660,
        isPaid: false,
        delivery: false,
        note: "teşk",
        createdAt: "2021-05-25T12:58:39.000Z",
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
        table: {
            id: 6,
            name: "BARRA 1",
            occupied: true,
            createdAt: "2021-05-19T03:54:18.000Z",
            updatedAt: "2021-05-25T12:58:40.000Z",
        },
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
        id: 6,
        total: 360,
        isPaid: false,
        delivery: false,
        note: "",
        createdAt: "2021-05-19T05:39:24.000Z",
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
        table: {
            id: 2,
            name: "PATIO 2",
            occupied: true,
            createdAt: "2021-05-19T03:54:18.000Z",
            updatedAt: "2021-05-19T05:39:25.000Z",
        },
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
it("handles actions of type ORDER_LIST_REQUEST", () => {
    const action = {
        type: ORDER_LIST_REQUEST,
    };

    const newState = orderListReducer({}, action);

    expect(newState).toEqual({ loading: true, orders: [] });
});

it("handles actions of type ORDER_LIST_SUCCESS", () => {
    const action = {
        type: ORDER_LIST_SUCCESS,
        payload: {
            orders: orders,
            page: 1,
            pages: 2,
        },
    };

    const newState = orderListReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        orders: orders,
        page: 1,
        pages: 2,
    });
});

it("handles actions of type ORDER_LIST_FAIL", () => {
    const action = {
        type: ORDER_LIST_FAIL,
        payload: "Request failed with status code 500",
    };

    const newState = orderListReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        error: "Request failed with status code 500",
    });
});

it("handles actions of type ORDER_LIST_RESET", () => {
    const action = {
        type: ORDER_LIST_RESET,
    };

    const newState = orderListReducer({}, action);

    expect(newState).toEqual({ orders: [] });
});

it("handles action with unknown type", () => {
    const action = {
        type: "UNKNOWN",
    };

    const newState = orderListReducer({}, action);

    expect(newState).toEqual({});
});
