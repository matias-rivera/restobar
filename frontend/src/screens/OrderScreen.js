import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paginate from './../components/Paginate';
import SearchBox from './../components/SearchBox';
import TableCrud from './../components/TableCrud';
import Loader from './../components/Loader';
import Message from './../components/Message';
import { Route, Link } from 'react-router-dom';
import HeaderContent from '../components/HeaderContent';
import { listOrders } from '../actions/orderActions';



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
                <Route render={({history}) => <SearchBox history={history} item={'order'}/>} />

                
                <div className="card ">
                    <div className="card-header">
                    <h3 className="card-title">Orders</h3>

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
                    <TableCrud  data={orders} itemLink={'order'}/>
                    
                    <Paginate 
                            item={'order'}
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
 
export default OrderScreen;