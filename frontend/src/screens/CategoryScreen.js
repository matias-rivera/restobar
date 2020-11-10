import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paginate from './../components/Paginate';
import SearchBox from './../components/SearchBox';
import TableCrud from './../components/TableCrud';
import Loader from './../components/Loader';
import Message from './../components/Message';
import { createCategory, listCategories } from './../actions/categoryActions';
import ModalCreate from './../components/ModalCreate';
import { Route } from 'react-router-dom';
import HeaderContent from '../components/HeaderContent';


const CategoryScreen = ({history, match}) => {


    const keyword = match.params.keyword || ''
    const pageNumber = match.params.pageNumber || 1

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [data, setData] = useState({
        name: {
          type:'text',
          data:''
        }
    })

    const dispatch = useDispatch()

    const categoryList = useSelector((state) => state.categoryList)
    const {loading, error, categories, page, pages} = categoryList

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const categoryCreate = useSelector((state) => state.categoryCreate)
    const {loading: createLoading, success: createSuccess ,error: createError} = categoryCreate

    useEffect(() => {
            dispatch(listCategories(keyword,pageNumber))
    }, [dispatch, history, userInfo, pageNumber, keyword, createSuccess])

    const handleSubmit = (e) => {
      
      e.preventDefault();
      
      const category = {
        name: data['name'].data,
      }
      
      
      dispatch(createCategory(category))

       setData({
        name: {
          type: 'text',
          data: ''
        }
      })
      

      setModalIsOpen(false)
    }



    return ( 
        <>
<HeaderContent name={'Categories'} />

  {/* Main content */}
  
  <section className="content">
    <div className="container-fluid">
      <ModalCreate data={data} setData={setData} handleSubmit={handleSubmit} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}/>
      <div className="row">
        <div className="col-12">
          <Loader variable={createLoading} />
          <Message message={createError} color={'danger'}/>

          <Route render={({history}) => <SearchBox history={history} item={'category'}/>} />
          
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Categories table</h3>

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