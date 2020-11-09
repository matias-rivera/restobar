import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Menu = () => {
    

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    return ( 
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <Link to={'/'} className="brand-link">
            <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
            <span className="brand-text font-weight-light">Restobar</span>
        </Link>
        {/* Sidebar */}
        <div className="sidebar">
            {/* Sidebar user panel (optional) */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
                <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User" />
            </div>
            <div className="info">
                <a href="/" className="d-block">{userInfo.name}</a>
            </div>
            </div>
            {/* Sidebar Menu */}
            <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li className="nav-item has-treeview menu-open">
                <Link to='/' className='btn-link' >
                    <li className="nav-item">
                        <a href="pages/calendar.html" className="nav-link">
                            <i className="nav-icon fas fa-tachometer-alt" /> <p> Dashboard</p> 
                        </a>
                    </li>           
                </Link>
            </li>



               
 


                <li className="nav-header">ADMIN</li>
                <Link to='/user' className='btn-link' >
                    <li className="nav-item">
                        <a href="pages/calendar.html" className="nav-link">
                            <i className="nav-icon fas fa-users" /> <p> Users</p> 
                        </a>
                    </li>           
                </Link>
                <li className="nav-header">RESTOBAR</li>
   
                <Link to='/category' className='btn-link' >
                    <li className="nav-item">
                        <a href="pages/calendar.html" className="nav-link">
                            <i className="nav-icon fa fa-table" /> <p> Categories</p> 
                        </a>
                    </li>           
                </Link>

                <Link to='/product' className='btn-link' >
                    <li className="nav-item">
                        <a href="pages/calendar.html" className="nav-link">
                        
                            <i className="nav-icon fas fa-hamburger" /> <p> Products</p> 
                        </a>
                    </li>           
                </Link>
                
                <Link to='/client' className='btn-link' >
                    <li className="nav-item">
                        <a href="pages/calendar.html" className="nav-link">
                            <i className="nav-icon fas fa-user" /> <p> Clients</p>  
                        </a>
                    </li>           
                </Link>

                <Link to='/order' className='btn-link' >
                    <li className="nav-item">
                        <a href="pages/calendar.html" className="nav-link">
                            <i className="nav-icon fa fa-edit" /> <p> Orders</p>  
                        </a>
                    </li>           
                </Link>

                <Link to='/table' className='btn-link' >
                    <li className="nav-item">
                        <a href="pages/calendar.html" className="nav-link">
                            <i className="nav-icon fa fa-share" /> <p> Tables</p>  
                        </a>
                    </li>           
                </Link>

                <Link to='/delivery' className='btn-link' >
                    <li className="nav-item">
                        <a href="pages/calendar.html" className="nav-link">
                            <i className="nav-icon fas fa-truck" /> <p> Delivery</p>  
                        </a>
                    </li>           
                </Link>



            </ul>
            </nav>
            {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
        </aside>

     );
}
 
export default Menu;