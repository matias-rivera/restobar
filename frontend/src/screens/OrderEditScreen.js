import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import HeaderContent from '../components/HeaderContent';
import { listOrderDetails, updateOrder } from '../actions/orderActions';
import { ORDER_DETAILS_RESET, ORDER_UPDATE_RESET } from '../constants/orderConstants';
import { allClients } from '../actions/clientActions';
import { allFreeTables } from '../actions/tableActions';
import { listProducts } from '../actions/productActions';
import SearchBox from './../components/SearchBox';
import Paginate from './../components/Paginate';
import Select from 'react-select'
import Textarea from './../components/form/Textarea';
import Checkbox from './../components/form/Checkbox';
import SearchBoxMini from '../components/SearchBoxMini';


const OrderEditScreen = ({history, match}) => {
    
    const orderId = parseInt(match.params.id)

    const keyword = match.params.keyword || ''
    const pageNumber = match.params.pageNumber || 1

    const [table, setTable] = useState(null)
    const [client, setClient] = useState(null)
    const [delivery, setDelivery] = useState(false)
    const [note, setNote] = useState('')
    const [productsInOrder, setProductsInOrder] = useState([])
    const [errors, setErrors] = useState({})
    const [productsInOrderOld, setProductsInOrderOld] = useState([])
  

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin
 
    //order details state
    const orderDetails = useSelector(state => state.orderDetails)
    const {loading, error, order} = orderDetails

    //order edit state
    const orderUpdate = useSelector((state) => state.orderUpdate)
    const {loading:loadingUpdate, success: successUpdate,errorUpdate} = orderUpdate

    //product list state
    const productList = useSelector((state) => state.productList)
    const {loading: loadingProductList, error: errorProductList, products, page, pages} = productList
    
    //tables list state
    const tableAllFree = useSelector((state) => state.tableAllFree)
    const {loading: loadingAllTables, error: errorAllTables, tables} = tableAllFree

    //client list state
    const clientAll = useSelector((state) => state.clientAll)
    const {loading: loadingAllClients, error: errorAllClients, clients} = clientAll


    useEffect( () => {

        if(successUpdate){
            dispatch({type: ORDER_UPDATE_RESET})
            dispatch({type: ORDER_DETAILS_RESET})
            if(delivery){
              history.push('/delivery')
            }else{
              history.push('/active')
            }
        }
        else{
          
          //load client data
          if(!order || order.id !== orderId) {
            dispatch(listOrderDetails(orderId))
          } else{
              //set states
            if(!table){
              setTable(order.table ? {
                  label: order.table.name, 
                  value: order.table.id
              } : null)
            }

            if(!client){
                setClient(order.client ? {
                  label: order.client.name, 
                  value: order.client.id
                  } : null)
            }
            setNote(note ? note :order.note)
            setDelivery(delivery ? delivery : order.delivery)


            const products = order.products.map(product => {
                return   {
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  stock: product.stock,
                  quantity: product.orderItem.quantity,
                  oldQuantity: product.orderItem.quantity
                } 
              })
            if(productsInOrder.length === 0 && productsInOrderOld.length === 0){
              setProductsInOrder(products)
              setProductsInOrderOld(setDeletedState(products))
            }
            

              dispatch(listProducts(keyword,pageNumber))
              dispatch(allFreeTables())
              dispatch(allClients())
            
  
          }
        }
      },[dispatch, history, keyword, pageNumber, error, orderId, order, successUpdate])


      const handleSubmit = (e) => {
        e.preventDefault()
        let errorsCheck = {}
        if(!table){
          if(!delivery){
            errorsCheck.table = 'Table is required'
          }
        }
        if(!client){
          errorsCheck.client = 'Client is required'
        }

        if(productsInOrder.length < 1){
          errorsCheck.products = 'Cart cannot by empty'
        }

        if(Object.keys(errorsCheck).length > 0){
          setErrors(errorsCheck)
        }else{
          setErrors({})
        }
  
        if(Object.keys(errorsCheck).length === 0){

        const order = {
            id: orderId,
            total: totalPrice(productsInOrder),
            table: !delivery ? table.value : null,
            client: client.value,
            products: productsInOrder,
            delivery: delivery,
            note: note
        }
        
        dispatch(updateOrder(order))
        
        }

    }

      //get order total price 
    const totalPrice = (productsIn) => {
        return productsIn.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)
      }
  
      //get all order items
      const totalItems = (productsIn) => {
        return productsIn.reduce((acc, item) => acc + item.quantity, 0)
      }

      //add product to order
    const addProduct = (e, product) => {
        e.preventDefault()
  
        //product object
          const productIn = {
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            quantity: 1
          }
          //if is already in order
          if(!inOrder(productIn, productsInOrder)){
            setProductsInOrder([...productsInOrder, productIn])
          }else{
            alert('Product already in order')
          }
  
      }
  
      //remove product from order
      const removeProduct = (e, product) => {
        e.preventDefault()
  
      //remove product
        
        const productsIn = productsInOrder.filter(function (item) {
          return item.id !== product.id;
        })


        const setDeletedProduct = productsInOrderOld.map(productDeleted => {
          if(product.id === productDeleted.id){
            productDeleted.deleted = true
          }
          return productDeleted
        })

        setProductsInOrderOld(setDeletedProduct)

  /*       products.map(productInList => {
          if(productInList.id === product.id){
            productInList.stock = productInList.stock + product.oldQuantity
          }
        }) */
  
        setProductsInOrder(productsIn)
      }
  
      //increase product quantiity
      const addUnit = (e, product) => {
        e.preventDefault()
  
        const newProducts = productsInOrder.map(el => (el.id === product.id ? {...el, quantity:el.quantity+1} : el))
        setProductsInOrder(newProducts)
  
      }
  
      //decrease product quantity
      const removeUnit = (e, product) =>{
        e.preventDefault()
  
        const newProducts = productsInOrder.map(el => (el.id === product.id ? {...el, quantity:el.quantity-1} : el))
        setProductsInOrder(newProducts)
  
      }

      //refresh products table
   /*  const refreshProducts = (e) => {
        e.preventDefault()
        dispatch(listProducts(keyword,pageNumber))
      }
   */
      //refresh product in order
      const refreshProductsInOrder = (e) => {
        e.preventDefault()
        let newProducts = productsInOrder
        for (let index = 0; index < products.length; index++) {
          newProducts = newProducts.map(el => (el.id === products[index].id ? {...el, stock:products[index].stock} : el))
        }
        setProductsInOrder(newProducts)
      }
  
      //check if product is already in order
      const inOrder = (obj, list) => {
        for (let index = 0; index < list.length; index++) {
          if (obj.id === list[index].id){
            return true
          }
        }
        return false
      }

      const returnProduct = (obj, list) => {
        for (let index = 0; index < list.length; index++) {
          if (obj.id === list[index].id){
            return list[index]
          }
        }
        return false
      }
  
      const mapSelect = (data) => {
        const mapped = data.map(table => ({ label: table.name, value: table.id}))
        return mapped
      }

      const setDeletedState = (list) => {
        return list.map(item => {
          return {...item, deleted: false}
        })
      }

      const mapProducts = (list) => {
        const mappedProducts = list.map(product => {

        const productIn = returnProduct(product, productsInOrderOld)
        if(productIn){

          if(productIn.deleted){
            product.stock = productIn.stock + productIn.quantity
          }
      
        }
          return product
        })

        return mappedProducts
      }
  
  
    
    return ( 
        <>  
  {/* Content Header (Page header) */}
  <HeaderContent name={'Orders'}/>

  {/* Main content */}
  <section className="content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
        <Link to='/order' className='btn btn-info'>
                Go Back
        </Link>
        
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Create Order</h3>
              <Loader variable={loadingUpdate} />
              <Message message={errorUpdate} color={'danger'}/>
              <Loader variable={loading} />
              <Message message={error} color={'danger'}/>

            </div>
            {/* /.card-header */}
            <div className="card-body">
        
            <div className='row'>
              <div className='col-12 col-lg-6'> 
                  <Route render={({history}) => <SearchBoxMini history={history} item={`order/${orderId}/edit`}/>} />
              
              {loadingProductList 
                      ? 
                      <Loader variable={loadingProductList} /> 
                      : errorProductList
                      ? 
                      <Message message={errorProductList} color={'danger'} />
                      : (
                      <>
                      <table id="productsTable" className="table table-bordered table-hover">
                        <thead style={{color:'#fff'}} className='bg-info'>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                            {mapProducts(products).map(product => (
                              <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.stock}</td>
                                {inOrder(product, productsInOrder)
                                ? <td className='text-center'><button disabled className='btn btn-primary'>In Order</button></td>
                                : product.stock > 0 
                                ?<td className='text-center'><button  className='btn btn-success' onClick={(e) => addProduct(e,product)}><i class="fas fa-plus"></i></button></td>
                                : <td className='text-center'><button disabled className='btn btn-danger'>Out of Stock</button></td>
                                }
                              </tr>
                            ))}

                        </tbody>

                      </table>
                      
                      <Paginate 
                            item={`order/${orderId}/edit`}
                            pages={pages} 
                            page={page} 
                            keyword={keyword ? keyword : null} />
                      </>
                )}
              </div>
              <div className='col-12 col-lg-6'>
              {/* small card */}
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>TOTAL ${productsInOrder.length > 0 ? totalPrice(productsInOrder) : 0}</h3>
                  <p>{productsInOrder.length > 0 ? totalItems(productsInOrder) : 0 } Items in Order</p>
                </div>
                <div className="icon">
                  <i className="fas fa-shopping-cart" />
                </div>

              </div>

                <form onSubmit={handleSubmit}>
                {errors.products && <Message message={errors.products} color={'warning'} />}
                <table id="orderTable" className="table table-bordered table-hover table-responsive p-0">
                  <thead >
                    <tr>
                    <th className='d-sm-table-cell'></th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th></th>
                    <th></th>
                    <th>Total</th>
                    <th></th>

                    </tr>
                  </thead>
                  <tbody>
                    {productsInOrder.length > 0? (
                    productsInOrder.map((productIn, i) => (
                      <tr key={i}>
                        <td className='text-center d-sm-table-cell'><button onClick={(e) => refreshProductsInOrder(e)}><i className="fas fa-sync-alt btn-xs"></i></button></td>
                        <td>{productIn.name}</td>
                        <td>{productIn.quantity}</td>
                        <td className='text-center'>
                          <button disabled={productIn.quantity < 2} className='btn btn-danger btn-block' onClick={(e) => removeUnit(e,productIn)} >-</button> 
                        </td>
                        <td className='text-center'>
                          <button disabled={productIn.quantity >= returnProduct(productIn,products).stock + (productIn.oldQuantity ? productIn.oldQuantity : 0)} className='btn btn-primary btn-block' onClick={(e) => addUnit(e,productIn)}>+</button>
                        </td>
                        <td className='text-center'><h4>${productIn.price * productIn.quantity}</h4></td>
                        <td className='text-center'><button className='btn btn-danger' onClick={(e) => removeProduct(e,productIn)}>X</button></td>
                      </tr>
                    ))
                    ) : <tr></tr>}
                  </tbody>
                
                </table>
                <div className="form-row">


                  

                  <div className="form-group col-md-6">
                  <label htmlFor="client">Client</label>
                  {loadingAllClients
                  ? <Loader variable={loadingAllClients} />
                  : errorAllClients
                  ? <Message message={errorAllClients} color={'danger'}/>
                  : (
                      <Select 
                        id='client'
                        options={mapSelect(clients)}
                        onChange={setClient}
                        placeholder='Select client'
                        isSearchable
                        value={client}
                      />
                      )}
                  {errors.client && <Message message={errors.client} color={'warning'} />}
                  </div>

                  <div className="form-group col-md-6">
                  <label htmlFor="table">Table</label>
                  {loadingAllTables
                  ? <Loader variable={loadingAllTables} />
                  : errorAllTables
                  ? <Message message={errorAllTables} color={'danger'}/>
                  : (
                      <Select
                        id='table' 
                        options={mapSelect(tables)}
                        onChange={setTable}
                        isDisabled={delivery}
                        value={table}
                        placeholder='Select table'
                        isSearchable
                      />
                      )}
                  {errors.table && <Message message={errors.table} color={'warning'} />}
                  </div>

                  

                </div>

                <Textarea title={'Note (optional)'} rows={3} data={note} setData={setNote} />
                <div className="col-sm-6">
                  <Checkbox name={'delivery'} data={delivery} setData={setDelivery} />
                </div>


                

                  <hr/>
                  <button type="submit" className="btn btn-success float-right ">Submit</button>
                </form>
              </div>

            </div>


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
 
export default OrderEditScreen;