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
import { customStyles } from '../utils';
import ModalButton from './../components/ModalButton';



Modal.setAppElement('#root')

const TableScreen = ({history, match}) => {

    const keyword = match.params.keyword || ''
    const pageNumber = match.params.pageNumber || 1

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [name, setName] = useState('')

    const [errors, setErrors] = useState({})

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

      let errorsCheck = {}

      if(!name){
        errorsCheck.name = 'Name is required'
      }

      if(Object.keys(errorsCheck).length > 0){
        setErrors(errorsCheck)
      }else{
        setErrors({})
      }
      
      if(Object.keys(errorsCheck).length === 0){
          
        const table = {
          name: name
        }
        
        dispatch(createTable(table))
        setName('')
        setModalIsOpen(false)

      }

        
    }

    return ( 
        <>
            <HeaderContent name={'Tables'} />
            {/* Main content */}
          
          <section className="content">
            <div className="container-fluid">
            <ModalButton modal={modalIsOpen} setModal={setModalIsOpen} classes={'btn-success btn-lg mb-2'} />
              <Modal style={customStyles} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <h2>Create Form</h2>
                <form onSubmit={handleSubmit}>
                  <Input name={'name'} type={'text'} data={name} setData={setName} errors={errors}/>

                  <hr/>
                  <button type="submit" className="btn btn-primary">Submit</button>
                  
                  <ModalButton modal={modalIsOpen} setModal={setModalIsOpen} classes={'btn-danger float-right'} />

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