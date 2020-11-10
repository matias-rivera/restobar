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
    ORDER_ALL_REQUEST,
    ORDER_ALL_SUCCESS,
    ORDER_ALL_FAIL,
    ORDER_ALL_RESET,
    ORDER_CREATE_RESET,
    ORDER_DELIVERY_REQUEST,
    ORDER_DELIVERY_SUCCESS,
    ORDER_DELIVERY_FAIL,
    ORDER_DELIVERY_RESET,
    ORDER_ALL_ACTIVE_REQUEST,
    ORDER_ALL_ACTIVE_SUCCESS,
    ORDER_ALL_ACTIVE_FAIL,
    ORDER_ALL_ACTIVE_RESET
} from '../constants/orderConstants'


export const orderListReducer = (state = { loading: true, orders: [] }, action) => {
    switch(action.type) {
        case ORDER_LIST_REQUEST:
            return { loading: true, orders: [] }
        case ORDER_LIST_SUCCESS:
            return { 
                loading: false, 
                orders: action.payload.orders,
                pages:action.payload.pages, 
                page: action.payload.page
             }
        case ORDER_LIST_FAIL:
            return { loading: false, error: action.payload}
        case ORDER_LIST_RESET:
            return { orders: [] }
        default:
            return state
    }
}

export const orderDeliveryListReducer = (state = { loading: true, orders: [] }, action) => {
    switch(action.type) {
        case ORDER_DELIVERY_REQUEST:
            return { loading: true, orders: [] }
        case ORDER_DELIVERY_SUCCESS:
            return { 
                loading: false, 
                orders: action.payload.orders,
                pages:action.payload.pages, 
                page: action.payload.page
             }
        case ORDER_DELIVERY_FAIL:
            return { loading: false, error: action.payload}
        case ORDER_DELIVERY_RESET:
            return { orders: [] }
        default:
            return state
    }
}

export const orderAllReducer = (state = { loading: true, orders: [] }, action) => {
    switch(action.type) {
        case ORDER_ALL_REQUEST:
            return { loading: true, orders: [] }
        case ORDER_ALL_SUCCESS:
            return { 
                loading: false, 
                orders: action.payload,
             }
        case ORDER_ALL_FAIL:
            return { loading: false, error: action.payload}
        case ORDER_ALL_RESET:
            return { orders: [] }
        default:
            return state
    }
}

export const orderAllActiveReducer = (state = { loading: true, orders: [] }, action) => {
    switch(action.type) {
        case ORDER_ALL_ACTIVE_REQUEST:
            return { loading: true, orders: [] }
        case ORDER_ALL_ACTIVE_SUCCESS:
            return { 
                loading: false, 
                orders: action.payload,
             }
        case ORDER_ALL_ACTIVE_FAIL:
            return { loading: false, error: action.payload}
        case ORDER_ALL_ACTIVE_RESET:
            return { orders: [] }
        default:
            return state
    }
}

export const orderCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true }
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true }
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload}
        case ORDER_CREATE_RESET:
            return {}
        default:
            return state
    }
}


export const orderDetailsReducer = (state = { order: {} }, action) => {
    switch(action.type) {
        case ORDER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload }
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload}
        case ORDER_DETAILS_RESET:
            return { order: {} }
        default:
            return state
    }
}

export const orderUpdateReducer = (state = {order: {} }, action) => {
    switch(action.type) {
        case ORDER_UPDATE_REQUEST:
            return { loading: true}
        case ORDER_UPDATE_SUCCESS:
            return { loading: false, success: true, order: action.payload }
        case ORDER_UPDATE_FAIL:
            return { loading: false, error: action.payload}
        case ORDER_UPDATE_RESET:
            return {order: {}}
        default:
            return state
    }
}


export const orderDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case ORDER_DELETE_REQUEST:
            return {loading: true }
        case ORDER_DELETE_SUCCESS:
            return { loading: false, success: true }
        case ORDER_DELETE_FAIL:
            return { loading: false, error: action.payload}
        case ORDER_DELETE_RESET:
            return {}
        default:
            return state
    }
}