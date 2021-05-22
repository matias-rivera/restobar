import {
    TABLE_UPDATE_REQUEST,
    TABLE_UPDATE_SUCCESS,
    TABLE_UPDATE_FAIL,
    TABLE_UPDATE_RESET,
} from "../../../constants/tableConstants";
import { tableUpdateReducer } from "../../tableReducers";

/* DATA */
const table = {
    id: 1,
    name: "PATIO 1",
    occupied: false,
    createdAt: "2021-05-19T03:54:18.000Z",
    updatedAt: "2021-05-19T05:28:26.000Z",
};

/* TESTS */
it("handles actions of type TABLE_UPDATE_REQUEST", () => {
    const action = {
        type: TABLE_UPDATE_REQUEST,
    };

    const newState = tableUpdateReducer({}, action);

    expect(newState).toEqual({ loading: true });
});

it("handles actions of type TABLE_UPDATE_SUCCESS", () => {
    const action = {
        type: TABLE_UPDATE_SUCCESS,
        payload: table,
    };

    const newState = tableUpdateReducer({}, action);

    expect(newState).toEqual({ loading: false, success: true, table: table });
});

it("handles actions of type TABLE_UPDATE_FAIL", () => {
    const action = {
        type: TABLE_UPDATE_FAIL,
        payload: "Request failed with status code 500",
    };

    const newState = tableUpdateReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        error: "Request failed with status code 500",
    });
});

it("handles actions of type TABLE_UPDATE_RESET", () => {
    const action = {
        type: TABLE_UPDATE_RESET,
    };

    const newState = tableUpdateReducer({}, action);

    expect(newState).toEqual({ table: {} });
});

it("handles action with unknown type", () => {
    const action = {
        type: "UNKNOWN",
    };

    const newState = tableUpdateReducer({}, action);

    expect(newState).toEqual({});
});
