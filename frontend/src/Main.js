import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
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
import OrderEditScreen from './screens/OrderViewScreen ';
import OrderViewScreen from './screens/OrderViewScreen ';


const Main = () => {

    
    return ( 
<>
        <Header/>
        <Menu/>
            
            <div className='content-wrapper'>
            <Switch>

                <Route path='/active' exact component={ActiveOrdersScreen} />

                <Route path='/user/:id/edit' component={UserEditScreen}/>
                <Route path='/user/page/:pageNumber' component={UserScreen} exact/>
                <Route path='/user/search/:keyword' component={UserScreen} exact/>
                <Route path='/user/search/:keyword/page/:pageNumber' component={UserScreen} exact/>
                <Route path='/user' exact component={UserScreen} />

                <Route path='/category/:id/edit' component={CategoryEditScreen}/>
                <Route path='/category/page/:pageNumber' component={CategoryScreen} exact/>
                <Route path='/category/search/:keyword' component={CategoryScreen} exact/>
                <Route path='/category/search/:keyword/page/:pageNumber' component={CategoryScreen} exact/>
                <Route path='/category' component={CategoryScreen} />

                <Route path='/delivery' component={DeliveryScreen} />

                <Route path='/client/:id/edit' component={ClientEditScreen}/>
                <Route path='/client/page/:pageNumber' component={ClientScreen} exact/>
                <Route path='/client/search/:keyword' component={ClientScreen} exact/>
                <Route path='/client/search/:keyword/page/:pageNumber' component={ClientScreen} exact/>
                <Route path='/client' component={ClientScreen} />

                <Route path='/product/:id/edit' component={ProductEditScreen}/>
                <Route path='/product/page/:pageNumber' component={ProductScreen} exact/>
                <Route path='/product/search/:keyword' component={ProductScreen} exact/>
                <Route path='/product/search/:keyword/page/:pageNumber' component={ProductScreen} exact/>
                <Route path='/product' component={ProductScreen} />

                <Route path='/table/:id/edit' component={TableEditScreen}/>
                <Route path='/table/page/:pageNumber' component={TableScreen} exact/>
                <Route path='/table/search/:keyword' component={TableScreen} exact/>
                <Route path='/table/search/:keyword/page/:pageNumber' component={TableScreen} exact/>
                <Route path='/table' component={TableScreen} />

                <Route path='/order/:id/view' component={OrderViewScreen}/>
                <Route path='/order/page/:pageNumber' component={OrderScreen} exact/>
                <Route path='/order/search/:keyword' component={OrderScreen} exact/>
                <Route path='/order/search/:keyword/page/:pageNumber' component={OrderScreen} exact/>
                <Route path='/order/create/page/:pageNumber' component={OrderCreateScreen} />
                <Route path='/order/create/search/:keyword' component={OrderCreateScreen} />
                <Route path='/order/create/search/:keyword/page/:pageNumber' component={OrderCreateScreen} />
                <Route path='/order/create' component={OrderCreateScreen} />
                <Route path='/order' component={OrderScreen} />
                <Route path='/' component={DashboardScreen} exact/>
            </Switch>

  
                
            </div>
            <Footer/>     

 </>

     );
}
 
export default Main;