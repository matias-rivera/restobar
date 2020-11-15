import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { 
    userLoginReducer,
    userListReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateReducer,
    userDeleteReducer
} from './reducers/userReducers'

import {
    categoryAllReducer,
    categoryListReducer,
    categoryCreateReducer,
    categoryDetailsReducer,
    categoryUpdateReducer,
    categoryDeleteReducer
} from './reducers/categoryReducers'

import {
    tableAllReducer,
    tableAllActiveReducer,
    tableAllFreeReducer,
    tableListReducer,
    tableCreateReducer,
    tableDetailsReducer,
    tableUpdateReducer,
    tableDeleteReducer
} from './reducers/tableReducers'

import {
    clientAllReducer,
    clientListReducer,
    clientCreateReducer,
    clientDetailsReducer,
    clientUpdateReducer,
    clientDeleteReducer
} from './reducers/clientReducers'

import {
    productListReducer,
    productCreateReducer,
    productDetailsReducer,
    productUpdateReducer,
    productDeleteReducer
} from './reducers/productReducers'

import {
    orderAllReducer,
    orderAllSalesReducer,
    orderAllActiveReducer,
    orderListReducer,
    orderCreateReducer,
    orderDetailsReducer,
    orderUpdateReducer,
    orderDeleteReducer,
    orderDeliveryListReducer
} from './reducers/orderReducers'


const reducer = combineReducers({
    
    userLogin: userLoginReducer,
    userList: userListReducer,
    userRegister : userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    
    categoryAll: categoryAllReducer,
    categoryList: categoryListReducer,
    categoryCreate:categoryCreateReducer,
    categoryDetails: categoryDetailsReducer,
    categoryUpdate: categoryUpdateReducer,
    categoryDelete: categoryDeleteReducer,

    productList: productListReducer,
    productCreate: productCreateReducer,
    productDetails: productDetailsReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,

    tableAll: tableAllReducer,
    tableAllActive: tableAllActiveReducer,
    tableAllFree: tableAllFreeReducer,
    tableList: tableListReducer,
    tableCreate: tableCreateReducer,
    tableDetails: tableDetailsReducer,
    tableUpdate: tableUpdateReducer,
    tableDelete: tableDeleteReducer,

    clientAll: clientAllReducer,
    clientList: clientListReducer,
    clientCreate: clientCreateReducer,
    clientDetails: clientDetailsReducer,
    clientUpdate: clientUpdateReducer,
    clientDelete: clientDeleteReducer,

    orderAll: orderAllReducer,
    orderAllActive: orderAllActiveReducer,
    orderAllSales: orderAllSalesReducer,
    orderList: orderListReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderUpdate: orderUpdateReducer,
    orderDelete: orderDeleteReducer,
    orderDeliveryList: orderDeliveryListReducer

})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(
    localStorage.getItem('userInfo')
) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}


const middleware = [thunk]
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store