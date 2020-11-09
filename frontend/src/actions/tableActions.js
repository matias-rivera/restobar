import axios from 'axios'
import {
    TABLE_LIST_REQUEST,
    TABLE_LIST_SUCCESS,
    TABLE_LIST_FAIL,
    TABLE_CREATE_REQUEST,
    TABLE_CREATE_SUCCESS,
    TABLE_CREATE_FAIL,
    TABLE_DETAILS_REQUEST,
    TABLE_DETAILS_SUCCESS,
    TABLE_DETAILS_FAIL,
    TABLE_UPDATE_REQUEST,
    TABLE_UPDATE_SUCCESS,
    TABLE_UPDATE_FAIL,
    TABLE_DELETE_REQUEST,
    TABLE_DELETE_SUCCESS,
    TABLE_DELETE_FAIL,
    TABLE_ALL_ACTIVE_REQUEST,
    TABLE_ALL_ACTIVE_SUCCESS,
    TABLE_ALL_ACTIVE_FAIL,
    TABLE_ALL_FREE_SUCCESS,
    TABLE_ALL_FREE_REQUEST,
    TABLE_ALL_FREE_FAIL

} from '../constants/tableConstants'


//get all active tables
export const allActiveTables = () => async(dispatch, getState) =>{
    try{
        dispatch({
            type: TABLE_ALL_ACTIVE_REQUEST
        })

        //get user from state
        const {userLogin: {userInfo}} = getState()

        //headers
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
       

        //if tables available is needed
        const {data} = await axios.get(`/api/tables/all/with-orders`, config)

 

        
        dispatch({
            type: TABLE_ALL_ACTIVE_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({
            type: TABLE_ALL_ACTIVE_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}


//get all tables
export const allFreeTables = () => async(dispatch, getState) =>{
    try{
        dispatch({
            type: TABLE_ALL_FREE_REQUEST
        })

        //get user from state
        const {userLogin: {userInfo}} = getState()

        //headers
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
       

        //if tables available is needed
        const {data} = await axios.get(`/api/tables/all/available`, config)
 

        
        dispatch({
            type: TABLE_ALL_FREE_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({
            type: TABLE_ALL_FREE_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}




//get all tables with pagination
export const listTables = (keyword = '', pageNumber = '') => async(dispatch, getState) =>{
    try{
        dispatch({
            type: TABLE_LIST_REQUEST
        })

        //get user from state
        const {userLogin: {userInfo}} = getState()

        //headers
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //get all tables
        const {data} = await axios.get(`/api/tables?keyword=${keyword}&pageNumber=${pageNumber}`, config)
     
        dispatch({
            type: TABLE_LIST_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({
            type: TABLE_LIST_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

//create a table
export const createTable = (table) => async(dispatch, getState) => {
    
    const {name} = table

    try{
        dispatch({
            type: TABLE_CREATE_REQUEST
        })


        //get table from state
        const {userLogin: {userInfo}} = getState()

        //headers
        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //create table
        const {data} = await axios.post(
            '/api/tables',
            {name},
            config
            )
        dispatch({
            type: TABLE_CREATE_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: TABLE_CREATE_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
}

//get table details
export const listTableDetails = (id) =>  async (dispatch, getState) => { 
    try{
        dispatch({type: TABLE_DETAILS_REQUEST})
        

         //get user from state
         const {userLogin: {userInfo}} = getState()

         //headers
         const config = {
             headers: {
                 Authorization: `Bearer ${userInfo.token}`
             }
         }

        //api call to get table 
        const {data} = await axios.get(`/api/tables/${id}`, config)
        dispatch({
            type: TABLE_DETAILS_SUCCESS,
            payload: data
        }) 
    } catch(error){
        dispatch({
            type: TABLE_DETAILS_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
}


//update a table
export const updateTable = (table) => async(dispatch, getState) => {
    try{
        dispatch({
            type: TABLE_UPDATE_REQUEST
        })

        //get user from state
        const {userLogin: {userInfo}} = getState()
        //headers
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //update table
        const {data} = await axios.put(
            `/api/tables/${table.id}`,
            table,
            config
            )
        dispatch({
            type: TABLE_UPDATE_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: TABLE_UPDATE_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
}

//delete table
export const deleteTable = (id) => async(dispatch, getState) => {
    try{
        dispatch({
            type: TABLE_DELETE_REQUEST
        })

        //get user from state
        const {userLogin: {userInfo}} = getState()
        //headers
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //api call to delete table
        await axios.delete(`/api/tables/${id}`, config)
        dispatch({
            type: TABLE_DELETE_SUCCESS,
        })

    }catch(error){
        dispatch({
            type: TABLE_DELETE_FAIL,
            payload: 
                error.response && error.response.data.message
                    ? error.response.data.message 
                    : error.message
        })
    }
}
