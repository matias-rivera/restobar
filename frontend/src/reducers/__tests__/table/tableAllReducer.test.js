import {
    TABLE_ALL_REQUEST,
    TABLE_ALL_SUCCESS,
    TABLE_ALL_FAIL,
    TABLE_ALL_RESET,
} from "../../../constants/tableConstants";
import { tableAllReducer } from "../../tableReducers";

/* DATA */
const tables = [
    {
        id: 1,
        name: "PATIO 1",
        occupied: false,
        createdAt: "2021-05-19T03:54:18.000Z",
        updatedAt: "2021-05-19T05:28:26.000Z",
        orders: [
            {
                id: 4,
                total: 180,
                isPaid: true,
                delivery: false,
                note: "",
                userId: 1,
                clientId: 1,
                tableId: 1,
                createdAt: "2021-05-19T05:23:49.000Z",
                updatedAt: "2021-05-19T05:28:26.000Z",
            },
        ],
    },
    {
        id: 2,
        name: "PATIO 2",
        occupied: true,
        createdAt: "2021-05-19T03:54:18.000Z",
        updatedAt: "2021-05-19T05:39:25.000Z",
        orders: [
            {
                id: 6,
                total: 360,
                isPaid: false,
                delivery: false,
                note: "",
                userId: 1,
                clientId: 2,
                tableId: 2,
                createdAt: "2021-05-19T05:39:24.000Z",
                updatedAt: "2021-05-19T05:39:24.000Z",
            },
        ],
    },
    {
        id: 3,
        name: "PATIO 3",
        occupied: false,
        createdAt: "2021-05-19T03:54:18.000Z",
        updatedAt: "2021-05-19T03:54:18.000Z",
        orders: [],
    },
    {
        id: 4,
        name: "INTERIOR 1",
        occupied: false,
        createdAt: "2021-05-19T03:54:18.000Z",
        updatedAt: "2021-05-19T03:54:18.000Z",
        orders: [],
    },
];

/* TESTS */
it("handles actions of type TABLE_ALL_REQUEST", () => {
    const action = {
        type: TABLE_ALL_REQUEST,
    };

    const newState = tableAllReducer({}, action);

    expect(newState).toEqual({ loading: true, tables: [] });
});

it("handles actions of type TABLE_ALL_SUCCESS", () => {
    const action = {
        type: TABLE_ALL_SUCCESS,
        payload: tables,
    };

    const newState = tableAllReducer({}, action);

    expect(newState).toEqual({ tables: tables, loading: false });
});

it("handles actions of type TABLE_ALL_FAIL", () => {
    const action = {
        type: TABLE_ALL_FAIL,
        payload: "Request failed with status code 500",
    };

    const newState = tableAllReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        error: "Request failed with status code 500",
    });
});

it("handles actions of type TABLE_ALL_RESET", () => {
    const action = {
        type: TABLE_ALL_RESET,
    };

    const newState = tableAllReducer({}, action);

    expect(newState).toEqual({ tables: [] });
});

it("handles action with unkown type", () => {
    const action = {
        type: "UNKNOWN",
    };

    const newState = tableAllReducer({}, action);

    expect(newState).toEqual({});
});
