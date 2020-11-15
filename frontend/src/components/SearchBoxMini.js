import React, { useState } from 'react';

const SearchBoxMini = ({history, item}) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            history.push(`/${item}/search/${keyword}`)
        } else {
            history.push(`/${item}`)
        }
    }

    return ( 
<>
        <form>

        <div className="input-group input-group-sm" style={{width: 160}}>
            <input 
                type="text" 
                name="table_search"
                onChange={(e) => setKeyword(e.target.value)} 
                className="form-control float-right" 
                placeholder="Search" 
                />
            <div className="input-group-append">
                <button onClick={(e) => submitHandler(e)} type="submit" className="btn btn-default bg-primary"><i className="fas fa-search" /></button>
            </div>
        </div>

        </form>
    </>
     );
}
 
export default SearchBoxMini;