import React from "react";
import Loader from "../Loader";
import Message from "../Message";

const OrderNote = () => {
    return (
        <>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="client">Client</label>
                    {loadingAllClients ? (
                        <Loader variable={loadingAllClients} />
                    ) : errorAllClients ? (
                        <Message message={errorAllClients} color={"danger"} />
                    ) : (
                        <Select
                            id="client"
                            options={mapSelect(clients)}
                            onChange={setClient}
                            placeholder="Select client"
                            isSearchable
                            value={client}
                        />
                    )}
                    {errors.client && (
                        <Message message={errors.client} color={"warning"} />
                    )}
                </div>

                <div className="form-group col-md-6">
                    <label htmlFor="table">Table</label>
                    {loadingAllTables ? (
                        <Loader variable={loadingAllTables} />
                    ) : errorAllTables ? (
                        <Message message={errorAllTables} color={"danger"} />
                    ) : (
                        <Select
                            id="table"
                            options={mapSelect(filterTablesByState(false))}
                            onChange={setTable}
                            isDisabled={delivery}
                            value={table}
                            placeholder="Select table"
                            isSearchable
                        />
                    )}
                    {errors.table && (
                        <Message message={errors.table} color={"warning"} />
                    )}
                </div>
            </div>
        </>
    );
};

export default OrderNote;
