import {
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_RESET,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_RESET,
    ORDER_UPDATE_REQUEST,
    ORDER_UPDATE_SUCCESS,
    ORDER_UPDATE_FAIL,
    ORDER_UPDATE_RESET,
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS,
    ORDER_DELETE_FAIL,
    ORDER_DELETE_RESET,
    ORDER_STATISTICS_REQUEST,
    ORDER_STATISTICS_SUCCESS,
    ORDER_STATISTICS_FAIL,
    ORDER_STATISTICS_RESET,
    ORDER_CREATE_RESET,
} from "../constants/orderConstants";

export const orderListReducer = (
    state = { loading: true, orders: [] },
    action
) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return { loading: true, orders: [] };
        case ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                pages: action.payload.pages,
                page: action.payload.page,
            };
        case ORDER_LIST_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_LIST_RESET:
            return { orders: [] };
        default:
            return state;
    }
};

export const statisticsReducer = (
    state = {
        loading: true,
        data: {
            orders: [],
            sales: [],
            statistics: {
                total: 0,
                today: 0,
                orders: 0,
                deliveries: 0,
            },
        },
    },
    action
) => {
    switch (action.type) {
        case ORDER_STATISTICS_REQUEST:
            return { loading: true, ...state };
        case ORDER_STATISTICS_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case ORDER_STATISTICS_FAIL:
            return { loading: false, error: action.payload, ...state };
        case ORDER_STATISTICS_RESET:
            return {
                ...state,
                data: {
                    orders: [],
                    sales: [],
                    statistics: {
                        total: 0,
                        today: 0,
                        orders: 0,
                        deliveries: 0,
                    },
                },
            };
        default:
            return state;
    }
};

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true };
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true };
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const orderDetailsReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { ...state, loading: true };
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload };
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_DETAILS_RESET:
            return { order: {} };
        default:
            return state;
    }
};

export const orderUpdateReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case ORDER_UPDATE_REQUEST:
            return { loading: true };
        case ORDER_UPDATE_SUCCESS:
            return { loading: false, success: true, order: action.payload };
        case ORDER_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_UPDATE_RESET:
            return { order: {} };
        default:
            return state;
    }
};

export const orderDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DELETE_REQUEST:
            return { loading: true };
        case ORDER_DELETE_SUCCESS:
            return { loading: false, success: true };
        case ORDER_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case ORDER_DELETE_RESET:
            return {};
        default:
            return state;
    }
};
