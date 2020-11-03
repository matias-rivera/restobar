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
            <li className="nav-item has-treeview menu-open">
                <a href="/" className="nav-link active">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                    Dashboard
                    <i className="right fas fa-angle-left" />
                    </p>
                </a>
                <ul className="nav nav-treeview">
                    <li className="nav-item">
                    <a href="./index.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Dashboard v1</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="./index2.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Dashboard v2</p>
                    </a>
                    </li>
                </ul>
                </li>
                <li className="nav-item">
                <a href="pages/widgets.html" className="nav-link">
                    <i className="nav-icon fas fa-th" />
                    <p>
                    Widgets
                    <span className="right badge badge-danger">New</span>
                    </p>
                </a>
                </li>
                <li className="nav-item has-treeview">
                <a href="/" className="nav-link">
                    <i className="nav-icon fas fa-copy" />
                    <p>
                    Layout Options
                    <i className="fas fa-angle-left right" />
                    <span className="badge badge-info right">6</span>
                    </p>
                </a>
                <ul className="nav nav-treeview">
                    <li className="nav-item">
                    <a href="pages/layout/top-nav.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Top Navigation</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="pages/layout/top-nav-sidebar.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Top Navigation + Sidebar</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="pages/layout/boxed.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Boxed</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="pages/layout/fixed-sidebar.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Fixed Sidebar</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="pages/layout/fixed-topnav.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Fixed Navbar</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="pages/layout/fixed-footer.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Fixed Footer</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="pages/layout/collapsed-sidebar.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Collapsed Sidebar</p>
                    </a>
                    </li>
                </ul>
                </li>
                <li className="nav-item has-treeview">
                <a href="/" className="nav-link">
                    <i className="nav-icon fas fa-chart-pie" />
                    <p>
                    Charts
                    <i className="right fas fa-angle-left" />
                    </p>
                </a>
                <ul className="nav nav-treeview">
                    <li className="nav-item">
                    <a href="pages/charts/chartjs.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>ChartJS</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="pages/charts/flot.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Flot</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="pages/charts/inline.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Inline</p>
                    </a>
                    </li>
                </ul>
                </li>
                <li className="nav-item has-treeview">
                <a href="/" className="nav-link">
                    <i className="nav-icon fas fa-tree" />
                    <p>
                    UI Elements
                    <i className="fas fa-angle-left right" />
                    </p>
                </a>
                <ul className="nav nav-treeview">
                    <li className="nav-item">
                    <a href="pages/UI/general.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>General</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="pages/UI/icons.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Icons</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="pages/UI/buttons.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Buttons</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="pages/UI/sliders.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Sliders</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="pages/UI/modals.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Modals &amp; Alerts</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="pages/UI/navbar.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Navbar &amp; Tabs</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="pages/UI/timeline.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Timeline</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="pages/UI/ribbons.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Ribbons</p>
                    </a>
                    </li>
                </ul>
                </li>
                <li className="nav-item has-treeview">
                <a href="/" className="nav-link">
                    <i className="nav-icon fas fa-edit" />
                    <p>
                    Forms
                    <i className="fas fa-angle-left right" />
                    </p>
                </a>
                <ul className="nav nav-treeview">
                    <li className="nav-item">
                    <a href="pages/forms/general.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>General Elements</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="pages/forms/advanced.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Advanced Elements</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="pages/forms/editors.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Editors</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="pages/forms/validation.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Validation</p>
                    </a>
                    </li>
                </ul>
                </li>
                <li className="nav-item has-treeview">
                <a href="/" className="nav-link">
                    <i className="nav-icon fas fa-table" />
                    <p>
                    Tables
                    <i className="fas fa-angle-left right" />
                    </p>
                </a>
                <ul className="nav nav-treeview">
                    <li className="nav-item">
                    <a href="pages/tables/simple.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Simple Tables</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="pages/tables/data.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>DataTables</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="pages/tables/jsgrid.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>jsGrid</p>
                    </a>
                    </li>
                </ul>
                </li>

                <li className="nav-header">ADMIN</li>
                <Link to='/admin/user' className='btn-link' >
                    <li className="nav-item">
                        <a href="pages/calendar.html" className="nav-link">
                            <i className="nav-icon fas fa-calendar-alt" /> Users 
                        </a>
                    </li>           
                </Link>
                <li className="nav-header">EXAMPLES</li>
                <li className="nav-item">
                <a href="pages/calendar.html" className="nav-link">
                    <i className="nav-icon fas fa-calendar-alt" />
                    <p>
                    Calendar
                    <span className="badge badge-info right">2</span>
                    </p>
                </a>
                </li>
                <li className="nav-item">
                <a href="pages/gallery.html" className="nav-link">
                    <i className="nav-icon far fa-image" />
                    <p>
                    Gallery
                    </p>
                </a>
                </li>
                <li className="nav-item has-treeview">
                <a href="/" className="nav-link">
                    <i className="nav-icon far fa-envelope" />
                    <p>
                    Mailbox
                    <i className="fas fa-angle-left right" />
                    </p>
                </a>
                <ul className="nav nav-treeview">
                    <li className="nav-item">
                    <a href="pages/mailbox/mailbox.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Inbox</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="pages/mailbox/compose.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Compose</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="pages/mailbox/read-mail.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Read</p>
                    </a>
                    </li>
                </ul>
                </li>
                <li className="nav-item has-treeview">
                <a href="/" className="nav-link">
                    <i className="nav-icon fas fa-book" />
                    <p>
                    Pages
                    <i className="fas fa-angle-left right" />
                    </p>
                </a>
                <ul className="nav nav-treeview">
                    <li className="nav-item">
                    <a href="pages/examples/invoice.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Invoice</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="pages/examples/profile.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Profile</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="pages/examples/e-commerce.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>E-commerce</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="pages/examples/projects.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Projects</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="pages/examples/project-add.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Project Add</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="pages/examples/project-edit.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Project Edit</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="pages/examples/project-detail.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Project Detail</p>
                    </a>
                    </li>
                    <li className="nav-item">
                    <a href="pages/examples/contacts.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Contacts</p>
                    </a>
                    </li>
                </ul>
                </li>

                {/* Add icons to the links using the .nav-icon class
                    with font-awesome or any other icon font library */}

                {/* <Link to='/' className='btn-link' >
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
                </Link> */}


            </ul>
            </nav>
            {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
        </aside>

     );
}
 
export default Menu;