import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import SignInScreen from './screens/SignInScreen';

import Main from './Main';

const App = () => {

   

  return ( 
    
  <Router>
   <Switch>
      <Route path='/sign-in' component={SignInScreen} />
      <Route path='/' component={Main} />
   </Switch>

 
     
      

  </Router>
   );
}
 
export default App;

