import axios from "axios";
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_DETAILS_RESET,
} from "./../constants/userConstants";
import config from '../config';
const API_URL = config.API_URL;


//login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });

        //headers
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        //get login data
        const { data } = await axios.post(
            `${API_URL}/users/login`,
            { email, password },
            config
        );
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        //set user info into local storage
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

//logout
export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: USER_LOGOUT });
};

//get all users
export const listUsers =
    (keyword = "", pageNumber = "") =>
    async (dispatch, getState) => {
        try {
            dispatch({
                type: USER_LIST_REQUEST,
            });

            //get user from state
            const {
                userLogin: { userInfo },
            } = getState();

            //headers
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            //get all users
            const { data } = await axios.get(
                `${API_URL}/users?keyword=${keyword}&pageNumber=${pageNumber}`,
                config
            );
            dispatch({
                type: USER_LIST_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: USER_LIST_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

//register an user
export const register = (user) => async (dispatch, getState) => {
    const { name, email, password, isAdmin } = user;

    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        });

        //get user from state
        const {
            userLogin: { userInfo },
        } = getState();

        //headers
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        //get login data
        const { data } = await axios.post(
            `${API_URL}/users`,
            { name, email, password, isAdmin },
            config
        );
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

//get user details
export const listUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });

        //get user from state
        const {
            userLogin: { userInfo },
        } = getState();

        //headers
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        //api call to get product
        const { data } = await axios.get(`${API_URL}/users/${id}`, config);
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

//update an user
export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST,
        });

        //get user from state
        const {
            userLogin: { userInfo },
        } = getState();
        //headers
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        //update user
        const { data } = await axios.put(`${API_URL}/users/${user.id}`, user, config);
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

//delete user
export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST,
        });

        //get user from state
        const {
            userLogin: { userInfo },
        } = getState();
        //headers
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        //api call to delete user
        await axios.delete(`${API_URL}/users/${id}`, config);
        dispatch({
            type: USER_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

//update profile
export const updateProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST,
        });

        //get user from state
        const {
            userLogin: { userInfo },
        } = getState();
        //headers
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        //update user
        const { data } = await axios.put(
            `${API_URL}/users/profile/${user.id}`,
            user,
            config
        );
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
