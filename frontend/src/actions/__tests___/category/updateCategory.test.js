import moxios from "moxios";
import { updateCategory } from "../../categoryActions";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
    CATEGORY_UPDATE_FAIL,
    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
} from "../../../constants/categoryConstants";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/* INPUT */
const category = {
    id: 12,
    name: "modified category",
};

/* DATA */
const data = {
    ...category,
    updatedAt: "2021-08-13T18:46:42.294Z",
    createdAt: "2021-08-13T18:46:42.294Z",
};

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
    response: data,
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

describe("it fires a updateCategory action", () => {
    let store;

    // set up a fake store
    beforeEach(() => {
        store = mockStore(state);
    });

    it("fires a request to update a category", async () => {
        moxios.stubRequest(`/api/categories/${category.id}`, successResponse);

        await store.dispatch(updateCategory(category));

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_UPDATE_REQUEST,
        });

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_UPDATE_SUCCESS,
            payload: data,
        });
    });

    it("fires a request to update a category and expect an error", async () => {
        moxios.stubRequest(`/api/categories/${category.id}`, errorResponse);

        await store.dispatch(updateCategory(category));

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_UPDATE_REQUEST,
        });

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_UPDATE_FAIL,
            payload: errorResponse.response.message,
        });
    });

    it("fires a request to update a category and expect a not found error", async () => {
        moxios.stubRequest(`/api/categories/${category.id}`, notFoundResponse);

        await store.dispatch(updateCategory(category));

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_UPDATE_REQUEST,
        });

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_UPDATE_FAIL,
            payload: notFoundResponse.response.message,
        });
    });
});
