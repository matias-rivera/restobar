import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
} from "../../../constants/userConstants";

import { userLoginReducer } from "../../userReducers";

/* DATA */
const user = {
    _id: 1,
    name: "Admin",
    email: "admin@example.com",
    isAdmin: true,
    image: "/avatar.png",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIyMTYyNTg4LCJleHAiOjE2MjQ3NTQ1ODh9.ds1npOf8sljMxYGk3FlnjRLRcFEc9unrAY4Sqb4baoE",
};

/* TESTS */
it("handles actions of type USER_LOGIN_REQUEST", () => {
    const action = {
        type: USER_LOGIN_REQUEST,
    };

    const newState = userLoginReducer({}, action);

    expect(newState).toEqual({ loading: true });
});

it("handles actions of type USER_LOGIN_SUCCESS", () => {
    const action = {
        type: USER_LOGIN_SUCCESS,
        payload: user,
    };

    const newState = userLoginReducer({}, action);

    expect(newState).toEqual({ loading: false, userInfo: user });
});

it("handles actions of type USER_LOGIN_FAIL", () => {
    const action = {
        type: USER_LOGIN_FAIL,
        payload: "Request failed with status code 500",
    };

    const newState = userLoginReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        error: "Request failed with status code 500",
    });
});

it("handles actions of type USER_LOGOUT", () => {
    const action = {
        type: USER_LOGOUT,
    };

    const newState = userLoginReducer({}, action);

    expect(newState).toEqual({});
});

it("handles action with unknown type", () => {
    const action = {
        type: "UNKNOWN",
    };

    const newState = userLoginReducer({}, action);

    expect(newState).toEqual({});
});
