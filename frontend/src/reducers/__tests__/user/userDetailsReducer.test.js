import {
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
} from "../../../constants/userConstants";

import { userDetailsReducer } from "../../userReducers";

/* DATA */
const user = {
    _id: 1,
    name: "Admin",
    email: "admin@example.com",
    isAdmin: true,
    image: "/avatar.png",
};

/* TESTS */
it("handles actions of type USER_DETAILS_REQUEST", () => {
    const action = {
        type: USER_DETAILS_REQUEST,
    };

    const newState = userDetailsReducer({}, action);

    expect(newState).toEqual({ loading: true });
});

it("handles actions of type USER_DETAILS_SUCCESS", () => {
    const action = {
        type: USER_DETAILS_SUCCESS,
        payload: user,
    };

    const newState = userDetailsReducer({}, action);

    expect(newState).toEqual({ loading: false, user: user });
});

it("handles actions of type USER_DETAILS_FAIL", () => {
    const action = {
        type: USER_DETAILS_FAIL,
        payload: "Request failed with status code 500",
    };

    const newState = userDetailsReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        error: "Request failed with status code 500",
    });
});

it("handles actions of type USER_DETAILS_RESET", () => {
    const action = {
        type: USER_DETAILS_RESET,
    };

    const newState = userDetailsReducer({}, action);

    expect(newState).toEqual({ user: {} });
});

it("handles action with unknown type", () => {
    const action = {
        type: "UNKNOWN",
    };

    const newState = userDetailsReducer({}, action);

    expect(newState).toEqual({});
});
