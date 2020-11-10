import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paginate from './../components/Paginate';
import SearchBox from './../components/SearchBox';
import TableCrud from './../components/TableCrud';
import Loader from './../components/Loader';
import Message from './../components/Message';
import { Route, Link } from 'react-router-dom';
import HeaderContent from '../components/HeaderContent';
import { listDeliveryOrders } from '../actions/orderActions';
import SearchBoxMini from '../components/SearchBoxMini';



const DeliveryScreen = ({history, match}) => {

    const keyword = match.params.keyword || ''
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const orderDeliveryList = useSelector((state) => state.orderDeliveryList)
    const {loading, error, orders, page, pages} = orderDeliveryList

    useEffect(() => {
        dispatch(listDeliveryOrders(keyword,pageNumber))
    }, [dispatch, history, userInfo, pageNumber, keyword])

    return ( 
        <>
            <HeaderContent name={'Delivery'} />

            <section className="content">
            <div className="container-fluid">
            <div className="row">
                <div className="col-12">

                    <Link to='/order/create/delivery'>
                        <button className='btn btn-success btn-lg'><i className="fas fa-truck" /> New Delivery</button>
                    </Link>
                <hr />

                
<div className="card">
  <div className="card-header">
    <h3 className="card-title">Active Delivery orders</h3>
    <div className="card-tools">
        <Route render={({history}) => <SearchBoxMini history={history} item={'delivery'}/>} />
    </div>
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
                        <table className="table table-hover text-nowrap">
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Client</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Check</th>
                            </tr>
                        </thead>
                                                    <tbody>
                        
                        {orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.client.name}</td>
                                    <td>{order.client.address}</td>
                                    <td>{order.client.phone}</td>
                                    <td><Link to={`/order/${order.id}/view`} className='btn btn-info btn-lg'>View</Link></td>
                                </tr>
                            ))}
                                        
                        </tbody>
                        </table>
                    </>
                    )}
          

  </div>
  {/* /.card-body */}
</div>

                    

                    
                    <Paginate 
                            item={'delivery'}
                            pages={pages} 
                            page={page} 
                            keyword={keyword ? keyword : null} 
                    />
                    
                    {/* /.card-body */}
             

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
 
export default DeliveryScreen;