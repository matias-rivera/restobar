import React from 'react';

const Loader = ({variable}) => {
    return variable 
    ?   <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    : '' ;
}
 
export default Loader;


