import moxios from "moxios";
import { deleteCategory } from "../../categoryActions";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
    CATEGORY_DELETE_FAIL,
    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_SUCCESS,
} from "../../../constants/categoryConstants";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/* INPUT */
const categoryId = 12;

/* RESPONSES */
const errorResponse = {
    status: 500,
    response: { message: "Request failed with status code 500" },
};

const notFoundResponse = {
    status: 404,
    response: { message: "Category not found" },
};

const successResponse = {
    status: 200,
    response: { message: "Category removed" },
};

/* INITIAL STATE */
const state = {
    categoryCreate: {},
    userLogin: { userInfo: { token: "token" } },
};

beforeEach(() => {
    moxios.install();
});

afterEach(() => {
    moxios.uninstall();
});

describe("it fires a deleteCategory action", () => {
    let store;

    // set up a fake store
    beforeEach(() => {
        store = mockStore(state);
    });

    it("fires a request to delete a category", async () => {
        moxios.stubRequest(`/api/categories/${categoryId}`, successResponse);

        await store.dispatch(deleteCategory(categoryId));

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_DELETE_REQUEST,
        });

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_DELETE_SUCCESS,
        });
    });

    it("fires a request to delete a category and expect an error", async () => {
        moxios.stubRequest(`/api/categories/${categoryId}`, errorResponse);

        await store.dispatch(deleteCategory(categoryId));

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_DELETE_REQUEST,
        });

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_DELETE_FAIL,
            payload: errorResponse.response.message,
        });
    });

    it("fires a request to delete a category and expect a not found error", async () => {
        moxios.stubRequest(`/api/categories/${categoryId}`, notFoundResponse);

        await store.dispatch(deleteCategory(categoryId));

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_DELETE_REQUEST,
        });

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_DELETE_FAIL,
            payload: notFoundResponse.response.message,
        });
    });
});
