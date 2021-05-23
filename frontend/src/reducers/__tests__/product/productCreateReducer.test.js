import {
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
} from "../../../constants/productConstants";

import { productCreateReducer } from "../../productReducers";

it("handles actions of type PRODUCT_CREATE_REQUEST", () => {
    const action = {
        type: PRODUCT_CREATE_REQUEST,
    };

    const newState = productCreateReducer({}, action);

    expect(newState).toEqual({ loading: true });
});

it("handles actions of type PRODUCT_CREATE_SUCCESS", () => {
    const action = {
        type: PRODUCT_CREATE_SUCCESS,
    };

    const newState = productCreateReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        success: true,
    });
});

it("handles actions of type PRODUCT_CREATE_FAIL", () => {
    const action = {
        type: PRODUCT_CREATE_FAIL,
        payload: "Request failed with status code 500",
    };

    const newState = productCreateReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        error: "Request failed with status code 500",
    });
});

it("handles action of unknown type", () => {
    const action = {
        type: "UNKNOWN",
    };

    const newState = productCreateReducer({}, action);

    expect(newState).toEqual({});
});
