import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paginate from './../components/Paginate';
import SearchBox from './../components/SearchBox';
import TableCrud from './../components/TableCrud';
import Loader from './../components/Loader';
import Message from './../components/Message';
import { Route } from 'react-router-dom';
import HeaderContent from '../components/HeaderContent';
import  Modal  from 'react-modal';
import Input from '../components/form/Input';
import { createClient, listClients } from '../actions/clientActions';

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

const ClientScreen = ({history, match}) => {

    const keyword = match.params.keyword || ''
    const pageNumber = match.params.pageNumber || 1

    const [modalIsOpen, setModalIsOpen] = useState(false)

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [dni, setDni] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const clientList = useSelector((state) => state.clientList)
    const {loading, error, clients, page, pages} = clientList

    const clientCreate = useSelector((state) => state.clientCreate)
    const {loading: createLoading, success: createSuccess ,error: createError} = clientCreate

    useEffect(() => {
        dispatch(listClients(keyword,pageNumber))
    }, [dispatch, history, userInfo, pageNumber, keyword, createSuccess])

    const handleSubmit = (e) => {
      
        e.preventDefault();
        
        const client = {
          name: name,
          address: address,
          phone: phone,
          email: email,
          dni: dni
        }
        
        
        dispatch(createClient(client))
  
        setName('')
        setAddress('')
        setPhone('')
        setEmail('')
        setDni('')

  
        setModalIsOpen(false)
      }


    return ( 
        <>
            <HeaderContent name={'Clients'} />

            <section className="content">
            <div className="container-fluid">
                    <button 
                        className='btn btn-success btn-lg mb-2'
                        onClick={() => setModalIsOpen(true)}
                    >
                      <i class="fas fa-plus"></i>  Create
                    </button>
                    <Modal style={customStyles} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                    <h2>Create Form</h2>
                    <form onSubmit={handleSubmit}>
                        <Input name={'Name'} type={'text'} data={name} setData={setName} />
                        <Input name={'Address'} type={'text'} data={address} setData={setAddress} />            
                        <Input name={'Phone'} type={'text'} data={phone} setData={setPhone} />
                        <Input name={'Email'} type={'email'} data={email} setData={setEmail} />
                        <Input name={'DNI'} type={'text'} data={dni} setData={setDni} />

                        <hr/>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button className='btn btn-danger float-right' onClick={() => setModalIsOpen(false)}>Close</button>
                    </form>
                    </Modal>
              <div className="row">
                <div className="col-12">
        
                  <Loader variable={createLoading} />
                  <Message message={createError} color={'danger'}/>
                  <Route render={({history}) => <SearchBox history={history} item={'client'}/>} />
                  
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Clients</h3>
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
                      <TableCrud  data={clients} itemLink={'client'}/>
                      
                      <Paginate 
                            item={'client'}
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
 
export default ClientScreen;