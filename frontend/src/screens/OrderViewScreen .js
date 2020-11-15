import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import HeaderContent from '../components/HeaderContent';
import { listOrderDetails, updateOrderToPaid } from '../actions/orderActions';
import { ORDER_UPDATE_RESET } from '../constants/orderConstants';
import ButtonGoBack from '../components/ButtonGoBack';
import ViewBox from './../components/ViewBox';




const OrderViewScreen = ({history, match}) => {

    const orderId = parseInt(match.params.id)

    const [table, setTable] = useState({})
    const [client, setClient] = useState({})
    const [delivery, setDelivery] = useState(false)
    const [user, setUser] = useState({})
    const [productsInOrder, setProductsInOrder] = useState([])
    const [isPaid, setIsPaid] = useState(false)
    const [total, setTotal] = useState(0)
    const [note, setNote] = useState('')

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
            setNote(order.note)
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
    },[dispatch, history, error, orderId, order, successUpdate])


    const handlePay = (e) => {
      e.preventDefault()

      const updatedOrder = {
        id: orderId,
        total: totalPrice(productsInOrder),
        client: client.id,
        table: table ? table.id : null,
        products: productsInOrder,
        delivery: delivery
      }

      dispatch(updateOrderToPaid(updatedOrder))
    }

    const handleEdit = (e) => {
      e.preventDefault()
      history.push(`/order/${orderId}/edit`)
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
        <ButtonGoBack link={'order'} />
        
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
                    <ViewBox title={order.id} paragraph={'ORDER ID'} icon={'far fa-clipboard'} color={'bg-info'} />
                  </div>

                  {order.isPaid 
                  ?(
                    <div className='col-12 col-md-6'>
                      <ViewBox title={'Paid'} paragraph={'Order is already paid'} icon={'fas fa-check'} color={'bg-success'} />
                    </div>
                  )
                  :(
                    <div className='col-12 col-md-6'>
                      <ViewBox title={'Not Paid'} paragraph={'Order is still not paid'} icon={'far fa-times-circle'} color={'bg-danger'} />
                    </div>
                  )
                  
                  }

                  <div className='col-12 col-md-6'>
                    <ViewBox title={client.name} paragraph={`ID: ${client.id}`} icon={'fas fa-user'} color={'bg-info'} />
                  </div>

                  {table 
                  ? (
                  <div className='col-12 col-md-6'>
                    <ViewBox title={table.name} paragraph={`ID: ${table.id}`} icon={'fas fa-utensils'} color={'bg-info'} />
                  </div>
                  ) 
                  : (
                  <div className='col-12 col-md-6'>
                    <ViewBox title={'Delivery'} paragraph={client.address} icon={'fas fa-truck'} color={'bg-primary'} />
                  </div>
                  )}

                </div>


                <div className='col-12'>
                    <ViewBox title={'Note:'} paragraph={note} icon={'far fa-sticky-note'} color={'bg-silver'} />
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
      <div className='row justify-content-between'>
        <div className='col-12 col-md-3'>
        {!order.isPaid
            ? (
              <div className='card'>
                <div className='card-header bg-warning'>
                  Edit Order
                </div>
                <div className='card-body'>
                  <button className='btn btn-block' onClick={(e) => handleEdit(e)}>
                    <ViewBox title={`Edit Order`} paragraph={`Click to Edit`} icon={'fas fa-edit'} color={'bg-warning'} />
                  </button>
                </div>
              </div>
            ) 
          : ''}
        </div>
        <div className='col-12 col-md-3'>
            {!order.isPaid
            ? (
              <div className='card'>
                <div className='card-header bg-success'>
                  Update to Paid
                </div>
                <div className='card-body'>
                  <button className='btn btn-block' onClick={(e) => handlePay(e)}>
                    <ViewBox title={`PAY $${productsInOrder.length > 0 ? totalPrice(productsInOrder) : 0}`} paragraph={`Click to Pay`} icon={'fas fa-hand-holding-usd'} color={'bg-success'} />
                  </button>
                </div>
              </div>
            ) 
          : ''}
        </div>
      </div>
    </div>
    {/* /.container-fluid */}
  </section>


        </>
        
     );
}
 
export default OrderViewScreen;