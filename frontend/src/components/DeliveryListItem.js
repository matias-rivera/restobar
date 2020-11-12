import React from 'react';
import { Link } from 'react-router-dom';

const DeliveryListItem = ({id, name, address}) => {
    return (
        <li className="item">
            <Link to={`/order/${id}/view`}>
                <div className="product-img">
                    <h1 ><i className="fas fa-truck"  /></h1>
                </div>
                <div className="product-info">
                <span className="product-title">{name}
                <span className="badge badge-info float-right">ID: {id}</span></span>
                <span className="product-description">
                    {address}
                </span>
                </div>
            </Link> 
        </li>
     );
}
 
export default DeliveryListItem;