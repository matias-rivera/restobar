import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Input from '../components/form/Input';
import HeaderContent from '../components/HeaderContent';
import { listProducts } from '../actions/productActions';
import SearchBox from '../components/SearchBox';
import Paginate from '../components/Paginate';
import Select from 'react-select'
import {  allFreeTables } from '../actions/tableActions';
import { allClients } from '../actions/clientActions';
import { createOrder, listOrderDetails, updateOrder } from '../actions/orderActions';
import { PRODUCT_LIST_RESET } from '../constants/productConstants';
import { TABLE_ALL_FREE_RESET } from '../constants/tableConstants';
import { CLIENT_ALL_RESET } from '../constants/clientConstants';
import { ORDER_CREATE_RESET, ORDER_UPDATE_RESET } from '../constants/orderConstants';




const OrderViewScreen = ({history, match}) => {

    const orderId = parseInt(match.params.id)


    const keyword = match.params.keyword || ''
    const pageNumber = match.params.pageNumber || 1

    const [table, setTable] = useState({})
    const [client, setClient] = useState({})
    const [delivery, setDelivery] = useState(false)
    const [user, setUser] = useState({})
    const [productsInOrder, setProductsInOrder] = useState([])
    const [isPaid, setIsPaid] = useState(false)
    const [total, setTotal] = useState(0)

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
          dispatch({type: PRODUCT_LIST_RESET})
          dispatch({type: TABLE_ALL_FREE_RESET}) 
          dispatch({type: CLIENT_ALL_RESET})
          dispatch({type: ORDER_UPDATE_RESET})
          history.push('/active')
      }
      else{
        
        //load client data
        if(!order.total || order.id !== orderId) {
            dispatch(listOrderDetails(orderId))
        } else{
            //set states
            if(!delivery){
              setTable(order.table)
            }
            setClient(order.client)
            setUser(order.user)
            setIsPaid(order.isPaid)
            setDelivery(order.delivery)
            setTotal(order.total)
            const products = order.products.map(product => {
              return   {
                id: product.id,
                name: product.name,
                price: product.price,
                stock: product.stock,
                quantity: product.orderItem.quantity
              } 
            })
            setProductsInOrder(products)

        }
        dispatch(listProducts(keyword,pageNumber))
        dispatch(allFreeTables())
        dispatch(allClients())
      }
    },[dispatch, history, keyword, pageNumber, error, orderId, order, successUpdate])


    const handlePay = (e) => {
      e.preventDefault()

      const updatedOrder = {
        id: orderId,
        total: totalPrice(productsInOrder),
        client: client.id,
        table: table.id,
        products: productsInOrder,
        delivery: delivery
      }

      dispatch(updateOrder(updatedOrder))
    }
    const handleSubmit = (e) => {
        e.preventDefault()

      /*   const order = {
          total: totalPrice(productsInOrder),
          client: client.value,
          table: table.value,
          products: productsInOrder,
          delivery: delivery
        }
        
        console.log(order)
        
        dispatch(createOrder(order)) */


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

    //get order total price 
    const totalPrice = (productsIn) => {
      return productsIn.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)
    }

    //get all order items
    const totalItems = (productsIn) => {
      return productsIn.reduce((acc, item) => acc + item.quantity, 0)
    }

    //refresh products table
    const refreshProducts = (e) => {
      e.preventDefault()
      dispatch(listProducts(keyword,pageNumber))
    }

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

    const mapSelect = (data) => {
      const mapped = data.map(table => ({ label: table.name, value: table.id}))
      return mapped
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
              <h3 className="card-title">View Order</h3>
              <Loader variable={loading} />
              <Message message={error} color={'danger'}/>

            </div>
            {/* /.card-header */}
            <div className="card-body">
        
            <div className='row'>
              <div className='col-6'>
              {/* small card */}
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>TOTAL ${productsInOrder.length > 0 ? totalPrice(productsInOrder) : 0}</h3>
                  <p>{productsInOrder.length > 0 ? totalItems(productsInOrder) : 0 } Items in Order</p>
                </div>
                <div className="icon">
                  <i className="fas fa-shopping-cart" />
                </div>

              </div>

                <table id="orderTable" className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productsInOrder.length > 0? (
                    productsInOrder.map((productIn, i) => (
                      <tr key={i}>
                        <td>{productIn.name}</td>
                        <td>{productIn.quantity}</td>

                        <td className='text-center'><h4>${productIn.price * productIn.quantity}</h4></td>
                      </tr>
                    ))
                    ) : 'Add products'}
                  </tbody>
                
                </table>

      

              </div>

              <div className='col-6'> 

                <div className='row'>
                  <div className='col-6'>
                    <div className="small-box bg-primary">
                      <div className="inner">
                        <h3>{client.name}</h3>
                        <p>ID: {client.id } </p>
                      </div>
                      <div className="icon">
                        <i className="fas fa-user" />
                      </div>
                    </div>
                  </div>

                  {table 
                  ? (
                  <div className='col-6'>
                    <div className="small-box bg-danger">
                      <div className="inner">
                        <h3>{table.name}</h3>
                        <p>ID: {table.id } </p>
                      </div>
                      <div className="icon">
                        <i className="fas fa-utensils" />
                      </div>
                    </div>
                  </div>
                  ) 
                  : (
                  <div className='col-6'>
                    <div className="small-box bg-danger">
                      <div className="inner">
                        <h3>Delivery</h3>
                        <p>To deliver</p>
                      </div>
                      <div className="icon">
                        <i className="fas fa-truck" />
                      </div>
                    </div>
                  </div>
                  )}
                  
                  


                </div>

                
    
              </div>

            </div>


            </div>
            {/* /.card-body */}
          </div>

        </div>
        {/* /.col */}
      </div>
      {/* /.row */}
      <div className='row'>
        <div className='col-9'>

        </div>
        <div className='col-3'>
          <div className='card'>
            <div className='card-header bg-success'>
              Update to Paid
            </div>
            <div className='card-body'>
              <button className='btn btn-block' onClick={(e) => handlePay(e)}>
                <div className="small-box bg-success">
                    <div className="inner">
                      <h3 className='text-left'>PAY ${productsInOrder.length > 0 ? totalPrice(productsInOrder) : 0}</h3>
                      <p className='text-center'>Click to Pay</p>
                    </div>
                    <div className="icon" >
                    <i class="fas fa-hand-holding-usd"></i>
                    </div>
                </div>
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
    {/* /.container-fluid */}
  </section>


        </>
        
     );
}
 
export default OrderViewScreen;