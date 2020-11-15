import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { allCategories } from './../actions/categoryActions';
import { CATEGORY_ALL_RESET } from '../constants/categoryConstants';
import { updateProduct, listProductDetails, deleteProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET, PRODUCT_DETAILS_RESET, PRODUCT_DELETE_RESET } from './../constants/productConstants';
import Select from '../components/form/Select';
import Input from '../components/form/Input';
import HeaderContent from '../components/HeaderContent';
import ButtonGoBack from '../components/ButtonGoBack';


const ProductEditScreen = ({history, match}) => {
    const productId = parseInt(match.params.id)

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [category, setCategory] = useState('')

    const [errors, setErrors] = useState({})
    
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin
 
    //categories state
    const categoryAll = useSelector(state => state.categoryAll)
    const {loading: loadingCategories, error: errorCategories, categories} = categoryAll

    //product details state
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    //product update state
    const productUpdate = useSelector(state => state.productUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate

    //product delete state
    const productDelete = useSelector((state) => state.productDelete)
    const {success: successDelete} = productDelete



    useEffect( () => {
        //after update redirect to users
         if(successUpdate || successDelete){
        
        
            dispatch({type: PRODUCT_UPDATE_RESET})
            dispatch({type: PRODUCT_DETAILS_RESET})
            dispatch({type: PRODUCT_DELETE_RESET}) 
            dispatch({type: CATEGORY_ALL_RESET})
            history.push('/product')
        } 
  
            //load product data
            if(!product.name || product.id !== productId) {
                dispatch(allCategories())
                dispatch(listProductDetails(productId))
            } else{
                //set states
                setName(product.name)
                setPrice(product.price)
                setStock(product.stock)
                setCategory(product.categoryId)

            }

        

        
    },[dispatch, history, productId, product, successUpdate, successDelete])

    const handleSubmit = (e) => {
        e.preventDefault()

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
        if(!category){
          errorsCheck.category = 'Category is required'
        }



        if(Object.keys(errorsCheck).length > 0){
          setErrors(errorsCheck)
        }else{
          setErrors({})
        }
        
        if(Object.keys(errorsCheck).length === 0){
          dispatch(updateProduct({
              id: productId,
              name,
              price,
              stock,
              category

          }))
        }
    
    }

    //delete function
    /* const handleDelete = (e) => {
        e.preventDefault()
        if(window.confirm('Are you sure?')){
            dispatch(deleteProduct(productId))
        }
    } */

    return ( 
        <>  
  {/* Content Header (Page header) */}
  <HeaderContent name={'Products'}/>

  {/* Main content */}
  
  <section className="content">
    <div className="container-fluid">
      <ButtonGoBack link={'product'} />
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
        
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Edit Product</h3>
              <Loader variable={loadingUpdate} />
              <Message message={errorUpdate} color={'danger'}/>

            </div>
            {/* /.card-header */}
            <div className="card-body">
        
            {loading 
            ? <Loader variable={loading} />
            : error
            ? <Message message={error} color={'danger'}/>
            : (
              <form onSubmit={handleSubmit}>

                <Input name={'name'} type={'text'} data={name} setData={setName} errors={errors}/>

                <Input name={'price'} type={'number'} data={price} setData={setPrice} errors={errors}/>

                <Input name={'stock'} type={'number'} data={stock} setData={setStock} errors={errors}/>

                <Select id={product.categoryId} setData={setCategory} items={categories} loading={loadingCategories} error={errorCategories}/>


                    <hr/>
                    {/* <button className='btn btn-danger float-right' onClick={handleDelete}>Delete</button> */}
                    <button type="submit" className="btn btn-success">Submit</button>
              </form>
            )

            }
                


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
 
export default ProductEditScreen;