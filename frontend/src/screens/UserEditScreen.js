import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUserDetails, deleteUser, updateUser } from './../actions/userActions';
import { USER_UPDATE_RESET, USER_DETAILS_RESET, USER_DELETE_RESET } from './../constants/userConstants';
import { Link } from 'react-router-dom';
import Message from './../components/Message';
import Loader from './../components/Loader';
import HeaderContent from './../components/HeaderContent';


const UserEditScreen = ({history, match}) => {
    const userId = parseInt(match.params.id)

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin
 
    //user details state
    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    //user update state
    const userUpdate = useSelector(state => state.userUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdate

    //user delete state
    const userDelete = useSelector((state) => state.userDelete)
    const {success: successDelete} = userDelete



    useEffect( () => {
        //after update redirect to users
         if(successUpdate || successDelete){
        
        
            dispatch({type: USER_UPDATE_RESET})
            dispatch({type: USER_DETAILS_RESET})
            dispatch({type: USER_DELETE_RESET}) 
            history.push('/user')
        } 
  
            //load product data
            if(!user.name || user.id !== userId) {
                dispatch(listUserDetails(userId))
            } else{
                //set states
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }

        

        
    },[dispatch, history, userId,user,successUpdate, successDelete])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateUser({
            id: userId,
            name,
            email,
            password,
            isAdmin

        }))
    
    }

    const handleDelete = (e) => {
        e.preventDefault()
        if(window.confirm('Are you sure?')){
            dispatch(deleteUser(userId))
        }
    }

    return ( 
        <>  
  {/* Content Header (Page header) */}
  <HeaderContent name={'Users'} />

  {/* Main content */}
  
  <section className="content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">

        <button className='btn btn-danger float-right' onClick={handleDelete}>Delete</button>
        <Link to='/user' className='btn btn-info'>
                Go Back
        </Link>
        
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Edit User</h3>
              <Loader variable={loadingUpdate} />
              <Message message={errorUpdate} color={'danger'}/>
              <Loader variable={loading} />
              <Message message={error} color={'danger'}/>

            </div>
            {/* /.card-header */}
            <div className="card-body">
            



                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        aria-describedby="name" 
                        placeholder="Enter name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        aria-describedby="email" 
                        placeholder="Enter email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </div>
                    <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>
                    <div className="form-check">
                    <input 
                        type="checkbox" 
                        className="form-check-input" 
                        id="isAdmin" 
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="admin">Is admin</label>
                    </div>
                    <hr/>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>


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
 
export default UserEditScreen;