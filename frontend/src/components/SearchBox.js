import React, { useState } from 'react';

const SearchBox = ({history, item}) => {
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
        <form
            onSubmit={submitHandler}

            className='form-inline' 
        >
        <div className='form-group'>

                <input
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search...'
                className='form-control mr-sm-2 nl-sn-5'
                />
                <button
                        type='submit'
                        variant='primary'
                        className='btn btn-primary p-2'
                        >
                        Search
                </button>
        </div>

        </form>
     );
}
 
export default SearchBox;