import { clientDetailsReducer } from "../../clientReducers";
import {
    CLIENT_DETAILS_REQUEST,
    CLIENT_DETAILS_SUCCESS,
    CLIENT_DETAILS_RESET,
    CLIENT_DETAILS_FAIL,
} from "../../../constants/clientConstants";

/* DATA */
const client = {
    id: 2,
    name: "John Doe",
    address: "Barrio Centro, Rivadavia 1030",
    phone: "3804123123",
    email: "johndoe@example.com",
    dni: "40123123",
    createdAt: "2021-05-19T03:54:19.000Z",
    updatedAt: "2021-05-19T03:54:19.000Z",
};

/* TESTS */
it("handles actions of type CLIENT_DETAILS_REQUEST", () => {
    const action = {
        type: CLIENT_DETAILS_REQUEST,
    };

    const newState = clientDetailsReducer({}, action);

    expect(newState).toEqual({ loading: true });
});

it("handles actions of type CLIENT_DETAILS_SUCCESS", () => {
    const action = {
        type: CLIENT_DETAILS_SUCCESS,
        payload: client,
    };

    const newState = clientDetailsReducer({}, action);

    expect(newState).toEqual({ loading: false, client: client });
});

it("handles actions of type CLIENT_DETAILS_FAIL", () => {
    const action = {
        type: CLIENT_DETAILS_FAIL,
        payload: "Request failed with status code 500",
    };

    const newState = clientDetailsReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        error: "Request failed with status code 500",
    });
});

it("handles actions of type CLIENT_DETAILS_RESET", () => {
    const action = {
        type: CLIENT_DETAILS_RESET,
    };

    const newState = clientDetailsReducer({}, action);

    expect(newState).toEqual({ client: {} });
});

it("handles actions of type UNKNOWN", () => {
    const action = {
        type: "UNKNOWN",
    };

    const newState = clientDetailsReducer({}, action);

    expect(newState).toEqual({});
});
