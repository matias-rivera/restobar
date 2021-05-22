import {
    TABLE_CREATE_REQUEST,
    TABLE_CREATE_SUCCESS,
    TABLE_CREATE_FAIL,
} from "../../../constants/tableConstants";
import { tableCreateReducer } from "../../tableReducers";

it("handles actions of type TABLE_CREATE_REQUEST", () => {
    const action = {
        type: TABLE_CREATE_REQUEST,
    };

    const newState = tableCreateReducer({}, action);

    expect(newState).toEqual({ loading: true });
});

it("handles actions of type TABLE_CREATE_SUCCESS", () => {
    const action = {
        type: TABLE_CREATE_SUCCESS,
    };

    const newState = tableCreateReducer({}, action);

    expect(newState).toEqual({ loading: false, success: true });
});

it("handles actions of type TABLE_CREATE_FAIL", () => {
    const action = {
        type: TABLE_CREATE_FAIL,
        payload: "Request failed with status code 500",
    };

    const newState = tableCreateReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        error: "Request failed with status code 500",
    });
});

it("handles action with unknown type", () => {
    const action = {
        type: "UNKNOWN",
    };

    const newState = tableCreateReducer({}, action);

    expect(newState).toEqual({});
});
