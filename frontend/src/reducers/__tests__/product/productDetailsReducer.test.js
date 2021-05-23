import {
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_RESET,
} from "../../../constants/productConstants";

import { productDetailsReducer } from "../../productReducers";

/* DATA */
const product = {
    id: 1,
    name: "HAMBRUGUESA CHICA",
    price: 120,
    stock: 50,
    categoryId: 4,
    createdAt: "2021-05-19T03:54:20.000Z",
    updatedAt: "2021-05-19T03:54:20.000Z",
    category: {
        id: 4,
        name: "HAMBURGUESAS",
        createdAt: "2021-05-19T03:54:18.000Z",
        updatedAt: "2021-05-19T03:54:18.000Z",
    },
};

/* TESTS */
it("handles actions of type PRODUCT_DETAILS_REQUEST", () => {
    const action = {
        type: PRODUCT_DETAILS_REQUEST,
    };

    const newState = productDetailsReducer({}, action);

    expect(newState).toEqual({ loading: true });
});

it("handles actions of type PRODUCT_DETAILS_SUCCESS", () => {
    const action = {
        type: PRODUCT_DETAILS_SUCCESS,
        payload: product,
    };

    const newState = productDetailsReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        product: product,
    });
});

it("handles actions of type PRODUCT_DETAILS_FAIL", () => {
    const action = {
        type: PRODUCT_DETAILS_FAIL,
        payload: "Request failed with status code 500",
    };

    const newState = productDetailsReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        error: "Request failed with status code 500",
    });
});

it("handles actions of type PRODUCT_DETAILS_RESET", () => {
    const action = {
        type: PRODUCT_DETAILS_RESET,
    };

    const newState = productDetailsReducer({}, action);

    expect(newState).toEqual({ product: {} });
});

it("handles action of unknown type", () => {
    const action = {
        type: "UNKNOWN",
    };

    const newState = productDetailsReducer({}, action);

    expect(newState).toEqual({});
});
