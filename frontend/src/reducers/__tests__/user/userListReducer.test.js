import {
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
} from "../../../constants/userConstants";

import { userListReducer } from "../../userReducers";

/* DATA */
const users = [
    {
        id: 1,
        name: "Admin",
        email: "admin@example.com",
        image: "/avatar.png",
        isAdmin: true,
        createdAt: "2021-05-19T03:54:18.000Z",
    },
    {
        id: 2,
        name: "User",
        email: "user@example.com",
        image: "/avatar.png",
        isAdmin: false,
        createdAt: "2021-05-19T03:54:18.000Z",
    },
    {
        id: 3,
        name: "asdsaaa",
        email: "aa@adsa.com",
        image: "/avatar.png",
        isAdmin: false,
        createdAt: "2021-05-28T01:11:46.000Z",
    },
];

/* TESTS */
it("handles actions of type USER_LIST_REQUEST", () => {
    const action = {
        type: USER_LIST_REQUEST,
    };

    const newState = userListReducer({}, action);

    expect(newState).toEqual({ loading: true, users: [] });
});

it("handles actions of type USER_LIST_SUCCESS", () => {
    const action = {
        type: USER_LIST_SUCCESS,
        payload: {
            users: users,
            pages: 1,
            page: 1,
        },
    };

    const newState = userListReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        users: users,
        pages: 1,
        page: 1,
    });
});

it("handles actions of type USER_LIST_FAIL", () => {
    const action = {
        type: USER_LIST_FAIL,
        payload: "Request failed with status code 500",
    };

    const newState = userListReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        error: "Request failed with status code 500",
    });
});

it("handles actions of type USER_LIST_RESET", () => {
    const action = {
        type: USER_LIST_RESET,
    };

    const newState = userListReducer({}, action);

    expect(newState).toEqual({ users: [] });
});

it("handles action with unknown type", () => {
    const action = {
        type: "UNKNOWN",
    };

    const newState = userListReducer({}, action);

    expect(newState).toEqual({});
});
