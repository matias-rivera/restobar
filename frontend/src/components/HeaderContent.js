import React from 'react';

const HeaderContent = ({name}) => {
    return ( 
        <section className="content-header">
            <div className="container-fluid">
            <div className="row mb-2">
                <div className="col-sm-6">
                <h1>{name}</h1>
                </div>
                <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active">{name}</li>
                </ol>
                </div>
            </div>
            </div>{/* /.container-fluid */}
        </section>
     );
}
 
export default HeaderContent;