import {
    ORDER_ALL_ACTIVE_FAIL,
    ORDER_ALL_ACTIVE_REQUEST,
    ORDER_ALL_ACTIVE_SUCCESS,
    ORDER_ALL_ACTIVE_RESET,
} from "../../../constants/orderConstants";
import { orderAllActiveReducer } from "../../orderReducers";

/* DATA */
const orders = [
    {
        id: 10,
        total: 1,
        isPaid: false,
        delivery: true,
        note: null,
        userId: 1,
        clientId: 1,
        tableId: null,
        createdAt: "2021-06-03T01:38:08.000Z",
        updatedAt: "2021-06-03T01:38:08.000Z",
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
        userId: 2,
        clientId: 2,
        tableId: null,
        createdAt: "2021-05-25T13:00:30.000Z",
        updatedAt: "2021-05-25T13:00:30.000Z",
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
        userId: 2,
        clientId: 2,
        tableId: 6,
        createdAt: "2021-05-25T12:58:39.000Z",
        updatedAt: "2021-05-25T12:58:39.000Z",
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
        userId: 1,
        clientId: 1,
        tableId: null,
        createdAt: "2021-05-20T17:32:05.000Z",
        updatedAt: "2021-05-20T17:32:05.000Z",
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
        userId: 1,
        clientId: 2,
        tableId: 2,
        createdAt: "2021-05-19T05:39:24.000Z",
        updatedAt: "2021-05-19T05:39:24.000Z",
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
        userId: 1,
        clientId: 1,
        tableId: null,
        createdAt: "2021-05-19T05:39:10.000Z",
        updatedAt: "2021-05-19T05:39:10.000Z",
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
it("handles actions of type ORDER_ALL_ACTIVE_REQUEST", () => {
    const action = {
        type: ORDER_ALL_ACTIVE_REQUEST,
    };

    const newState = orderAllActiveReducer({}, action);

    expect(newState).toEqual({ loading: true, orders: [] });
});

it("handles actions of type ORDER_ALL_ACTIVE_SUCCESS", () => {
    const action = {
        type: ORDER_ALL_ACTIVE_SUCCESS,
        payload: orders,
    };

    const newState = orderAllActiveReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        orders: orders,
    });
});

it("handles actions of type ORDER_ALL_ACTIVE_FAIL", () => {
    const action = {
        type: ORDER_ALL_ACTIVE_FAIL,
        payload: "Request failed with status code 500",
    };

    const newState = orderAllActiveReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        error: "Request failed with status code 500",
    });
});

it("handles actions of type ORDER_ALL_ACTIVE_RESET", () => {
    const action = {
        type: ORDER_ALL_ACTIVE_RESET,
    };

    const newState = orderAllActiveReducer({}, action);

    expect(newState).toEqual({ orders: [] });
});

it("handles action with unknown type", () => {
    const action = {
        type: "UNKNOWN",
    };

    const newState = orderAllActiveReducer({}, action);

    expect(newState).toEqual({});
});
