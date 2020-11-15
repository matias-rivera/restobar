import React from 'react';

const Textarea = ({title, rows, data, setData}) => {
    return ( 
        <div className="form-group">
            <label>{title}</label>
            <textarea className="form-control" rows={rows} placeholder="Enter ..." value={data} onChange={(e) => setData(e.target.value)} />
        </div>
     );
}
 
export default Textarea;