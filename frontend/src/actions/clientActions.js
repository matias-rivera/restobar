import axios from "axios";
import {
    CLIENT_LIST_REQUEST,
    CLIENT_LIST_SUCCESS,
    CLIENT_LIST_FAIL,
    CLIENT_CREATE_REQUEST,
    CLIENT_CREATE_SUCCESS,
    CLIENT_CREATE_FAIL,
    CLIENT_DETAILS_REQUEST,
    CLIENT_DETAILS_SUCCESS,
    CLIENT_DETAILS_FAIL,
    CLIENT_UPDATE_REQUEST,
    CLIENT_UPDATE_SUCCESS,
    CLIENT_UPDATE_FAIL,
    CLIENT_DELETE_REQUEST,
    CLIENT_DELETE_SUCCESS,
    CLIENT_DELETE_FAIL,
} from "../constants/clientConstants";

//get all clients with pagination
export const listClients =
    (keyword = "", pageNumber = "") =>
    async (dispatch, getState) => {
        try {
            dispatch({
                type: CLIENT_LIST_REQUEST,
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

            //get all clients
            const { data } = await axios.get(
                `/api/clients?keyword=${keyword}&pageNumber=${pageNumber}`,
                config
            );

            dispatch({
                type: CLIENT_LIST_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: CLIENT_LIST_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

//create a client
export const createClient = (client) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CLIENT_CREATE_REQUEST,
        });

        //get client from state
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

        //create client
        const { data } = await axios.post("/api/clients", client, config);
        dispatch({
            type: CLIENT_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CLIENT_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

//get client details
export const listClientDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: CLIENT_DETAILS_REQUEST });

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

        //api call to get CLIENT
        const { data } = await axios.get(`/api/clients/${id}`, config);
        dispatch({
            type: CLIENT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CLIENT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

//update a client
export const updateClient = (client) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CLIENT_UPDATE_REQUEST,
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

        //update client
        const { data } = await axios.put(
            `/api/clients/${client.id}`,
            client,
            config
        );
        dispatch({
            type: CLIENT_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CLIENT_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

//delete client
export const deleteClient = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CLIENT_DELETE_REQUEST,
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

        //api call to delete client
        await axios.delete(`/api/clients/${id}`, config);
        dispatch({
            type: CLIENT_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: CLIENT_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
