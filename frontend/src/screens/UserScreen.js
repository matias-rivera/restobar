import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, register } from './../actions/userActions';
import Modal from 'react-modal'
import { Link, Route } from 'react-router-dom';
import Paginate from './../components/Paginate';
import SearchBox from './../components/SearchBox';
import TableCrud from './../components/TableCrud';
import Loader from './../components/Loader';
import Message from './../components/Message';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    width: 400,
    transform             : 'translate(-50%, -50%)'
  }
}

Modal.setAppElement('#root')

const UserScreen = ({history, match}) => {
  
    const keyword = match.params.keyword || ''
    const pageNumber = match.params.pageNumber || 1

    const [modalIsOpen, setModalIsOpen] = useState(false)

    const [user, setUser] = useState({
      name: '',
      password: '',
      email: '',
      isAdmin: false
    })
    
    
    const dispatch = useDispatch()

    const userList = useSelector((state) => state.userList)
    const {loading, error, users, page, pages} = userList

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const userRegister = useSelector((state) => state.userRegister)
    const {loading: createLoading, success: createSuccess ,error: createError} = userRegister 
    
    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers(keyword,pageNumber))
        }

    }, [dispatch, history, userInfo, createSuccess, pageNumber, keyword])

    const handleSubmit = () => {
      setModalIsOpen(false)
      dispatch(register(user))
      
      setUser({
        name: '',
        password: '',
        email: '',
        isAdmin: false
      })
    }
   

    return ( 
        <>  
  {/* Content Header (Page header) */}
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Users</h1>
          <Loader variable={createLoading} />
          <Message message={createError} color={'danger'}/>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">Users</li>
          </ol>
        </div>
      </div>
    </div>{/* /.container-fluid */}
  </section>
  {/* Main content */}
  
  <section className="content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">

  <Modal style={customStyles} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="name" 
            aria-describedby="name" 
            placeholder="Enter name" 
            value={user.name}
            onChange={(e) => setUser({...user, name: e.target.value})}
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
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            placeholder="password" 
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
          />
        </div>
        <div className="form-check">

          <input 
            type="checkbox" 
            className="form-check-input" 
            id="isAdmin" 
            checked={user.isAdmin}
            onChange={(e) => setUser({...user, isAdmin: e.target.checked})} 
          />

          <label className="form-check-label" htmlFor="admin">Is admin</label>
        </div>

        <hr/>
        <button type="submit" className="btn btn-primary">Submit</button>
        <button className='btn btn-danger float-right' onClick={() => setModalIsOpen(false)}>Close</button>
      </form>
  </Modal>

          <Route render={({history}) => <SearchBox history={history} item={'user'}/>} />
          
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Users table</h3>
              <button 
                className='btn btn-success float-right mr-4'
                onClick={() => setModalIsOpen(true)}
              >
                New User
              </button>
            </div>
            {/* /.card-header */}
            <div className="card-body">
              {loading 
              ? 
              <Loader variable={loading} /> 
              : error 
              ? 
              <Message message={error} color={'danger'} />
              : (
              <>
              <TableCrud data={users} itemLink={'user'}/>
              
              <Paginate 
                    item={'user'}
                    pages={pages} 
                    page={page} 
                    keyword={keyword ? keyword : null} />
              </>
              )}
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
 
export default UserScreen;