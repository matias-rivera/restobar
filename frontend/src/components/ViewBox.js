import React from 'react';

const ViewBox = ({title,paragraph,icon,color}) => {
    return ( 
    
            <div className={`small-box ${color}`}>
                <div className="inner">
                <h3>{title}</h3>
                <p>{paragraph} </p>
                </div>
                <div className="icon">
                <i className={icon}></i>
                </div>
            </div>

     );
}
 
export default ViewBox;