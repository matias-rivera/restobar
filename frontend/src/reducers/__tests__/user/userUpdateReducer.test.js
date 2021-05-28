import {
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,
} from "../../../constants/userConstants";

import { userUpdateReducer } from "../../userReducers";

/* DATA */
const user = {
    _id: 1,
    name: "Admin",
    email: "admin@example.com",
    isAdmin: true,
    image: "/avatar.png",
};

/* TESTS */
it("handles actions of type USER_UPDATE_REQUEST", () => {
    const action = {
        type: USER_UPDATE_REQUEST,
    };

    const newState = userUpdateReducer({}, action);

    expect(newState).toEqual({ loading: true });
});

it("handles actions of type USER_UPDATE_SUCCESS", () => {
    const action = {
        type: USER_UPDATE_SUCCESS,
        payload: user,
    };

    const newState = userUpdateReducer({}, action);

    expect(newState).toEqual({ loading: false, success: true, user: user });
});

it("handles actions of type USER_UPDATE_FAIL", () => {
    const action = {
        type: USER_UPDATE_FAIL,
        payload: "Request failed with status code 500",
    };

    const newState = userUpdateReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        error: "Request failed with status code 500",
    });
});

it("handles actions of type USER_UPDATE_RESET", () => {
    const action = {
        type: USER_UPDATE_RESET,
    };

    const newState = userUpdateReducer({}, action);

    expect(newState).toEqual({ user: {} });
});

it("handles action with unknown type", () => {
    const action = {
        type: "UNKNOWN",
    };

    const newState = userUpdateReducer({}, action);

    expect(newState).toEqual({});
});
