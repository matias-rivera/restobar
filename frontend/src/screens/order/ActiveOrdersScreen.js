import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import HeaderContent from "../../components/HeaderContent";
import Modal from "react-modal";
import { allTables } from "../../actions/tableActions";
import Table from "../../components/Table";
import { Link } from "react-router-dom";
import { customStyles } from "../../utils";
import {
    OccupiedTableLoader,
    FreeTableLoader,
} from "../../components/loader/TableLoader";

Modal.setAppElement("#root");

const ActiveOrdersScreen = ({ history }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const tableAll = useSelector((state) => state.tableAll);
    const { loading, error, tables } = tableAll;

    useEffect(() => {
        dispatch(allTables());
    }, [dispatch, history, userInfo]);

    const occupiedTableLoader = () => {
        let tableSkeleton = [];
        for (let i = 0; i < 16; i++) {
            tableSkeleton.push(
                <div className="col-12 col-md-6 col-lg-4 col-xl-3" key={i}>
                    {" "}
                    <OccupiedTableLoader />{" "}
                </div>
            );
        }
        return tableSkeleton;
    };

    const freeTableLoader = () => {
        let tableSkeleton = [];
        for (let i = 0; i < 6; i++) {
            tableSkeleton.push(
                <div className="col-3" key={i}>
                    {" "}
                    <FreeTableLoader />{" "}
                </div>
            );
        }
        return tableSkeleton;
    };

    const filterTablesByState = (isOccupied) => {
        const mappedTables = tables.filter((table) => {
            return table.occupied === isOccupied;
        });
        return mappedTables;
    };

    return (
        <>
            <HeaderContent name={"Tables"} />
            {/* Main content */}

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-md-9 col-lg-9">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        Occupied Tables
                                    </h3>
                                    <Modal
                                        style={customStyles}
                                        isOpen={modalIsOpen}
                                        onRequestClose={() =>
                                            setModalIsOpen(false)
                                        }
                                    >
                                        <h2>Table Info</h2>
                                    </Modal>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    {loading ? (
                                        <div className="row">
                                            {occupiedTableLoader()}
                                        </div>
                                    ) : error ? (
                                        <Message
                                            message={error}
                                            color={"danger"}
                                        />
                                    ) : (
                                        <>
                                            <div className="row">
                                                {filterTablesByState(true).map(
                                                    (table) => (
                                                        <div
                                                            key={table.id}
                                                            className="col-12 col-md-6 col-lg-4 col-xl-3"
                                                        >
                                                            {/* small box */}
                                                            <Table
                                                                table={table}
                                                            />
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                                {/* /.card-body */}
                            </div>
                        </div>
                        {/* /.col */}
                        <div className="col-12 col-md-3 col-lg-3">
                            <div className="card">
                                <div className="card-header">Free Tables</div>
                                <div className="card-body">
                                    {loading ? (
                                        freeTableLoader()
                                    ) : error ? (
                                        <Message
                                            message={error}
                                            color={"danger"}
                                        />
                                    ) : (
                                        <>
                                            {filterTablesByState(false).map(
                                                (table) => (
                                                    <Link
                                                        to={`/order/create/${table.id}/table`}
                                                        key={table.id}
                                                        className="btn btn-block btn-success btn-lg"
                                                    >
                                                        <p className="text-center my-0">
                                                            <i className="fas fa-utensils float-left my-1"></i>
                                                            {table.name}
                                                        </p>
                                                    </Link>
                                                )
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /.row */}
                </div>
                {/* /.container-fluid */}
            </section>
        </>
    );
};

export default ActiveOrdersScreen;
