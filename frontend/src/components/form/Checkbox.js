import React from 'react';

const Checkbox = ({name, data, setData}) => {
    return ( 
        <div className="form-check">
              <input 
                type='checkbox'
                id={name}
                className="form-check-input" 
                checked={data}
                onChange={(e) => setData(e.target.checked )}
              />
               <label className="form-check-label" htmlFor={name}>{name}</label>
        </div>
     );
}
 
export default Checkbox;