import {
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_RESET,
} from "../../../constants/orderConstants";
import { orderDetailsReducer } from "../../orderReducers";

/* DATA */
const order = {
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
    user: {
        id: 2,
        name: "User",
        email: "user@example.com",
        image: "/avatar.png",
        isAdmin: false,
        createdAt: "2021-05-19T03:54:18.000Z",
        updatedAt: "2021-05-19T03:54:18.000Z",
    },
    products: [
        {
            id: 1,
            name: "HAMBRUGUESA CHICA",
            price: 120,
            stock: 46,
            categoryId: 4,
            createdAt: "2021-05-19T03:54:20.000Z",
            updatedAt: "2021-05-25T13:00:31.000Z",
            OrderProduct: {
                orderId: 9,
                productId: 1,
                quantity: 3,
            },
            category: {
                id: 4,
                name: "HAMBURGUESAS",
                createdAt: "2021-05-19T03:54:18.000Z",
                updatedAt: "2021-05-19T03:54:18.000Z",
            },
        },
        {
            id: 2,
            name: "HAMBRUGUESA GRANDE",
            price: 180,
            stock: 65,
            categoryId: 4,
            createdAt: "2021-05-19T03:54:20.000Z",
            updatedAt: "2021-05-25T13:00:31.000Z",
            OrderProduct: {
                orderId: 9,
                productId: 2,
                quantity: 4,
            },
            category: {
                id: 4,
                name: "HAMBURGUESAS",
                createdAt: "2021-05-19T03:54:18.000Z",
                updatedAt: "2021-05-19T03:54:18.000Z",
            },
        },
    ],
};

/* TESTS */
it("handles actions of type ORDER_DETAILS_REQUEST", () => {
    const action = {
        type: ORDER_DETAILS_REQUEST,
    };

    const newState = orderDetailsReducer({}, action);

    expect(newState).toEqual({ loading: true });
});

it("handles actions of type ORDER_DETAILS_SUCCESS", () => {
    const action = {
        type: ORDER_DETAILS_SUCCESS,
        payload: order,
    };

    const newState = orderDetailsReducer({}, action);

    expect(newState).toEqual({ loading: false, order: order });
});

it("handles actions of type ORDER_DETAILS_FAIL", () => {
    const action = {
        type: ORDER_DETAILS_FAIL,
        payload: "Request failed with status code 500",
    };

    const newState = orderDetailsReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        error: "Request failed with status code 500",
    });
});

it("handles actions of type ORDER_DETAILS_RESET", () => {
    const action = {
        type: ORDER_DETAILS_RESET,
    };

    const newState = orderDetailsReducer({}, action);

    expect(newState).toEqual({ order: {} });
});

it("handles action with unknown type", () => {
    const action = {
        type: "UNKNOWN",
    };

    const newState = orderDetailsReducer({}, action);

    expect(newState).toEqual({});
});
