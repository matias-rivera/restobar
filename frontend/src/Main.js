import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Menu from './components/Menu';
import Footer from './components/Footer';
import OrderScreen from './screens/OrderScreen';
import TableScreen from './screens/TableScreen';
import ProductScreen from './screens/ProductScreen';
import ClientScreen from './screens/ClientScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import CategoryScreen from './screens/CategoryScreen';

import UserScreen from './screens/UserScreen';
import DashboardScreen from './screens/DashboardScreen';
import UserEditScreen from './screens/UserEditScreen';
import CategoryEditScreen from './screens/CategoryEditScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import TableEditScreen from './screens/TableEditScreen';
import ClientEditScreen from './screens/ClientEditScreen';
import OrderCreateScreen from './screens/OrderCreateScreen';
import ActiveOrdersScreen from './screens/ActiveOrdersScreen';
import OrderViewScreen from './screens/OrderViewScreen ';
import OrderEditScreen from './screens/OrderEditScreen';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoute from './auth/PrivateRoute';
import NotFoundScreen from './screens/NotFoundScreen';
import AdminRoute from './auth/AdminRoute';
import NotAuthorizedScreen from './screens/NotAuthorizedScreen';
import ProfileScreen from './screens/ProfileScreen';


const Main = ({history}) => {

    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    return ( 
<>
        <Header/>
        <Menu/>
            
            <div className='content-wrapper'>
            <Switch>

                <PrivateRoute path='/active' exact component={ActiveOrdersScreen} />
                <PrivateRoute path='/profile' component={ProfileScreen} />
                 {/* <Route path='/active' exact component={ActiveOrdersScreen} />  */}
                <AdminRoute path='/user/:id/edit' component={UserEditScreen}/>
                <AdminRoute path='/user/page/:pageNumber' component={UserScreen} exact/>
                <AdminRoute path='/user/search/:keyword' component={UserScreen} exact/>
                <AdminRoute path='/user/search/:keyword/page/:pageNumber' component={UserScreen} exact/>
                <AdminRoute path='/user' exact component={UserScreen} />

                <PrivateRoute path='/category/:id/edit' component={CategoryEditScreen}/>
                <PrivateRoute path='/category/page/:pageNumber' component={CategoryScreen} exact/>
                <PrivateRoute path='/category/search/:keyword' component={CategoryScreen} exact/>
                <PrivateRoute path='/category/search/:keyword/page/:pageNumber' component={CategoryScreen} exact/>
                <PrivateRoute path='/category' component={CategoryScreen} />


                <PrivateRoute path='/delivery/page/:pageNumber' component={DeliveryScreen} exact/>
                <PrivateRoute path='/delivery/search/:keyword' component={DeliveryScreen} exact/>
                <PrivateRoute path='/delivery/search/:keyword/page/:pageNumber' component={DeliveryScreen} exact/>
                <PrivateRoute path='/delivery' component={DeliveryScreen} />

                <PrivateRoute path='/client/:id/edit' component={ClientEditScreen}/>
                <PrivateRoute path='/client/page/:pageNumber' component={ClientScreen} exact/>
                <PrivateRoute path='/client/search/:keyword' component={ClientScreen} exact/>
                <PrivateRoute path='/client/search/:keyword/page/:pageNumber' component={ClientScreen} exact/>
                <PrivateRoute path='/client' component={ClientScreen} />

                <PrivateRoute path='/product/:id/edit' component={ProductEditScreen}/>
                <PrivateRoute path='/product/page/:pageNumber' component={ProductScreen} exact/>
                <PrivateRoute path='/product/search/:keyword' component={ProductScreen} exact/>
                <PrivateRoute path='/product/search/:keyword/page/:pageNumber' component={ProductScreen} exact/>
                <PrivateRoute path='/product' component={ProductScreen} />

                <PrivateRoute path='/table/:id/edit' component={TableEditScreen}/>
                <PrivateRoute path='/table/page/:pageNumber' component={TableScreen} exact/>
                <PrivateRoute path='/table/search/:keyword' component={TableScreen} exact/>
                <PrivateRoute path='/table/search/:keyword/page/:pageNumber' component={TableScreen} exact/>
                <PrivateRoute path='/table' component={TableScreen} />

                <PrivateRoute path='/order/page/:pageNumber' component={OrderScreen} exact/>
                <PrivateRoute path='/order/search/:keyword' component={OrderScreen} exact/>
                <PrivateRoute path='/order/search/:keyword/page/:pageNumber' component={OrderScreen} exact/>

                <PrivateRoute path='/order/create/:id/:table/table' component={OrderCreateScreen} />
                <PrivateRoute path='/order/create/page/:pageNumber' component={OrderCreateScreen} />
                <PrivateRoute path='/order/create/search/:keyword' component={OrderCreateScreen} />
                <PrivateRoute path='/order/create/search/:keyword/page/:pageNumber' component={OrderCreateScreen} />

                <PrivateRoute path='/order/:id/edit/page/:pageNumber' component={OrderEditScreen} exact/>
                <PrivateRoute path='/order/:id/edit/search/:keyword' component={OrderEditScreen} exact/>
                <PrivateRoute path='/order/:id/edit/search/:keyword/page/:pageNumber' component={OrderEditScreen} exact/>
                <PrivateRoute path='/order/:id/edit' component={OrderEditScreen} exact/>


                <PrivateRoute path='/order/:id/view' component={OrderViewScreen} exact/>
                <PrivateRoute path='/order/create' component={OrderCreateScreen} />
                <PrivateRoute path='/order' component={OrderScreen} />
                <PrivateRoute path='/not-authorized' component={NotAuthorizedScreen} />
                <PrivateRoute path='/' component={DashboardScreen} />
                <Route component={NotFoundScreen} />
                
            </Switch>

  
                
            </div>
            <Footer/>     

 </>

     );
}
 
export default Main;