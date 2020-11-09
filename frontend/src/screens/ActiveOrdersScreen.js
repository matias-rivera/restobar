import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import HeaderContent from '../components/HeaderContent';
import  Modal  from 'react-modal';
import { allActiveTables, allFreeTables } from '../actions/tableActions';
import Table from '../components/Table';
import { Link } from 'react-router-dom';

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

const ActiveOrdersScreen = ({history, match}) => {


    const [modalIsOpen, setModalIsOpen] = useState(false)


    const dispatch = useDispatch()


    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    //tables list state
    const tableAllActive = useSelector((state) => state.tableAllActive)
    const {loading, error, tables} = tableAllActive

    //tables list state
    const tableAllFree = useSelector((state) => state.tableAllFree)
    const {loading:loadingFree, error:errorFree, tables: tablesFree} = tableAllFree



    useEffect(() => {
        dispatch(allActiveTables())
        dispatch(allFreeTables())
    }, [dispatch, history, userInfo])


    return ( 
        <>
            <HeaderContent name={'Tables'} />
            {/* Main content */}
          
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 col-md-9 col-lg-9"> 
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Occupied Tables</h3>
                      <Modal style={customStyles} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                        <h2>Table Info</h2>

                      </Modal>
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
                        <div className='row'>
                          {tables.map(table => (
                            <div key={table.id} className="col-lg-3 col-xs-6">
                              {/* small box */}
                              <Table table={table} />
                            </div>
                          ))}
                        </div>
                      </>
                      )}
                    </div>
                    {/* /.card-body */}
                  </div>
        
                </div>
                {/* /.col */}
                <div className='col-12 col-md-3 col-lg-3'>
                  <div className='card'>
                    <div className='card-header'>
                        Free Tables
                    </div>
                    <div className='card-body'>
                      {loadingFree
                      ? 
                      <Loader variable={loadingFree} /> 
                      : errorFree
                      ? 
                      <Message message={errorFree} color={'danger'} />
                      : (
                      <>
                          {tablesFree.map(table => (
                            <Link to={'/order/create'} key={table.id} className="btn btn-block btn-success btn-lg" >
                          <p className='text-center my-0'><i class="fas fa-utensils float-left my-1"></i>{table.name}</p>
                            </Link>
                          ))}
                      </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </section>
        </>
     );
}
 
export default ActiveOrdersScreen;