import { categoryListReducer } from "../../categoryReducers";
import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_RESET,
    CATEGORY_LIST_FAIL,
} from "../../../constants/categoryConstants";

/* DATA */
const categories = [
    {
        id: 1,
        name: "CERVEZAS",
        createdAt: "2021-05-19T03:54:18.000Z",
    },
    {
        id: 2,
        name: "GASEOSAS",
        createdAt: "2021-05-19T03:54:18.000Z",
    },
    {
        id: 3,
        name: "PIZZAS",
        createdAt: "2021-05-19T03:54:18.000Z",
    },
    {
        id: 4,
        name: "HAMBURGUESAS",
        createdAt: "2021-05-19T03:54:18.000Z",
    },
    {
        id: 5,
        name: "EMPANADAS",
        createdAt: "2021-05-19T03:54:18.000Z",
    },
];

/* TESTS */
it("handles actions of type CATEGORY_LIST_REQUEST", () => {
    const action = {
        type: CATEGORY_LIST_REQUEST,
    };

    const newState = categoryListReducer({}, action);

    expect(newState).toEqual({ loading: true, categories: [] });
});

it("handles actions of type CATEGORY_LIST_SUCCESS", () => {
    const action = {
        type: CATEGORY_LIST_SUCCESS,
        payload: {
            categories: categories,
            page: 1,
            pages: 2,
        },
    };

    const newState = categoryListReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        categories: categories,
        page: 1,
        pages: 2,
    });
});

it("handles actions of type CATEGORY_LIST_FAIL", () => {
    const action = {
        type: CATEGORY_LIST_FAIL,
        payload: "Request failed with status code 500",
    };

    const newState = categoryListReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        error: "Request failed with status code 500",
    });
});

it("handles actions of type CATEGORY_LIST_RESET", () => {
    const action = {
        type: CATEGORY_LIST_RESET,
    };

    const newState = categoryListReducer({}, action);

    expect(newState).toEqual({ categories: [] });
});

it("handles action with unknown type", () => {
    const action = { type: "UNKNOWN" };
    const newState = categoryListReducer({}, action);
    expect(newState).toEqual({});
});
