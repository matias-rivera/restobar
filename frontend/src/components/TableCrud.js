import React from 'react';
import { Link } from 'react-router-dom';

const TableCrud = ({headers, data, itemLink}) => {
    console.log()
    return ( 
        <table id="example2" className="table table-bordered table-hover">
                <thead>
                  <tr>
                    {headers.map((header,i) => (
                        <th key={i}>{header}</th>
                    ))}
                    <th></th>

                  </tr>
                </thead>
                <tbody>
                    {data.map((item, i) => (
                        <tr key={i}>
                            {headers.map(header => (
                                (typeof item[header]) === "boolean" 
                                    ? <td>{item[header] ? 'Yes' : 'No'} </td> 
                                    : <td>{item[header].toString()}</td>
                                
                            ))}
                            {/* <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.isAdmin ? 'Si' : 'No'}</td>
                        */}

                            <td className='text-center'>
                            <Link to={`/${itemLink}/${item['id']}/edit`}>
                                <button 
                                className='btn btn-warning'
                                >Edit
                                </button>
                            </Link>
                            </td> 
                        </tr>
                    
                    ))}

                </tbody>

              </table>
     );
}
 
export default TableCrud;