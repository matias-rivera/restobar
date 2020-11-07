import React from 'react';


const Input = ({name, type, data, setData}) => {
    return ( 
            <div className="form-group">
                <label htmlFor={name}>{name}</label>
                <input 
                    type={type} 
                    className="form-control" 
                    id={name} 
                    aria-describedby={name}  
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                />
            </div>


     );
}
 
export default Input;