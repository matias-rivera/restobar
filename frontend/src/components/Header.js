import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
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
                {/* Messages Dropdown Menu */}
           
                {/* Notifications Dropdown Menu */}
                <li className="nav-item dropdown">
                <a className="nav-link" data-toggle="dropdown" href="/">
                    <i className="far fa-bell" />
                    <span className="badge badge-warning navbar-badge">15</span>
                </a>
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                    <span className="dropdown-item dropdown-header">15 Notifications</span>
                    <div className="dropdown-divider" />
                    <a href="/" className="dropdown-item">
                    <i className="fas fa-envelope mr-2" /> 4 new messages
                    <span className="float-right text-muted text-sm">3 mins</span>
                    </a>
                    <div className="dropdown-divider" />
                    <a href="/" className="dropdown-item">
                    <i className="fas fa-users mr-2" /> 8 friend requests
                    <span className="float-right text-muted text-sm">12 hours</span>
                    </a>
                    <div className="dropdown-divider" />
                    <a href="/" className="dropdown-item">
                    <i className="fas fa-file mr-2" /> 3 new reports
                    <span className="float-right text-muted text-sm">2 days</span>
                    </a>
                    <div className="dropdown-divider" />
                    <a href="/" className="dropdown-item dropdown-footer">See All Notifications</a>
                </div>
                </li>
                
                
                


                <li className="nav-item">
                <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="/" role="button"><i className="fas fa-th-large" /></a>
                </li>
            </ul>
        </nav>
   
     );
}
 
export default Header;