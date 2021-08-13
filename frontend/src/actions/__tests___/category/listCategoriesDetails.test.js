import moxios from "moxios";
import { listCategoryDetails } from "../../categoryActions";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
    CATEGORY_DETAILS_FAIL,
    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
} from "../../../constants/categoryConstants";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/* INPUT */
const categoryId = 12;

/* DATA */

const data = {
    id: categoryId,
    name: "categoryTest",
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

describe("it fires a listCategoriesDetails action", () => {
    let store;

    // set up a fake store
    beforeEach(() => {
        store = mockStore(state);
    });

    it("fires a request to fetch a category", async () => {
        moxios.stubRequest(`/api/categories/${categoryId}`, successResponse);

        await store.dispatch(listCategoryDetails(categoryId));

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_DETAILS_REQUEST,
        });

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_DETAILS_SUCCESS,
            payload: data,
        });
    });

    it("fires a request to fetch a category and expect an error", async () => {
        moxios.stubRequest(`/api/categories/${categoryId}`, errorResponse);

        await store.dispatch(listCategoryDetails(categoryId));

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_DETAILS_REQUEST,
        });

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_DETAILS_FAIL,
            payload: errorResponse.response.message,
        });
    });

    it("fires a request to fetch a category and expect a not found error", async () => {
        moxios.stubRequest(`/api/categories/${categoryId}`, notFoundResponse);

        await store.dispatch(listCategoryDetails(categoryId));

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_DETAILS_REQUEST,
        });

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_DETAILS_FAIL,
            payload: notFoundResponse.response.message,
        });
    });
});
