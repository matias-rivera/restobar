import { categoryUpdateReducer } from "../../categoryReducers";
import {
    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_RESET,
    CATEGORY_UPDATE_FAIL,
} from "../../../constants/categoryConstants";

/* DATA */
const category = {
    id: 2,
    name: "GASEOSAS",
    createdAt: "2021-05-19T03:54:18.000Z",
    updatedAt: "2021-05-19T03:54:18.000Z",
};

/* TESTS */
it("handles actions of type CATEGORY_UPDATE_REQUEST", () => {
    const action = {
        type: CATEGORY_UPDATE_REQUEST,
    };

    const newState = categoryUpdateReducer({}, action);

    expect(newState).toEqual({ loading: true });
});

it("handles actions of type CATEGORY_UPDATE_SUCCESS", () => {
    const action = {
        type: CATEGORY_UPDATE_SUCCESS,
        payload: category,
    };

    const newState = categoryUpdateReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        success: true,
        category: category,
    });
});

it("handles actions of type CATEGORY_UPDATE_FAIL", () => {
    const action = {
        type: CATEGORY_UPDATE_FAIL,
        payload: "Request failed with status code 500",
    };

    const newState = categoryUpdateReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        error: "Request failed with status code 500",
    });
});

it("handles actions of type CATEGORY_UPDATE_RESET", () => {
    const action = {
        type: CATEGORY_UPDATE_RESET,
    };

    const newState = categoryUpdateReducer({}, action);

    expect(newState).toEqual({ category: {} });
});

it("handles action with unknown type", () => {
    const action = { type: "UNKNOWN" };
    const newState = categoryUpdateReducer({}, action);
    expect(newState).toEqual({});
});
