import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { CATEGORY_UPDATE_RESET, CATEGORY_DETAILS_RESET, CATEGORY_DELETE_RESET } from './../constants/categoryConstants';
import { updateCategory, deleteCategory,listCategoryDetails } from './../actions/categoryActions';
import HeaderContent from '../components/HeaderContent';


const CategoryEditScreen = ({history, match}) => {
    const categoryId = parseInt(match.params.id)

    const [name, setName] = useState('')
    
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin
 
    //category details state
    const categoryDetails = useSelector(state => state.categoryDetails)
    const {loading, error, category} = categoryDetails

    //category update state
    const categoryUpdate = useSelector(state => state.categoryUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = categoryUpdate

    //category delete state
    const categoryDelete = useSelector((state) => state.categoryDelete)
    const {success: successDelete} = categoryDelete



    useEffect( () => {
        //after update redirect to users
         if(successUpdate || successDelete){
        
        
            dispatch({type: CATEGORY_UPDATE_RESET})
            dispatch({type: CATEGORY_DETAILS_RESET})
            dispatch({type: CATEGORY_DELETE_RESET}) 
            history.push('/category')
        } 
  
            //load product data
            if(!category.name || category.id !== categoryId) {
                dispatch(listCategoryDetails(categoryId))
            } else{
                //set states
                setName(category.name)
            }

        

        
    },[dispatch, history, categoryId, category ,successUpdate, successDelete])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateCategory({
            id: categoryId,
            name,
        }))
    
    }

    const handleDelete = (e) => {
        e.preventDefault()
        if(window.confirm('Are you sure?')){
            dispatch(deleteCategory(categoryId))
        }
    }

    return ( 
        <>  
  {/* Content Header (Page header) */}
  <HeaderContent name={'Categories'} />
  {/* Main content */}
  
  <section className="content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">

        <button className='btn btn-danger float-right' onClick={handleDelete}>Delete</button>
        <Link to='/category' className='btn btn-info'>
                Go Back
        </Link>
        
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Edit Category</h3>
              <Loader variable={loadingUpdate} />
              <Message message={errorUpdate} color={'danger'}/>
              <Loader variable={loading} />
              <Message message={error} color={'danger'}/>
              
            </div>
            {/* /.card-header */}
            <div className="card-body">
            


                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        aria-describedby="name" 
                        placeholder="Enter name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    </div>



                    <hr/>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>


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
 
export default CategoryEditScreen;