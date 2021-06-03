import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_RESET,
} from "../../../constants/orderConstants";
import { orderCreateReducer } from "../../orderReducers";

it("handles actions of type ORDER_CREATE_REQUEST", () => {
    const action = {
        type: ORDER_CREATE_REQUEST,
    };

    const newState = orderCreateReducer({}, action);

    expect(newState).toEqual({ loading: true });
});

it("handles actions of type ORDER_CREATE_SUCCESS", () => {
    const action = {
        type: ORDER_CREATE_SUCCESS,
    };

    const newState = orderCreateReducer({}, action);

    expect(newState).toEqual({ loading: false, success: true });
});

it("handles actions of type ORDER_CREATE_FAIL", () => {
    const action = {
        type: ORDER_CREATE_FAIL,
        payload: "Request failed with status code 500",
    };

    const newState = orderCreateReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        error: "Request failed with status code 500",
    });
});

it("handles actions of type ORDER_CREATE_RESET", () => {
    const action = {
        type: ORDER_CREATE_RESET,
    };

    const newState = orderCreateReducer({}, action);

    expect(newState).toEqual({});
});

it("handles action with unknown type", () => {
    const action = {
        type: "UNKNOWN",
    };

    const newState = orderCreateReducer({}, action);

    expect(newState).toEqual({});
});
