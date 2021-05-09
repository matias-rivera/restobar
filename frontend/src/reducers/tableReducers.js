import {
    TABLE_LIST_REQUEST,
    TABLE_LIST_SUCCESS,
    TABLE_LIST_FAIL,
    TABLE_LIST_RESET,
    TABLE_CREATE_REQUEST,
    TABLE_CREATE_SUCCESS,
    TABLE_CREATE_FAIL,
    TABLE_DETAILS_REQUEST,
    TABLE_DETAILS_SUCCESS,
    TABLE_DETAILS_FAIL,
    TABLE_DETAILS_RESET,
    TABLE_UPDATE_REQUEST,
    TABLE_UPDATE_SUCCESS,
    TABLE_UPDATE_FAIL,
    TABLE_UPDATE_RESET,
    TABLE_DELETE_REQUEST,
    TABLE_DELETE_SUCCESS,
    TABLE_DELETE_FAIL,
    TABLE_DELETE_RESET,
    TABLE_ALL_REQUEST,
    TABLE_ALL_SUCCESS,
    TABLE_ALL_FAIL,
    TABLE_ALL_RESET,
} from "../constants/tableConstants";

export const tableListReducer = (
    state = { loading: true, tables: [] },
    action
) => {
    switch (action.type) {
        case TABLE_LIST_REQUEST:
            return { loading: true, tables: [] };
        case TABLE_LIST_SUCCESS:
            return {
                loading: false,
                tables: action.payload.tables,
                pages: action.payload.pages,
                page: action.payload.page,
            };
        case TABLE_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case TABLE_LIST_RESET:
            return { tables: [] };
        default:
            return state;
    }
};

export const tableAllReducer = (
    state = { loading: true, tables: [] },
    action
) => {
    switch (action.type) {
        case TABLE_ALL_REQUEST:
            return { loading: true, tables: [] };
        case TABLE_ALL_SUCCESS:
            return {
                tables: action.payload,
                loading: false,
            };
        case TABLE_ALL_FAIL:
            return { loading: false, error: action.payload };
        case TABLE_ALL_RESET:
            return { tables: [] };
        default:
            return state;
    }
};

export const tableCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case TABLE_CREATE_REQUEST:
            return { loading: true };
        case TABLE_CREATE_SUCCESS:
            return { loading: false, success: true };
        case TABLE_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const tableDetailsReducer = (state = { table: {} }, action) => {
    switch (action.type) {
        case TABLE_DETAILS_REQUEST:
            return { ...state, loading: true };
        case TABLE_DETAILS_SUCCESS:
            return { loading: false, table: action.payload };
        case TABLE_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        case TABLE_DETAILS_RESET:
            return { table: {} };
        default:
            return state;
    }
};

export const tableUpdateReducer = (state = { table: {} }, action) => {
    switch (action.type) {
        case TABLE_UPDATE_REQUEST:
            return { loading: true };
        case TABLE_UPDATE_SUCCESS:
            return { loading: false, success: true, table: action.payload };
        case TABLE_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case TABLE_UPDATE_RESET:
            return { table: {} };
        default:
            return state;
    }
};

export const tableDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case TABLE_DELETE_REQUEST:
            return { loading: true };
        case TABLE_DELETE_SUCCESS:
            return { loading: false, success: true };
        case TABLE_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case TABLE_DELETE_RESET:
            return {};
        default:
            return state;
    }
};
