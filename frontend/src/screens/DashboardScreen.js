import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderContent from './../components/HeaderContent';
import SmallBox from './../components/SmallBox';
import { Link } from 'react-router-dom';
import { allFreeTables } from '../actions/tableActions';
import Loader from '../components/Loader';
import Message from './../components/Message';
import { allActiveOrders } from './../actions/orderActions';
import DeliveryListItem from '../components/DeliveryListItem';

const DashboardScreen = ({history}) => {


    const dispatch = useDispatch()


    //user state
    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    //tables list state
    const tableAllFree = useSelector((state) => state.tableAllFree)
    const {loading:loadingFree, error:errorFree, tables: tablesFree} = tableAllFree

    //all orders
    const orderAllActive = useSelector((state) => state.orderAllActive)
    const {loading:loadingAllOrders, error:errorAllOrders, orders: allOrders} = orderAllActive


    useEffect(() => {
        dispatch(allFreeTables())
        dispatch(allActiveOrders())
    }, [dispatch, history, userInfo])


    //get all in place orders
    const ordersInPlace = (orders) => {

        const ordersInPlace = orders.filter(function (item) {
            return item.delivery === false;
          })
        
        return ordersInPlace
    }

    //get all delivery orders
    const ordersForDelivery = (orders) => {

        const ordersForDelivery = orders.filter(function (item) {
            return item.delivery === true;
          })
        
        return ordersForDelivery
    }

    //table row click from in place orders
    const handleRowClick = (e,id) => {
        e.preventDefault();
        history.push(`/order/${id}/view`)
    }

    return ( 
    <>
    <HeaderContent name={'Dashboard'} />

         <section className="content">
            <div className="container-fluid">
                <div className="row">

                        {loadingFree
                        ? 
                        <Loader variable={loadingFree} /> 
                        : errorFree
                        ? 
                        <Message message={errorFree} color={'danger'} />
                        : (
                            <SmallBox 
                                number={tablesFree.length} 
                                paragraph={'Free tables'} 
                                link={'active'} 
                                color={'success'}
                                icon={'fas fa-utensils'}
                            />
                            )
                        }

                    {loadingAllOrders
                    ? <Loader variable={loadingAllOrders} />
                    : errorAllOrders
                    ? <Message message={errorAllOrders} color={'danger'} />
                    :(
                    <>
                        <SmallBox 
                            number={ordersInPlace(allOrders).length} 
                            paragraph={'In Place Orders'} 
                            link={'active'} 
                            color={'info'}
                            icon={'fas fa-users'}
                        />
                        <SmallBox 
                            number={ordersForDelivery(allOrders).length} 
                            paragraph={'Orders for delivery'} 
                            link={'delivery'} 
                            color={'danger'}
                            icon={'fas fa-truck'}
                        />
                        <SmallBox 
                            number={allOrders.length} 
                            paragraph={'Active orders'} 
                            link={'order'} 
                            color={'warning'}
                            icon={'ion ion-bag'}
                        />
                    </>
                    )}
                    
                </div>
                <div className='row'>
                    <div className='col-12 col-md-9'>
                        <div className="card">
                            <div className="card-header border-transparent">
                                <h3 className="card-title">Latest In Place Orders</h3>
                                <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                    <i className="fas fa-minus" />
                                </button>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                <table className="table m-0 table-hover">
                                    <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Client</th>
                                        <th>Table</th>
                                        <th>Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                       
                                            {ordersInPlace(allOrders).splice(0,5).map(order => (
                                                <tr key={order.id} onClick={(e) => handleRowClick(e,order.id)} style={{cursor:'pointer'}}>
                                                        <td><h4><span className={'badge bg-primary'}>{order.id} </span></h4></td>
                                                        <td>{order.client ? order.client.name : ''}</td>
                                                        <td>{order.table ? order.table.name : ''}</td>
                                                        <td><h4><span className={'badge bg-success'} >${order.total} </span></h4></td>
                                                </tr>
                                            ))}
  
                                    </tbody>
                                </table>
                                </div>
                            </div>
                            <div className="card-footer clearfix">
                                <Link to={'/order/create'} className="btn btn-sm btn-info float-left">Place New Order</Link>
                                <Link to={'/order'} className="btn btn-sm btn-secondary float-right">View All Orders</Link>
                            </div>
                            </div>

                        </div>
                    <div className='col-12 col-md-3'>
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Recently Added Delivery Orders</h3>
                                <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                    <i className="fas fa-minus" />
                                </button>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <ul className="products-list product-list-in-card pl-2 pr-2">
                                

                                {
                                    ordersForDelivery(allOrders).splice(0,5).map(order => (
                                        <DeliveryListItem
                                            id={order.id} 
                                            name={order.client ? order.client.name : ''}  
                                            address={order.client ? order.client.address: ''}
                                            key={order.id}
                                        />
                                    ))
                                    
                                }

                                </ul>
                            </div>
                            <div className="card-footer text-center">
                                <Link to={'/delivery'} className="uppercase">View All Delivery Orders</Link>
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
 
export default DashboardScreen;