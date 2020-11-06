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
    categoryListReducer,
    categoryCreateReducer,
    categoryDetailsReducer,
    categoryUpdateReducer,
    categoryDeleteReducer
} from './reducers/categoryReducers'

const reducer = combineReducers({
    
    userLogin: userLoginReducer,
    userList: userListReducer,
    userRegister : userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    
    categoryList: categoryListReducer,
    categoryCreate:categoryCreateReducer,
    categoryDetails: categoryDetailsReducer,
    categoryUpdate: categoryUpdateReducer,
    categoryDelete: categoryDeleteReducer

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