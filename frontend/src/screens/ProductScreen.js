import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paginate from './../components/Paginate';
import TableCrud from './../components/TableCrud';
import Loader from './../components/Loader';
import Message from './../components/Message';
import { Route, Link } from 'react-router-dom';
import { listProducts, createProduct } from './../actions/productActions';
import HeaderContent from '../components/HeaderContent';
import  Modal  from 'react-modal';
import Input from '../components/form/Input';
import { allCategories } from './../actions/categoryActions';
import { customStyles } from '../utils';
import ModalButton from '../components/ModalButton';
import SearchBoxMini from './../components/SearchBoxMini';
import  Select  from 'react-select';
import DataTableLoader from '../components/loader/DataTableLoader';


Modal.setAppElement('#root')

const ProductScreen = ({history, match}) => {

    const keyword = match.params.keyword || ''
    const pageNumber = match.params.pageNumber || 1

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [category, setCategory] = useState({})

    const [errors, setErrors] = useState({})

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

        let errorsCheck = {}

        if(!name){
          errorsCheck.name = 'Name is required'
        }
        if(!price){
          errorsCheck.price = 'Price is required'
        }
        
        if(!stock){
          errorsCheck.stock = 'Stock is required'
        }
        if(!category || Object.keys(category).length === 0){
          errorsCheck.category = 'Category is required'
        }



      if(Object.keys(errorsCheck).length > 0){
        setErrors(errorsCheck)
      }else{
        setErrors({})
      }
      
      if(Object.keys(errorsCheck).length === 0){
        
        const product = {
          name: name,
          price: price,
          stock: stock,
          categoryId: category.value
        }
        
        
        dispatch(createProduct(product))
  
         setName('')
         setPrice(0)
         setStock(0)
         setCategory(1)
        
  
        setModalIsOpen(false)
      }
    }

    const mapSelect = (data) => {
      const mapped = data.map(table => ({ label: table.name, value: table.id}))
      return mapped
    }

    return ( 
        <>
        <HeaderContent name={'Products'} />
          {/* Main content */}
          
          <section className="content">
            <div className="container-fluid">
              <ModalButton modal={modalIsOpen} setModal={setModalIsOpen} classes={'btn-success btn-lg mb-2'} />
              <Modal style={customStyles} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <h2>Create Form</h2>
                <form onSubmit={handleSubmit}>
                  <Input name={'name'} type={'text'} data={name} setData={setName} errors={errors}/>
                  <Input name={'price'} type={'number'} data={price} setData={setPrice} errors={errors}/>
                  <Input name={'stock'} type={'number'} data={stock} setData={setStock} errors={errors}/>

{/*                   <Select setData={setCategory} items={categories} loading={loadingCategories} error={errorCategories} />
 */}                  <Select
                        id='category' 
                        options={categories ? mapSelect(categories) : ''}
                        onChange={setCategory}
                        value={category}
                        placeholder='Select Category'
                        isSearchable
                      />
                      
                    {errors.category  && <label className='text-danger'>{errors.category} </label>}
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
                      <h3 className="card-title">Products table</h3>
                      <div className="card-tools">
                          <Route render={({history}) => <SearchBoxMini history={history} item={'product'}/>} />
                      </div>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body table-responsive p-0">
                      {loading 
                      ? 
                      <DataTableLoader /> 
                      : error 
                      ? 
                      <Message message={error} color={'danger'} />
                      : (
                      <>
                        <table className="table table-hover text-nowrap">
                          <thead>
                              <tr>
                              <th>ID</th>
                              <th>Name</th> 
                              <th>Price</th>
                              <th>Stock</th>
                              <th className="d-none d-sm-table-cell">Created At</th>
                              <th className="d-none d-sm-table-cell">Category</th>
                              <th></th>
                              </tr>
                          </thead>
                                                      <tbody>
                          
                          {products.map(product => (
                                  <tr key={product.id}>
                                      <td>{product.id}</td>
                                      <td>{product.name}</td>
                                      <td>{product.price}</td>
                                      <td>{product.stock}</td>
                                      <td className="d-none d-sm-table-cell">{product.createdAt.slice(0,10)}</td>
                                      <td className="d-none d-sm-table-cell">{product.category.name}</td>
                                      <td><Link to={`/product/${product.id}/edit`} className='btn btn-warning btn-lg'>Edit</Link></td>
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
                            item={'product'}
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
 
export default ProductScreen;