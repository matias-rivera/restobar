import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paginate from './../components/Paginate';
import SearchBox from './../components/SearchBox';
import TableCrud from './../components/TableCrud';
import Loader from './../components/Loader';
import Message from './../components/Message';
import { Route } from 'react-router-dom';
import { listProducts, createProduct } from './../actions/productActions';
import HeaderContent from '../components/HeaderContent';
import  Modal  from 'react-modal';
import Input from '../components/form/Input';
import Select from '../components/form/Select';
import { allCategories } from './../actions/categoryActions';
import { CATEGORY_ALL_RESET } from '../constants/categoryConstants';

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

const ProductScreen = ({history, match}) => {

    const keyword = match.params.keyword || ''
    const pageNumber = match.params.pageNumber || 1

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [category, setCategory] = useState(1)

    const dispatch = useDispatch()


    //categories state
    const categoryAll = useSelector(state => state.categoryAll)
    const {loading: loadingCategories, error: errorCategories, categories} = categoryAll

    const productList = useSelector((state) => state.productList)
    const {loading, error, products, page, pages} = productList

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const productCreate = useSelector((state) => state.productCreate)
    const {loading: createLoading, success: createSuccess ,error: createError} = productCreate

    useEffect(() => {
        dispatch(listProducts(keyword,pageNumber))
        dispatch(allCategories())
    }, [dispatch, history, userInfo, pageNumber, keyword, createSuccess])

    const handleSubmit = (e) => {
      
        e.preventDefault();
        
        const product = {
          name: name,
          price: price,
          stock: stock,
          category: category
        }
        
        
        dispatch(createProduct(product))
  
         setName('')
         setPrice(0)
         setStock(0)
         setCategory(1)
        
  
        setModalIsOpen(false)
      }

    return ( 
        <>
        <HeaderContent name={'Products'} />
          {/* Main content */}
          
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
        
                  <Loader variable={createLoading} />
                  <Message message={createError} color={'danger'}/>
                  <Route render={({history}) => <SearchBox history={history} item={'product'}/>} />
                  
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Products table</h3>
              <button 
                className='btn btn-success float-right mr-4'
                onClick={() => setModalIsOpen(true)}
              >
                Create
              </button>
        <Modal style={customStyles} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
          <h2>Create Form</h2>
          <form onSubmit={handleSubmit}>
            <Input name={'Name'} type={'text'} data={name} setData={setName} />
            <Input name={'Price'} type={'number'} data={price} setData={setPrice} />
            <Input name={'Stock'} type={'number'} data={stock} setData={setStock} />
            <Select setData={setCategory} items={categories} loading={loadingCategories} error={errorCategories} />
            

            <hr/>
            <button type="submit" className="btn btn-primary">Submit</button>
            <button className='btn btn-danger float-right' onClick={() => setModalIsOpen(false)}>Close</button>
          </form>
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
                      <TableCrud  data={products} itemLink={'product'}/>
                      
                      <Paginate 
                            item={'product'}
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
 
export default ProductScreen;