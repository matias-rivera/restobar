import React from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';


const Header = () => {
    
    const dispatch = useDispatch()
    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout())
       
    }
    return ( 
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item">
                <a className="nav-link" data-widget="pushmenu" href="/" role="button"><i className="fas fa-bars" /></a>
                </li>

            </ul>

            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                <span
                    style={{cursor:'pointer'}} 
                    onClick={(e) => handleLogout(e)}
                    className="nav-link" 
                    data-widget="control-sidebar" 
                    data-slide="true"  
                    role="button">
                        <i className="fas fa-power-off"></i> Logout
                </span>
                </li>
            </ul>
        </nav>
   
     );
}
 
export default Header;