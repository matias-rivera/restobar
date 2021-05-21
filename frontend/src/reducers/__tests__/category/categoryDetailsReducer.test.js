import { categoryDetailsReducer } from "../../categoryReducers";
import {
    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_RESET,
    CATEGORY_DETAILS_FAIL,
} from "../../../constants/categoryConstants";

/* DATA */
const category = {
    id: 2,
    name: "GASEOSAS",
    createdAt: "2021-05-19T03:54:18.000Z",
    updatedAt: "2021-05-19T03:54:18.000Z",
};

/* TESTS */
it("handles actions of type CATEGORY_DETAILS_REQUEST", () => {
    const action = {
        type: CATEGORY_DETAILS_REQUEST,
    };

    const newState = categoryDetailsReducer({}, action);

    expect(newState).toEqual({ loading: true });
});

it("handles actions of type CATEGORY_DETAILS_SUCCESS", () => {
    const action = {
        type: CATEGORY_DETAILS_SUCCESS,
        payload: category,
    };

    const newState = categoryDetailsReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        category: category,
    });
});

it("handles actions of type CATEGORY_DETAILS_FAIL", () => {
    const action = {
        type: CATEGORY_DETAILS_FAIL,
        payload: "Request failed with status code 500",
    };

    const newState = categoryDetailsReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        error: "Request failed with status code 500",
    });
});

it("handles actions of type CATEGORY_DETAILS_RESET", () => {
    const action = {
        type: CATEGORY_DETAILS_RESET,
    };

    const newState = categoryDetailsReducer({}, action);

    expect(newState).toEqual({ category: {} });
});

it("handles action with unknown type", () => {
    const action = { type: "UNKNOWN" };
    const newState = categoryDetailsReducer({}, action);
    expect(newState).toEqual({});
});
