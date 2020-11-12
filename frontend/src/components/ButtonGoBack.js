import React from 'react';
import { Link } from 'react-router-dom';

const ButtonGoBack = ({link}) => {
    return ( 
        <Link to={`/${link}`} className='btn btn-info btn-lg mb-2'>
                Go Back
        </Link>
     );
}
 
export default ButtonGoBack;