import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal'
import { Link, Route } from 'react-router-dom';
import Paginate from './../components/Paginate';
import SearchBox from './../components/SearchBox';
import TableCrud from './../components/TableCrud';
import Loader from './../components/Loader';
import Message from './../components/Message';
import { listCategories } from './../actions/categoryActions';


const CategoryScreen = ({history, match}) => {


    const keyword = match.params.keyword || ''
    const pageNumber = match.params.pageNumber || 1

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [category, setCategory] = useState({
        name: ''
    })

    const dispatch = useDispatch()

    const categoryList = useSelector((state) => state.categoryList)
    const {loading, error, categories, page, pages} = categoryList

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
            dispatch(listCategories(keyword,pageNumber))
    }, [dispatch, history, userInfo, pageNumber, keyword])

    
    return ( 
        <>
<section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Categories</h1>
          
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">Categories</li>
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

          <Route render={({history}) => <SearchBox history={history} item={'category'}/>} />
          
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Categories table</h3>
              {/* <button 
                className='btn btn-success float-right mr-4'
                onClick={() => setModalIsOpen(true)}
              >
                New User
              </button> */}
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
              <TableCrud  data={categories} itemLink={'category'}/>
              
              <Paginate 
                    item={'category'}
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
 
export default CategoryScreen;