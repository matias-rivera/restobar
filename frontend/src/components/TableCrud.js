import React from "react";
import { Link } from "react-router-dom";
import { capitalize } from "../utils/functions";

const TableCrud = ({ data, itemLink }) => {
    let headers = [];
    if (data.length > 0) {
        headers = Object.keys(data[0]);
    }

    return (
        <table id="example2" className="table table-bordered table-hover ">
            <thead>
                <tr>
                    {headers.map((header, i) => (
                        <th key={i}>{capitalize(header)}</th>
                    ))}
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.length < 1
                    ? "Nothing found"
                    : data.map((item, i) => (
                          <tr key={i}>
                              {headers.map((header, ih) =>
                                  typeof item[header] === "boolean" ? (
                                      <td key={ih}>
                                          {item[header] ? "Yes" : "No"}{" "}
                                      </td>
                                  ) : typeof item[header] === "object" ? (
                                      <td key={ih}>
                                          {item[header].name
                                              ? item[header].name
                                              : item[header].id}
                                      </td>
                                  ) : header === "createdAt" ? (
                                      <td key={ih}>
                                          {item[header].slice(0, 10)}
                                      </td>
                                  ) : (
                                      <td key={ih}>
                                          {item[header].toString()}
                                      </td>
                                  )
                              )}
                              {/* <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.isAdmin ? 'Si' : 'No'}</td>
                        */}

                              <td className="text-center">
                                  <Link to={`/${itemLink}/${item["id"]}/edit`}>
                                      <button className="btn btn-warning">
                                          Edit
                                      </button>
                                  </Link>
                              </td>
                          </tr>
                      ))}
            </tbody>
        </table>
    );
};

export default TableCrud;
