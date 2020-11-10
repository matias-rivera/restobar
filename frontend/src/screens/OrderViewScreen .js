import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import HeaderContent from '../components/HeaderContent';
import { listOrderDetails, updateOrder } from '../actions/orderActions';
import { ORDER_UPDATE_RESET } from '../constants/orderConstants';




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

    



    useEffect( () => {

      if(successUpdate){
          dispatch({type: ORDER_UPDATE_RESET})
          if(delivery){
            history.push('/delivery')
          }else{
            history.push('/active')
          }
      }
      else{
        
        //load client data
        if(!order.id || order.id !== orderId) {
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
      }
    },[dispatch, history, keyword, pageNumber, error, orderId, order, successUpdate])


    const handlePay = (e) => {
      e.preventDefault()

      const updatedOrder = {
        id: orderId,
        total: totalPrice(productsInOrder),
        client: client.id,
        table: !delivery ? table.id : null,
        products: productsInOrder,
        delivery: delivery
      }

      dispatch(updateOrder(updatedOrder))
    }


    //get order total price 
    const totalPrice = (productsIn) => {
      return productsIn.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)
    }

    //get all order items
    const totalItems = (productsIn) => {
      return productsIn.reduce((acc, item) => acc + item.quantity, 0)
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
        <Link to={delivery ? '/delivery' : '/active'} className='btn btn-info btn-lg mb-2'>
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
              <div className='col-12 col-md-6'>
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

                <table id="orderTable" className="table table-bordered table-hover table-striped text-center table-overflow" >
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody >
                    {productsInOrder.length > 0? (
                    productsInOrder.map((productIn, i) => (
                      <tr key={i}>
                        <td><h5>{productIn.name}</h5></td>
                        <td><h4><span className='badge bg-primary'>{productIn.quantity}</span></h4></td>
                        <td><h4><span className='badge bg-info'>${productIn.price}</span></h4></td>
                        <td className='text-center'><h4><span className={'badge bg-success'} >${productIn.price * productIn.quantity} </span></h4></td>
                      </tr>
                    ))
                    ) : 'Add products'}
                  </tbody>
                
                </table>

      

              </div>

              <div className='col-12 col-md-6'> 

                <div className='row'>
                  <div className='col-12 col-md-6'>
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
                  <div className='col-12 col-md-6'>
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
                  <div className='col-12 col-md-6'>
                    <div className="small-box bg-danger">
                      <div className="inner">
                        <h3>Delivery</h3>
                        <p>{client.address}</p>
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
        <div className='col-12 col-md-9'>

        </div>
        <div className='col-12 col-md-3'>
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