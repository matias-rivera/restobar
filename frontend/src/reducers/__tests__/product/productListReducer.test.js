import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_RESET,
} from "../../../constants/productConstants";

import { productListReducer } from "../../productReducers";

/* DATA */
const products = [
    {
        id: 1,
        name: "HAMBRUGUESA CHICA",
        price: 120,
        stock: 50,
        createdAt: "2021-05-19T03:54:20.000Z",
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
        stock: 70,
        createdAt: "2021-05-19T03:54:20.000Z",
        category: {
            id: 4,
            name: "HAMBURGUESAS",
            createdAt: "2021-05-19T03:54:18.000Z",
            updatedAt: "2021-05-19T03:54:18.000Z",
        },
    },
    {
        id: 3,
        name: "COCA COLA 3LTS",
        price: 180,
        stock: 63,
        createdAt: "2021-05-19T03:54:20.000Z",
        category: {
            id: 2,
            name: "GASEOSAS",
            createdAt: "2021-05-19T03:54:18.000Z",
            updatedAt: "2021-05-19T03:54:18.000Z",
        },
    },
    {
        id: 4,
        name: "COCA COLA 1.5LTS",
        price: 180,
        stock: 67,
        createdAt: "2021-05-19T03:54:20.000Z",
        category: {
            id: 2,
            name: "GASEOSAS",
            createdAt: "2021-05-19T03:54:18.000Z",
            updatedAt: "2021-05-19T03:54:18.000Z",
        },
    },
];

/* TESTS */
it("handles actions of type PRODUCT_LIST_REQUEST", () => {
    const action = {
        type: PRODUCT_LIST_REQUEST,
    };

    const newState = productListReducer({}, action);

    expect(newState).toEqual({ loading: true, products: [] });
});

it("handles actions of type PRODUCT_LIST_SUCCESS", () => {
    const action = {
        type: PRODUCT_LIST_SUCCESS,
        payload: {
            products: products,
            page: 1,
            pages: 1,
        },
    };

    const newState = productListReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        products: products,
        page: 1,
        pages: 1,
    });
});

it("handles actions of type PRODUCT_LIST_FAIL", () => {
    const action = {
        type: PRODUCT_LIST_FAIL,
        payload: "Request failed with status code 500",
    };

    const newState = productListReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        error: "Request failed with status code 500",
    });
});

it("handles actions of type PRODUCT_LIST_RESET", () => {
    const action = {
        type: PRODUCT_LIST_RESET,
    };

    const newState = productListReducer({}, action);

    expect(newState).toEqual({ products: [] });
});

it("handles action of unknown type", () => {
    const action = {
        type: "UNKNOWN",
    };

    const newState = productListReducer({}, action);

    expect(newState).toEqual({});
});
