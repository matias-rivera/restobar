import moxios from "moxios";
import { listCategories } from "../../categoryActions";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
    CATEGORY_LIST_FAIL,
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
} from "../../../constants/categoryConstants";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/* DATA */
const dataWithoutParameters = {
    categories: [
        {
            id: 1,
            name: "CERVEZAS",
            createdAt: "2021-04-12T02:23:58.000Z",
        },
        {
            id: 2,
            name: "GASEOSAS",
            createdAt: "2021-04-12T02:23:58.000Z",
        },
        {
            id: 3,
            name: "PIZZAS",
            createdAt: "2021-04-12T02:23:58.000Z",
        },
        {
            id: 4,
            name: "HAMBURGUESAS",
            createdAt: "2021-04-12T02:23:58.000Z",
        },
        {
            id: 5,
            name: "EMPANADAS",
            createdAt: "2021-04-12T02:23:58.000Z",
        },
    ],
    page: 1,
    pages: 3,
};

const dataWithParameters = {
    categories: [
        {
            id: 1,
            name: "CERVEZAS",
            createdAt: "2021-04-12T02:23:58.000Z",
        },
    ],
    page: 1,
    pages: 1,
};

/* RESPONSES */

const errorResponse = {
    status: 500,
    response: { message: "Request failed with status code 500" },
};

const successResponseWithoutParameters = {
    status: 200,
    response: dataWithoutParameters,
};

const successResponseWithParameters = {
    status: 200,
    response: dataWithParameters,
};

/* INITIAL STATE */

const state = {
    categoryList: {
        loading: true,
        categories: [],
    },
    userLogin: { userInfo: { token: "token" } },
};

/* MOXIOS */

beforeEach(() => {
    moxios.install();
});

afterEach(() => {
    moxios.uninstall();
});

/* TESTS */

describe("it fires a listCategories action", () => {
    let store;
    // set up a fake store
    beforeEach(() => {
        store = mockStore(state);
    });

    it("fires a categories request action with no parameters", async () => {
        moxios.stubRequest(
            "/api/categories?keyword=&pageNumber=",
            successResponseWithoutParameters
        );

        await store.dispatch(listCategories());

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_LIST_REQUEST,
        });

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_LIST_SUCCESS,
            payload: dataWithoutParameters,
        });
    });

    it("fires a categories request action with parameters", async () => {
        const keyword = "CERVEZAS";
        const pageNumber = 1;

        moxios.stubRequest(
            `/api/categories?keyword=${keyword}&pageNumber=${pageNumber}`,
            successResponseWithParameters
        );

        await store.dispatch(listCategories(keyword, pageNumber));

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_LIST_REQUEST,
        });

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_LIST_SUCCESS,
            payload: dataWithParameters,
        });
    });

    it("fires a categories request action and expect an error", async () => {
        moxios.stubRequest(
            "/api/categories?keyword=&pageNumber=",
            errorResponse
        );

        await store.dispatch(listCategories());

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_LIST_REQUEST,
        });

        expect(store.getActions()).toContainEqual({
            type: CATEGORY_LIST_FAIL,
            payload: errorResponse.response.message,
        });
    });
});
