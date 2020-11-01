import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    
    return ( 
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="index3.html" className="brand-link">
            <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
            <span className="brand-text font-weight-light">AdminLTE 3</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
            {/* Sidebar user panel (optional) */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
                <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User" />
            </div>
            <div className="info">
                <a href="/" className="d-block">Alexander Pierce</a>
            </div>
            </div>
            {/* Sidebar Menu */}
            <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                {/* Add icons to the links using the .nav-icon class
                    with font-awesome or any other icon font library */}

                <Link to='/' className='btn-link' >
                    <li className="nav-item">
                        <a href="pages/calendar.html" className="nav-link">
                            <i className="nav-icon fas fa-tachometer-alt" /> Dashboard 
                        </a>
                    </li>           
                </Link>
                <li className="nav-header">ADMIN</li>
                <Link to='/admin/user' className='btn-link' >
                    <li className="nav-item">
                        <a href="pages/calendar.html" className="nav-link">
                            <i className="nav-icon fas fa-calendar-alt" /> Users 
                        </a>
                    </li>           
                </Link>
                
                <li className="nav-header">RESTOBAR</li>
                <Link to='/category' className='btn-link' >
                    <li className="nav-item">
                        <a href="pages/calendar.html" className="nav-link">
                            <i className="nav-icon fas fa-calendar-alt" /> Categories 
                        </a>
                    </li>           
                </Link>

                <Link to='/product' className='btn-link' >
                    <li className="nav-item">
                        <a href="pages/calendar.html" className="nav-link">
                            <i className="nav-icon fas fa-calendar-alt" /> Products 
                        </a>
                    </li>           
                </Link>
                
                <Link to='/client' className='btn-link' >
                    <li className="nav-item">
                        <a href="pages/calendar.html" className="nav-link">
                            <i className="nav-icon fas fa-calendar-alt" /> Clients 
                        </a>
                    </li>           
                </Link>

                <Link to='/order' className='btn-link' >
                    <li className="nav-item">
                        <a href="pages/calendar.html" className="nav-link">
                            <i className="nav-icon fas fa-calendar-alt" /> Orders 
                        </a>
                    </li>           
                </Link>

                <Link to='/table' className='btn-link' >
                    <li className="nav-item">
                        <a href="pages/calendar.html" className="nav-link">
                            <i className="nav-icon fas fa-calendar-alt" /> Tables 
                        </a>
                    </li>           
                </Link>

                <Link to='/delivery' className='btn-link' >
                    <li className="nav-item">
                        <a href="pages/calendar.html" className="nav-link">
                            <i className="nav-icon fas fa-calendar-alt" /> Delivery 
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