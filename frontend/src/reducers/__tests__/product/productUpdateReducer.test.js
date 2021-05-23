import {
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
} from "../../../constants/productConstants";

import { productUpdateReducer } from "../../productReducers";

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
it("handles actions of type PRODUCT_UPDATE_REQUEST", () => {
    const action = {
        type: PRODUCT_UPDATE_REQUEST,
    };

    const newState = productUpdateReducer({}, action);

    expect(newState).toEqual({ loading: true });
});

it("handles actions of type PRODUCT_UPDATE_SUCCESS", () => {
    const action = {
        type: PRODUCT_UPDATE_SUCCESS,
        payload: product,
    };

    const newState = productUpdateReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        success: true,
        product: product,
    });
});

it("handles actions of type PRODUCT_UPDATE_FAIL", () => {
    const action = {
        type: PRODUCT_UPDATE_FAIL,
        payload: "Request failed with status code 500",
    };

    const newState = productUpdateReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        error: "Request failed with status code 500",
    });
});

it("handles actions of type PRODUCT_LIST_RESET", () => {
    const action = {
        type: PRODUCT_UPDATE_RESET,
    };

    const newState = productUpdateReducer({}, action);

    expect(newState).toEqual({ product: {} });
});

it("handles action of unknown type", () => {
    const action = {
        type: "UNKNOWN",
    };

    const newState = productUpdateReducer({}, action);

    expect(newState).toEqual({});
});
