import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Content from './components/Content';
import OrderScreen from './screens/OrderScreen';
import TableScreen from './screens/TableScreen';
import ProductScreen from './screens/ProductScreen';
import ClientScreen from './screens/ClientScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import CategoryScreen from './screens/CategoryScreen';
import UserScreen from './screens/UserScreen';


function App() {
  return (
    <Router>
      <Header />
      <Menu />
      <div className='content-wrapper'>
        <Route path='/admin/user' component={UserScreen} />
        <Route path='/category' component={CategoryScreen} />
        <Route path='/delivery' component={DeliveryScreen} />
        <Route path='/client' component={ClientScreen} />
        <Route path='/product' component={ProductScreen} />
        <Route path='/table' component={TableScreen} />
        <Route path='/order' component={OrderScreen} />
        <Route path='/' component={Content} exact />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
