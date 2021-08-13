import moxios from "moxios";
import { allCategories } from "../../categoryActions";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
    CATEGORY_ALL_FAIL,
    CATEGORY_ALL_REQUEST,
    CATEGORY_ALL_SUCCESS,
} from "../../../constants/categoryConstants";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/* DATA */
const data = [
    {
        id: 1,
        name: "CERVEZAS",
        createdAt: "2021-04-12T02:23:58.000Z",
        updatedAt: "2021-05-09T06:08:23.000Z",
    },
    {
        id: 2,
        name: "GASEOSAS",
        createdAt: "2021-04-12T02:23:58.000Z",
        updatedAt: "2021-04-12T02:23:58.000Z",
    },
];

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
    categoryAll: {
        loading: true,
        categories: [],
    },
    userLogin: { userInfo: { token: "token" } },
};

beforeEach(() => {
    moxios.install();
});

afterEach(() => {
    moxios.uninstall();
});

describe("it fires an allCategories action", () => {
    let store;
    // set up a fake store
    beforeEach(() => {
        store = mockStore(state);
    });

    it("fires a categories request action", async () => {
        moxios.stubRequest("/api/categories/all", successResponse);

        await store.dispatch(allCategories());

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_ALL_REQUEST,
        });

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_ALL_SUCCESS,
            payload: data,
        });
    });

    it("fires a categories request action and expect an error", async () => {
        moxios.stubRequest("/api/categories/all", errorResponse);

        await store.dispatch(allCategories());

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_ALL_REQUEST,
        });

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_ALL_FAIL,
            payload: errorResponse.response.message,
        });
    });
});
