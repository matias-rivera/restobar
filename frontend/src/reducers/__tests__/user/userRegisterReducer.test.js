import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
} from "../../../constants/userConstants";

import { userRegisterReducer } from "../../userReducers";

it("handles actions of type USER_REGISTER_REQUEST", () => {
    const action = {
        type: USER_REGISTER_REQUEST,
    };

    const newState = userRegisterReducer({}, action);

    expect(newState).toEqual({ loading: true });
});

it("handles actions of type USER_REGISTER_SUCCESS", () => {
    const action = {
        type: USER_REGISTER_SUCCESS,
    };

    const newState = userRegisterReducer({}, action);

    expect(newState).toEqual({ loading: false, success: true });
});

it("handles actions of type USER_REGISTER_FAIL", () => {
    const action = {
        type: USER_REGISTER_FAIL,
        payload: "Request failed with status code 500",
    };

    const newState = userRegisterReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        error: "Request failed with status code 500",
    });
});

it("handles action of unknown type", () => {
    const action = {
        type: "UNKNOWN",
    };

    const newState = userRegisterReducer({}, action);

    expect(newState).toEqual({});
});
