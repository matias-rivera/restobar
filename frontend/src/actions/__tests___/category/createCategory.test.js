import moxios from "moxios";
import { createCategory } from "../../categoryActions";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
    CATEGORY_CREATE_FAIL,
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
} from "../../../constants/categoryConstants";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/* INPUT */
const category = { name: "categoryTest" };

/* DATA */

const data = {
    id: 12,
    name: category.name,
    updatedAt: "2021-08-13T18:46:42.294Z",
    createdAt: "2021-08-13T18:46:42.294Z",
};
/* RESPONSES */
const errorResponse = {
    status: 500,
    response: { message: "Request failed with status code 500" },
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

describe("it fires a createCategory action", () => {
    let store;

    // set up a fake store
    beforeEach(() => {
        store = mockStore(state);
    });

    it("fires a request to create a category", async () => {
        moxios.stubRequest("/api/categories", successResponse);

        await store.dispatch(createCategory(category));

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_CREATE_REQUEST,
        });

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_CREATE_SUCCESS,
            payload: data,
        });
    });

    it("fires a request to create a category and expect an error", async () => {
        moxios.stubRequest("/api/categories", errorResponse);

        await store.dispatch(createCategory(category));

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_CREATE_REQUEST,
        });

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_CREATE_FAIL,
            payload: errorResponse.response.message,
        });
    });
});
