import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from './../actions/userActions';


const UserScreen = ({history}) => {
    
    const dispatch = useDispatch()

    const userList = useSelector((state) => state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin
    
    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }
    }, [dispatch, history, userInfo])


    return ( 
        <>  
  {/* Content Header (Page header) */}
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>DataTables</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">DataTables</li>
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
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">DataTable with minimal features &amp; hover style</h3>
            </div>
            {/* /.card-header */}
            <div className="card-body">
              {loading ? 'Loading...' : error ? error : (<table id="example2" className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th></th>

                  </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? 'Si' : 'No'}</td>
                            <td className='text-center'>
                                <button className='btn btn-warning'>Edit</button>
                            </td>

                        </tr>
                    
                    ))}

                </tbody>

              </table>)}
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