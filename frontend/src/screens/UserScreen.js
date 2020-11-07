import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, register } from './../actions/userActions';
import { Route } from 'react-router-dom';
import Paginate from './../components/Paginate';
import SearchBox from './../components/SearchBox';
import TableCrud from './../components/TableCrud';
import Loader from './../components/Loader';
import Message from './../components/Message';
import ModalCreate from './../components/ModalCreate';
import HeaderContent from '../components/HeaderContent';




const UserScreen = ({history, match}) => {
  
    const keyword = match.params.keyword || ''
    const pageNumber = match.params.pageNumber || 1

    const [modalIsOpen, setModalIsOpen] = useState(false)

    const [data, setData] = useState({
      name: {
        type: 'text',
        data: ''
      },
      password: {
        type: 'password',
        data: ''
      },
      email: {
        type: 'email',
        data: ''
      },
      isAdmin: {
        type: 'checkbox',
        data: false
      }
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

    }, [dispatch, userInfo, pageNumber, keyword, history, createSuccess])

    const handleSubmit = (e) => {
      
      e.preventDefault();
      
      const user = {
        name: data['name'].data,
        email: data['email'].data,
        password: data['password'].data,
        isAdmin: data['isAdmin'].data
      }
      
      
      dispatch(register(user))

       setData({
        name: {
          type: 'text',
          data: ''
        },
        password: {
          type: 'password',
          data: ''
        },
        email: {
          type: 'email',
          data: ''
        },
        isAdmin: {
          type: 'checkbox',
          data: false
        }
      })
      

      setModalIsOpen(false)
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

  

          <Loader variable={createLoading} />
          <Message message={createError} color={'danger'}/>
          <Route render={({history}) => <SearchBox history={history} item={'user'}/>} />
          
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Users table</h3>
              <ModalCreate data={data} setData={setData} handleSubmit={handleSubmit} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}/>
             
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