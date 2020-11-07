import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Input from '../components/form/Input';
import HeaderContent from '../components/HeaderContent';
import { TABLE_UPDATE_RESET, TABLE_DETAILS_RESET, TABLE_DELETE_RESET } from './../constants/tableConstants';
import { listTableDetails, deleteTable, updateTable } from '../actions/tableActions';



const TableEditScreen = ({history, match}) => {
    const tableId = parseInt(match.params.id)

    const [name, setName] = useState('')
    
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin
 

    //table details state
    const tableDetails = useSelector(state => state.tableDetails)
    const {loading, error, table} = tableDetails

    //table update state
    const tableUpdate = useSelector(state => state.tableUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = tableUpdate

    //table delete state
    const tableDelete = useSelector((state) => state.tableDelete)
    const {success: successDelete} = tableDelete



    useEffect( () => {
        //after update redirect to users
         if(successUpdate || successDelete){
        
        
            dispatch({type: TABLE_UPDATE_RESET})
            dispatch({type: TABLE_DETAILS_RESET})
            dispatch({type: TABLE_DELETE_RESET}) 

            history.push('/table')
        } 
  
            //load table data
            if(!table.name || table.id !== tableId) {
                dispatch(listTableDetails(tableId))
            } else{
                //set states
                setName(table.name)

            }

        

        
    },[dispatch, history, tableId, table, successUpdate, successDelete])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateTable({
            id: tableId,
            name
        }))
    
    }

    const handleDelete = (e) => {
        e.preventDefault()
        if(window.confirm('Are you sure?')){
            dispatch(deleteTable(tableId))
        }
    }

    return ( 
        <>  
  {/* Content Header (Page header) */}
  <HeaderContent name={'Tables'}/>

  {/* Main content */}
  
  <section className="content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
        <button className='btn btn-danger float-right' onClick={handleDelete}>Delete</button>
        <Link to='/table' className='btn btn-info'>
                Go Back
        </Link>
        
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Edit Table</h3>
              <Loader variable={loadingUpdate} />
              <Message message={errorUpdate} color={'danger'}/>

            </div>
            {/* /.card-header */}
            <div className="card-body">
        
            {loading 
            ? <Loader variable={loading} />
            : error
            ? <Message message={error} color={'danger'}/>
            : (
              <form onSubmit={handleSubmit}>

                <Input name={'Name'} type={'text'} data={name} setData={setName} />

                    <hr/>
                    <button type="submit" className="btn btn-success">Submit</button>
              </form>
            )

            }
                


            </div>
            {/* /.card-body */}
          </div>

        </div>
        {/* /.col */}
      </div>
      {/* /.row */}
    </div>
    {/* /.container-fluid */}
  </section>


        </>
        
     );
}
 
export default TableEditScreen;