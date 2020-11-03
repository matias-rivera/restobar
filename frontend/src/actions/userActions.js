import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL
} from './../constants/userConstants'

//login
export const login = (email, password) => async(dispatch) => {
    try{
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        //headers
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }

        //get login data
        const {data} = await axios.post(
            '/api/users/login',
            {email, password},
            config
        )
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        //set user info into local storage
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch(error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

//logout
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT})
}

//get all users
export const listUsers = () => async(dispatch, getState) =>{
    try{
        dispatch({
            type: USER_LIST_REQUEST
        })

        //get user from state
        const {userLogin: {userInfo}} = getState()

        //headers
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //get all users
        const {data} = await axios.get(`/api/users`, config)
        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}