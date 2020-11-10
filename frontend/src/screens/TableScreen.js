import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paginate from '../components/Paginate';
import SearchBox from '../components/SearchBox';
import TableCrud from '../components/TableCrud';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Route } from 'react-router-dom';
import HeaderContent from '../components/HeaderContent';
import  Modal  from 'react-modal';
import Input from '../components/form/Input';
import { listTables } from '../actions/tableActions';
import { createTable } from '../actions/tableActions';

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

const TableScreen = ({history, match}) => {

    const keyword = match.params.keyword || ''
    const pageNumber = match.params.pageNumber || 1

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [name, setName] = useState('')

    const dispatch = useDispatch()


    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const tableList = useSelector((state) => state.tableList)
    const {loading, error, tables, page, pages} = tableList

    const tableCreate = useSelector((state) => state.tableCreate)
    const {loading: createLoading, success: createSuccess ,error: createError} = tableCreate

    useEffect(() => {
        dispatch(listTables(keyword,pageNumber))
    }, [dispatch, history, userInfo, pageNumber, keyword, createSuccess])


    const handleSubmit = (e) => {
      
        e.preventDefault();
        
        const table = {
          name: name
        }
        
        
        dispatch(createTable(table))
  
         setName('')

  
        setModalIsOpen(false)
      }

    return ( 
        <>
            <HeaderContent name={'Tables'} />
            {/* Main content */}
          
          <section className="content">
            <div className="container-fluid">
              <button 
                  className='btn btn-success btn-lg mb-2'
                  onClick={() => setModalIsOpen(true)}
              >
                  <i class="fas fa-plus"></i> Create
              </button>
              <Modal style={customStyles} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <h2>Create Form</h2>
                <form onSubmit={handleSubmit}>
                  <Input name={'Name'} type={'text'} data={name} setData={setName} />            
                  <hr/>
                  <button type="submit" className="btn btn-primary">Submit</button>
                  <button className='btn btn-danger float-right' onClick={() => setModalIsOpen(false)}>Close</button>
                </form>
              </Modal>
              <div className="row">
                <div className="col-12">
        
                  <Loader variable={createLoading} />
                  <Message message={createError} color={'danger'}/>
                  <Route render={({history}) => <SearchBox history={history} item={'table'}/>} />
                  
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Tables</h3>
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
                      <TableCrud  data={tables} itemLink={'table'}/>
                      
                      <Paginate 
                            item={'table'}
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
 
export default TableScreen;