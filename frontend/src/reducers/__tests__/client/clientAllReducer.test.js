import { clientAllReducer } from "../../clientReducers";
import {
    CLIENT_ALL_REQUEST,
    CLIENT_ALL_SUCCESS,
    CLIENT_ALL_RESET,
    CLIENT_ALL_FAIL,
} from "../../../constants/clientConstants";

/* DATA */
const clients = [
    {
        id: 1,
        name: "Particular",
        address: "PARTICULAR 999",
        phone: "999999999",
        email: "particular@example.com",
        dni: "999999999",
        createdAt: "2021-05-19T03:54:19.000Z",
        updatedAt: "2021-05-19T03:54:19.000Z",
    },
    {
        id: 2,
        name: "John Doe",
        address: "Barrio Centro, Rivadavia 1030",
        phone: "3804123123",
        email: "johndoe@example.com",
        dni: "40123123",
        createdAt: "2021-05-19T03:54:19.000Z",
        updatedAt: "2021-05-19T03:54:19.000Z",
    },
];

/* TESTS */
it("handles actions of type CLIENT_ALL_REQUEST", () => {
    const action = {
        type: CLIENT_ALL_REQUEST,
    };

    const newState = clientAllReducer({}, action);

    expect(newState).toEqual({ loading: true, clients: [] });
});

it("handles actions of type CLIENT_ALL_SUCCESS", () => {
    const action = {
        type: CLIENT_ALL_SUCCESS,
        payload: clients,
    };

    const newState = clientAllReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        clients: clients,
    });
});

it("handles actions of type CLIENT_ALL_FAIL", () => {
    const action = {
        type: CLIENT_ALL_FAIL,
        payload: "Request failed with status code 500",
    };

    const newState = clientAllReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        error: "Request failed with status code 500",
    });
});

it("handles actions of type CLIENT_ALL_RESET", () => {
    const action = {
        type: CLIENT_ALL_RESET,
    };

    const newState = clientAllReducer({}, action);

    expect(newState).toEqual({ clients: [] });
});

it("handles action with unknown type", () => {
    const action = { type: "UNKNOWN" };
    const newState = clientAllReducer({}, action);
    expect(newState).toEqual({});
});
