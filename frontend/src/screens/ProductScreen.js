import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paginate from './../components/Paginate';
import SearchBox from './../components/SearchBox';
import TableCrud from './../components/TableCrud';
import Loader from './../components/Loader';
import Message from './../components/Message';
import ModalCreate from './../components/ModalCreate';
import { Route } from 'react-router-dom';
import { listProducts, createProduct } from './../actions/productActions';


const ProductScreen = ({history, match}) => {

    const keyword = match.params.keyword || ''
    const pageNumber = match.params.pageNumber || 1

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [data, setData] = useState({
        name: {
          type:'text',
          data:''
        },
        price: {
            type:'number',
            data:0
        },
        stock: {
            type:'number',
            data:0
        },
        category:{
            type:'select',
            data:0
        }
    })

    const dispatch = useDispatch()


    const productList = useSelector((state) => state.productList)
    const {loading, error, products, page, pages} = productList

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const productCreate = useSelector((state) => state.productCreate)
    const {loading: createLoading, success: createSuccess ,error: createError} = productCreate

    useEffect(() => {
        dispatch(listProducts(keyword,pageNumber))
    }, [dispatch, history, userInfo, pageNumber, keyword, createSuccess])

    const handleSubmit = (e) => {
      
        e.preventDefault();
        
        const product = {
          name: data['name'].data,
          price: data['price'].data,
          stock: data['stock'].data,
          category: data['category'].data
        }
        
        
        dispatch(createProduct(product))
  
         setData({
            name: {
                type:'text',
                data:''
              },
            price: {
                type:'number',
                data:0
              },
            stock: {
                type:'number',
                data:0
              },
            category:{
                type:'select',
                data:0
              }
        })
        
  
        setModalIsOpen(false)
      }

    return ( 
        <>
        <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Products</h1>
                  <Loader variable={createLoading} />
                  <Message message={createError} color={'danger'}/>
                  
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Products</li>
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
        
                  <Route render={({history}) => <SearchBox history={history} item={'product'}/>} />
                  
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Products table</h3>
        
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