import React from 'react';
import { capitalize } from '../../utils';
import Message from '../Message';


const Input = ({name, type, data, setData, errors}) => {
    return ( 
            <div className="form-group">
                <label htmlFor={name}>{capitalize(name)}</label>
                <input 
                    type={type} 
                    className="form-control" 
                    id={name} 
                    aria-describedby={name}  
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                />
                
                {errors[name]  && <label className='text-danger'>{errors[name]} </label>}
            </div>


     );
}
 
export default Input;