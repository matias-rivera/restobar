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


const Main = () => {

    
    return ( 
<>
        <Header/>
        <Menu/>
            
            <div className='content-wrapper'>
   
                <Route path='/user/:id/edit' component={UserEditScreen}/>
                <Route path='/user' exact component={UserScreen} />
                <Route path='/category' component={CategoryScreen} />
                <Route path='/delivery' component={DeliveryScreen} />
                <Route path='/client' component={ClientScreen} />
                <Route path='/product' component={ProductScreen} />
                <Route path='/table' component={TableScreen} />
                <Route path='/order' component={OrderScreen} />
                <Route path='/' component={DashboardScreen} exact/>


  
                
            </div>
            <Footer/>     

 </>

     );
}
 
export default Main;