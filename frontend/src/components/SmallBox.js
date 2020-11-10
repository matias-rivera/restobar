import React from 'react';
import { Link } from 'react-router-dom';

const SmallBox = ({number, paragraph, link, color, icon}) => {
    return ( 
        <div className="col-lg-3 col-6">
            <div className={`small-box bg-${color}`}>
                <div className="inner">
                    <h3>{number}</h3>
                    <p>{paragraph}</p>
                </div>
            <div className="icon">
                <i className={icon} />
            </div>
            <Link to={`/${link}`} className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
            </div>
        </div>
     );
}
 
export default SmallBox;