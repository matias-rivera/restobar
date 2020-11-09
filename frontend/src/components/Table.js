import React from 'react';
import { Link } from 'react-router-dom';


const Table = ({table}) => {
    return ( 
        <div className="small-box bg-danger">
            <div className="inner">
                <h3>{table.name}</h3>
                <p>Orders ID: {table.orders.map(order => {return order.id})}</p>
            </div>
            <div className="icon">
            <i className="fas fa-user-friends"></i>
            </div>
            <Link to="/" className="small-box-footer">
                More info <i className="fa fa-arrow-circle-right" />
            </Link>
        </div>
     ) 
}
 
export default Table;

