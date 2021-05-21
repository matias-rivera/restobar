import { categoryAllReducer } from "../../categoryReducers";
import {
    CATEGORY_ALL_REQUEST,
    CATEGORY_ALL_SUCCESS,
    CATEGORY_ALL_RESET,
    CATEGORY_ALL_FAIL,
} from "../../../constants/categoryConstants";

/* DATA */
const categories = [
    {
        id: 1,
        name: "CERVEZAS",
        createdAt: "2021-05-19T03:54:18.000Z",
        updatedAt: "2021-05-19T03:54:18.000Z",
    },
    {
        id: 2,
        name: "GASEOSAS",
        createdAt: "2021-05-19T03:54:18.000Z",
        updatedAt: "2021-05-19T03:54:18.000Z",
    },
    {
        id: 3,
        name: "PIZZAS",
        createdAt: "2021-05-19T03:54:18.000Z",
        updatedAt: "2021-05-19T03:54:18.000Z",
    },
    {
        id: 4,
        name: "HAMBURGUESAS",
        createdAt: "2021-05-19T03:54:18.000Z",
        updatedAt: "2021-05-19T03:54:18.000Z",
    },
    {
        id: 5,
        name: "EMPANADAS",
        createdAt: "2021-05-19T03:54:18.000Z",
        updatedAt: "2021-05-19T03:54:18.000Z",
    },
    {
        id: 6,
        name: "LOMITOS",
        createdAt: "2021-05-19T03:54:18.000Z",
        updatedAt: "2021-05-19T03:54:18.000Z",
    },
    {
        id: 7,
        name: "LECHES",
        createdAt: "2021-05-19T05:14:25.000Z",
        updatedAt: "2021-05-19T05:15:16.000Z",
    },
];

/* TESTS */
it("handles actions of type CATEGORY_ALL_REQUEST", () => {
    const action = {
        type: CATEGORY_ALL_REQUEST,
    };

    const newState = categoryAllReducer({}, action);

    expect(newState).toEqual({ loading: true, categories: [] });
});

it("handles actions of type CATEGORY_ALL_SUCCESS", () => {
    const action = {
        type: CATEGORY_ALL_SUCCESS,
        payload: categories,
    };

    const newState = categoryAllReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        categories: categories,
    });
});

it("handles actions of type CATEGORY_ALL_FAIL", () => {
    const action = {
        type: CATEGORY_ALL_FAIL,
        payload: "Request failed with status code 500",
    };

    const newState = categoryAllReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        error: "Request failed with status code 500",
    });
});

it("handles actions of type CATEGORY_ALL_RESET", () => {
    const action = {
        type: CATEGORY_ALL_RESET,
    };

    const newState = categoryAllReducer({}, action);

    expect(newState).toEqual({
        categories: [],
    });
});

it("handles action with unknown type", () => {
    const action = { type: "UNKNOWN" };
    const newState = categoryAllReducer({}, action);
    expect(newState).toEqual({});
});
