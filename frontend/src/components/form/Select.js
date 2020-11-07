import React from 'react';
import Loader from './../Loader';
import Message from './../Message';


const Select = ({id = 1, setData, items, loading, error}) => {
    return ( 
        <div className="form-group">
                  <label htmlFor="categories">Categories</label>
                  {loading
                  ? <Loader variable={loading} />
                  : error
                  ? <Message message={error} color={'danger'} />
                  : (
                    <select className="form-control" id="categories" onChange={(e) => setData(parseInt(e.target.value))} >
                      {items.map((item) => (
                        <option key={item.id} value={item.id} selected={item.id === id} >{item.name}</option>
                      ))}
                    </select>

                  )


                  }

        </div>
     );
}
 
export default Select;