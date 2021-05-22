import { clientListReducer } from "../../clientReducers";
import {
    CLIENT_LIST_REQUEST,
    CLIENT_LIST_SUCCESS,
    CLIENT_LIST_RESET,
    CLIENT_LIST_FAIL,
} from "../../../constants/clientConstants";

/* DATA */
const clients = {
    clients: [
        {
            id: 1,
            name: "Particular",
            address: "PARTICULAR 999",
            phone: "999999999",
            email: "particular@example.com",
            dni: "999999999",
            createdAt: "2021-05-19T03:54:19.000Z",
        },
        {
            id: 2,
            name: "John Doe",
            address: "Barrio Centro, Rivadavia 1030",
            phone: "3804123123",
            email: "johndoe@example.com",
            dni: "40123123",
            createdAt: "2021-05-19T03:54:19.000Z",
        },
    ],
    page: 1,
    pages: 1,
};

/* TESTS */
it("handles actions of type CLIENT_LIST_REQUEST", () => {
    const action = {
        type: CLIENT_LIST_REQUEST,
    };

    const newState = clientListReducer({}, action);

    expect(newState).toEqual({ loading: true, clients: [] });
});

it("handles actions of type CLIENT_LIST_SUCCESS", () => {
    const action = {
        type: CLIENT_LIST_SUCCESS,
        payload: {
            clients: clients,
            page: 1,
            pages: 2,
        },
    };

    const newState = clientListReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        clients: clients,
        page: 1,
        pages: 2,
    });
});

it("handles actions of type CLIENT_LIST_FAIL", () => {
    const action = {
        type: CLIENT_LIST_FAIL,
        payload: "Request failed with status code 500",
    };

    const newState = clientListReducer({}, action);

    expect(newState).toEqual({
        loading: false,
        error: "Request failed with status code 500",
    });
});

it("handles actions of type CLIENT_LIST_RESET", () => {
    const action = {
        type: CLIENT_LIST_RESET,
    };

    const newState = clientListReducer({}, action);

    expect(newState).toEqual({ clients: [] });
});

it("handles action with unknown type", () => {
    const action = { type: "UNKNOWN" };
    const newState = clientListReducer({}, action);
    expect(newState).toEqual({});
});
