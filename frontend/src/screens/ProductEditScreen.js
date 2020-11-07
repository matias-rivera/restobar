import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { allCategories } from './../actions/categoryActions';
import { updateProduct, listProductDetails, deleteProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET, PRODUCT_DETAILS_RESET, PRODUCT_DELETE_RESET } from './../constants/productConstants';
import { CATEGORY_ALL_RESET } from '../constants/categoryConstants';
import Select from '../components/form/Select';
import Input from '../components/form/Input';
import HeaderContent from '../components/HeaderContent';


const ProductEditScreen = ({history, match}) => {
    const productId = parseInt(match.params.id)

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [category, setCategory] = useState('')
    
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
        dispatch(updateProduct({
            id: productId,
            name,
            price,
            stock,
            category

        }))
    
    }

    const handleDelete = (e) => {
        e.preventDefault()
        if(window.confirm('Are you sure?')){
            dispatch(deleteProduct(productId))
        }
    }

    return ( 
        <>  
  {/* Content Header (Page header) */}
  <HeaderContent name={'Products'}/>

  {/* Main content */}
  
  <section className="content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
        <button className='btn btn-danger float-right' onClick={handleDelete}>Delete</button>
        <Link to='/product' className='btn btn-info'>
                Go Back
        </Link>
        
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

                <Input name={'Name'} type={'text'} data={name} setData={setName} />

                <Input name={'Price'} type={'number'} data={price} setData={setPrice}/>

                <Input name={'Stock'} type={'number'} data={stock} setData={setStock}/>

                <Select id={product.categoryId} setData={setCategory} items={categories} loading={loadingCategories} error={errorCategories}/>


                    <hr/>
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