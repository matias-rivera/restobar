import { categoryCreateReducer } from "../../categoryReducers";
import {
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,
} from "../../../constants/categoryConstants";

/* TESTS */
it("handles actions of type CATEGORY_CREATE_REQUEST", () => {
    const action = {
        type: CATEGORY_CREATE_REQUEST,
    };

    const newState = categoryCreateReducer({}, action);

    expect(newState).toEqual({ loading: true });
});

it("handles actions of type CATEGORY_CREATE_SUCCESS", () => {
    const action = {
        type: CATEGORY_CREATE_SUCCESS,
    };

    const newState = categoryCreateReducer({}, action);

    expect(newState).toEqual({ loading: false, success: true });
});

it("handles actions of type CATEGORY_CREATE_FAIL", () => {
    const action = {
        type: CATEGORY_CREATE_FAIL,
        payload: "Name must be a string",
    };

    const newState = categoryCreateReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        error: "Name must be a string",
    });
});

it("handles action with unknown type", () => {
    const action = { type: "UNKNOWN" };
    const newState = categoryCreateReducer({}, action);
    expect(newState).toEqual({});
});
