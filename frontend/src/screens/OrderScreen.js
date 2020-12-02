import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paginate from './../components/Paginate';
import Loader from './../components/Loader';
import Message from './../components/Message';
import { Route, Link } from 'react-router-dom';
import HeaderContent from '../components/HeaderContent';
import { listOrders } from '../actions/orderActions';
import SearchBoxMini from './../components/SearchBoxMini';
import DataTableLoader from '../components/loader/DataTableLoader';



const OrderScreen = ({history, match}) => {

    const keyword = match.params.keyword || ''
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const orderList = useSelector((state) => state.orderList)
    const {loading, error, orders, page, pages} = orderList

    useEffect(() => {
        dispatch(listOrders(keyword,pageNumber))
    }, [dispatch, history, userInfo, pageNumber, keyword])

    return ( 
        <>
            <HeaderContent name={'Orders'} />

            <section className="content">
            <div className="container-fluid">
            <div className="row">
                <div className="col-12">

                    <Link to='/order/create'>
                    <button className='btn btn-success btn-lg'><i className="fas fa-edit" /> New Order</button>
                    </Link>
                <hr />
                
                <div className="card ">
                    <div className="card-header">
                        <h3 className="card-title">All orders</h3>
                        <div className="card-tools">
                            <Route render={({history}) => <SearchBoxMini history={history} item={'order'}/>} />
                        </div>

                    </div>
                    {/* /.card-header */}
                    <div className="card-body table-responsive p-0">
                    {loading 
                    ? 
                    <DataTableLoader /> 
                    : error 
                    ? 
                    <Message message={error} color={'danger'} />
                    : (
                        <table className="table table-hover text-nowrap">
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Client</th>
                            <th className="d-none d-sm-table-cell">Table</th>
                            
                            <th>Paid</th>
                            <th>Total</th>
                            <th></th>
                            </tr>
                        </thead>
                                                    <tbody>
                        
                        {orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.client.name}</td>
                                    <td className="d-none d-sm-table-cell">
                                        <h4>
                                            {order.table 
                                            ? <span className={'badge bg-primary'}>{order.table.name}</span> 
                                            : <span className={'badge bg-info'}>DELIVERY</span>}    
                                        </h4>
                                    </td>
                                    <td>{order.isPaid ? <h4 className='text-success'><i class="fas fa-check"></i></h4> : <h4 className='text-danger'><i class="far fa-times-circle"></i></h4>}</td>
                                    <td className="d-none d-sm-table-cell">
                                        <h4>
                                            <span className={'badge bg-success'}>${order.total}</span> 
                                        </h4>
                                    </td>
                                    <td><Link to={`/order/${order.id}/view`} className='btn btn-info btn-lg'>View</Link></td>
                                </tr>
                            ))}
                                        
                        </tbody>
                        </table>
                    )}
                    </div>
                    {/* /.card-body */}
                </div>

                    <Paginate 
                            item={'order'}
                            pages={pages} 
                            page={page} 
                            keyword={keyword ? keyword : null} />
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
 
export default OrderScreen;