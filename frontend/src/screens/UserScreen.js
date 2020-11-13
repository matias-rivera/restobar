import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, register } from './../actions/userActions';
import { Route, Link } from 'react-router-dom';
import Paginate from './../components/Paginate';
import TableCrud from './../components/TableCrud';
import Loader from './../components/Loader';
import Message from './../components/Message';
import HeaderContent from '../components/HeaderContent';
import Input from '../components/form/Input';
import ModalButton from '../components/ModalButton';
import Modal from 'react-modal';
import { customStyles } from '../utils';
import Checkbox from '../components/form/Checkbox';
import SearchBoxMini from '../components/SearchBoxMini';




const UserScreen = ({history, match}) => {
  
    const keyword = match.params.keyword || ''
    const pageNumber = match.params.pageNumber || 1

    const [modalIsOpen, setModalIsOpen] = useState(false)

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [errors, setErrors] = useState({})
  

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

    }, [dispatch, userInfo, pageNumber, keyword, history, createSuccess])

    const handleSubmit = (e) => {
      
      e.preventDefault();


      let errorsCheck = {}
      if(!name){
        errorsCheck.name = 'Name is required'
      }
      if(!password){
        errorsCheck.password = 'Password is required'
      }

      if(!email){
        errorsCheck.email = 'Email is required'
      }

      if(Object.keys(errorsCheck).length > 0){
        setErrors(errorsCheck)
      }else{
        setErrors({})
      }
      
      if(Object.keys(errorsCheck).length === 0){

      const user = {
        name: name,
        email: email,
        password: password,
        isAdmin: isAdmin
      }
      
      
      dispatch(register(user))

      setName('')
      setPassword('')
      setEmail('')
      setIsAdmin(false)
      

      setModalIsOpen(false)

      }
    }


    return ( 
        <>  
  {/* Content Header (Page header) */}
<HeaderContent name={'Users'} />
  {/* Main content */}
  
  <section className="content">
    <div className="container-fluid">
      <ModalButton modal={modalIsOpen} setModal={setModalIsOpen} classes={'btn-success btn-lg mb-2'} />
      <Modal style={customStyles} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
      <h2>Create Form</h2>
      <form onSubmit={handleSubmit}>
          <Input name={'name'} type={'text'} data={name} setData={setName} errors={errors}/>
          <Input name={'email'} type={'email'} data={email} setData={setEmail} errors={errors}/>
          <Input name={'password'} type={'password'} data={password} setData={setPassword} errors={errors}/>
          <Checkbox name={'Admin'} data={isAdmin} setData={setIsAdmin} />

          <hr/>
          <button type="submit" className="btn btn-primary">Submit</button>
          <ModalButton modal={modalIsOpen} setModal={setModalIsOpen} classes={'btn-danger float-right'} />
      </form>
      </Modal>
      <div className="row">
        <div className="col-12">

  

          <Loader variable={createLoading} />
          <Message message={createError} color={'danger'}/>          
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Users table</h3>
              <div className="card-tools">
                  <Route render={({history}) => <SearchBoxMini history={history} item={'user'}/>} />
              </div>
             
            </div>
            {/* /.card-header */}
            <div className="card-body table-responsive p-0">
              {loading 
              ? 
              <Loader variable={loading} /> 
              : error 
              ? 
              <Message message={error} color={'danger'} />
              : (
              <>
                <table className="table table-hover text-nowrap">
                    <thead>
                        <tr>
                        <th className="d-none d-sm-table-cell">ID</th>
                        <th>Name</th> 
                        <th>Email</th>
                        <th className="d-none d-sm-table-cell">Photo</th>
                        <th className="d-none d-sm-table-cell">Admin</th>
                        <th className="d-none d-sm-table-cell">Created At</th>
                        <th></th>
                        </tr>
                    </thead>
                                                <tbody>
                    
                    {users.map(user => (
                            <tr key={user.id}>
                                <td className="d-none d-sm-table-cell" >{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className="d-none d-sm-table-cell" ><img src={user.image ? user.image : "/dist/img/user2-160x160.jpg"} style={{height:'2em'}} className="img-circle elevation-2" alt="User" /></td>
                                <td className="d-none d-sm-table-cell">{user.isAdmin ? 'Yes' : 'No'}</td>
                                <td className="d-none d-sm-table-cell">{user.createdAt.slice(0,10)}</td>
                                <td><Link to={`/user/${user.id}/edit`} className='btn btn-warning btn-lg'>Edit</Link></td>
                            </tr>
                        ))}
                                    
                    </tbody>
                  </table>
              
              </>
              )}
            </div>
            {/* /.card-body */}
          </div>
              <Paginate 
                    item={'user'}
                    pages={pages} 
                    page={page} 
                    keyword={keyword ? keyword : null} />

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