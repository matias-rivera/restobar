import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    userLoginReducer,
    userListReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateReducer,
} from "./reducers/userReducers";
import {
    categoryListReducer,
    categoryCreateReducer,
    categoryDetailsReducer,
    categoryUpdateReducer,
} from "./reducers/categoryReducers";

import {
    tableAllReducer,
    tableListReducer,
    tableCreateReducer,
    tableDetailsReducer,
    tableUpdateReducer,
} from "./reducers/tableReducers";

import {
    clientListReducer,
    clientCreateReducer,
    clientDetailsReducer,
    clientUpdateReducer,
} from "./reducers/clientReducers";

import {
    productListReducer,
    productCreateReducer,
    productDetailsReducer,
    productUpdateReducer,
} from "./reducers/productReducers";

import {
    orderAllReducer,
    orderAllSalesReducer,
    orderAllActiveReducer,
    orderListReducer,
    orderCreateReducer,
    orderDetailsReducer,
    orderUpdateReducer,
    orderDeliveryListReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userList: userListReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,

    categoryList: categoryListReducer,
    categoryCreate: categoryCreateReducer,
    categoryDetails: categoryDetailsReducer,
    categoryUpdate: categoryUpdateReducer,

    productList: productListReducer,
    productCreate: productCreateReducer,
    productDetails: productDetailsReducer,
    productUpdate: productUpdateReducer,

    tableAll: tableAllReducer,
    tableList: tableListReducer,
    tableCreate: tableCreateReducer,
    tableDetails: tableDetailsReducer,
    tableUpdate: tableUpdateReducer,

    clientList: clientListReducer,
    clientCreate: clientCreateReducer,
    clientDetails: clientDetailsReducer,
    clientUpdate: clientUpdateReducer,

    orderAll: orderAllReducer,
    orderAllActive: orderAllActiveReducer,
    orderAllSales: orderAllSalesReducer,
    orderList: orderListReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderUpdate: orderUpdateReducer,
    orderDeliveryList: orderDeliveryListReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
