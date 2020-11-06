import React from 'react';
import { Link } from 'react-router-dom';




const Paginate = ({ item, pages, page, keyword = null }) => {
    return pages > 1 && (
        <ul className="pagination"  >
            {[...Array(pages).keys()].map(x => (
                 
                <Link key={x + 1}
                to={keyword 
                    ? `/${item}/search/${keyword}/page/${x+1}`
                    : `/${item}/page/${x+1}`
                    }>
                    <li className={`page-item ${x + 1 === page ? 'active' : ''}`} ><span className="page-link">{x+1}</span></li>
                </Link>
                
            ))}
        </ul>
    )
}
 
export default Paginate;