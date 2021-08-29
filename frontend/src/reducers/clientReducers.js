import {
    CLIENT_LIST_REQUEST,
    CLIENT_LIST_SUCCESS,
    CLIENT_LIST_FAIL,
    CLIENT_LIST_RESET,
    CLIENT_CREATE_REQUEST,
    CLIENT_CREATE_SUCCESS,
    CLIENT_CREATE_FAIL,
    CLIENT_DETAILS_REQUEST,
    CLIENT_DETAILS_SUCCESS,
    CLIENT_DETAILS_FAIL,
    CLIENT_DETAILS_RESET,
    CLIENT_UPDATE_REQUEST,
    CLIENT_UPDATE_SUCCESS,
    CLIENT_UPDATE_FAIL,
    CLIENT_UPDATE_RESET,
    CLIENT_DELETE_REQUEST,
    CLIENT_DELETE_SUCCESS,
    CLIENT_DELETE_FAIL,
    CLIENT_DELETE_RESET,
} from "../constants/clientConstants";

export const clientListReducer = (
    state = { loading: true, clients: [] },
    action
) => {
    switch (action.type) {
        case CLIENT_LIST_REQUEST:
            return { loading: true, clients: [] };
        case CLIENT_LIST_SUCCESS:
            return {
                loading: false,
                clients: action.payload.clients,
                pages: action.payload.pages,
                page: action.payload.page,
            };
        case CLIENT_LIST_FAIL:
            return { loading: false, error: action.payload };
        case CLIENT_LIST_RESET:
            return { clients: [] };
        default:
            return state;
    }
};

export const clientCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CLIENT_CREATE_REQUEST:
            return { loading: true };
        case CLIENT_CREATE_SUCCESS:
            return { loading: false, success: true };
        case CLIENT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const clientDetailsReducer = (state = { client: {} }, action) => {
    switch (action.type) {
        case CLIENT_DETAILS_REQUEST:
            return { ...state, loading: true };
        case CLIENT_DETAILS_SUCCESS:
            return { loading: false, client: action.payload };
        case CLIENT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        case CLIENT_DETAILS_RESET:
            return { client: {} };
        default:
            return state;
    }
};

export const clientUpdateReducer = (state = { client: {} }, action) => {
    switch (action.type) {
        case CLIENT_UPDATE_REQUEST:
            return { loading: true };
        case CLIENT_UPDATE_SUCCESS:
            return { loading: false, success: true, client: action.payload };
        case CLIENT_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case CLIENT_UPDATE_RESET:
            return { client: {} };
        default:
            return state;
    }
};

export const clientDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case CLIENT_DELETE_REQUEST:
            return { loading: true };
        case CLIENT_DELETE_SUCCESS:
            return { loading: false, success: true };
        case CLIENT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case CLIENT_DELETE_RESET:
            return {};
        default:
            return state;
    }
};
