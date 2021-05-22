import {
    TABLE_DETAILS_REQUEST,
    TABLE_DETAILS_SUCCESS,
    TABLE_DETAILS_FAIL,
    TABLE_DETAILS_RESET,
} from "../../../constants/tableConstants";
import { tableDetailsReducer } from "../../tableReducers";

/* DATA */
const table = {
    id: 1,
    name: "PATIO 1",
    occupied: false,
    createdAt: "2021-05-19T03:54:18.000Z",
    updatedAt: "2021-05-19T05:28:26.000Z",
};

/* TESTS */
it("handles actions of type TABLE_DETAILS_REQUEST", () => {
    const action = {
        type: TABLE_DETAILS_REQUEST,
    };

    const newState = tableDetailsReducer({}, action);

    expect(newState).toEqual({ loading: true });
});

it("handles actions of type TABLE_DETAILS_SUCCESS", () => {
    const action = {
        type: TABLE_DETAILS_SUCCESS,
        payload: table,
    };

    const newState = tableDetailsReducer({}, action);

    expect(newState).toEqual({ loading: false, table: table });
});

it("handles actions of type TABLE_DETAILS_FAIL", () => {
    const action = {
        type: TABLE_DETAILS_FAIL,
        payload: "Request failed with status code 500",
    };

    const newState = tableDetailsReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        error: "Request failed with status code 500",
    });
});

it("handles actions of type TABLE_DETAILS_RESET", () => {
    const action = {
        type: TABLE_DETAILS_RESET,
    };

    const newState = tableDetailsReducer({}, action);

    expect(newState).toEqual({
        table: {},
    });
});

it("handles action with unknown type", () => {
    const action = {
        type: "UNKNOWN",
    };

    const newState = tableDetailsReducer({}, action);

    expect(newState).toEqual({});
});
