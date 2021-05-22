import { clientCreateReducer } from "../../clientReducers";

import {
    CLIENT_CREATE_REQUEST,
    CLIENT_CREATE_SUCCESS,
    CLIENT_CREATE_FAIL,
} from "../../../constants/clientConstants";

it("handles actions of type CLIENT_CREATE_REQUEST", () => {
    const action = {
        type: CLIENT_CREATE_REQUEST,
    };

    const newState = clientCreateReducer({}, action);

    expect(newState).toEqual({ loading: true });
});

it("handles actions of type CLIENT_CREATE_SUCCESS", () => {
    const action = {
        type: CLIENT_CREATE_SUCCESS,
    };

    const newState = clientCreateReducer({}, action);

    expect(newState).toEqual({ loading: false, success: true });
});

it("handles actions of type CLIENT_CREATE_FAIL", () => {
    const action = {
        type: CLIENT_CREATE_FAIL,
        payload: "Request failed with status code 500",
    };

    const newState = clientCreateReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        error: "Request failed with status code 500",
    });
});

it("handles action with unknown type", () => {
    const action = { type: "UNKNOWN" };
    const newState = clientCreateReducer({}, action);
    expect(newState).toEqual({});
});
