import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

/* components */
import LoaderHandler from "../../components/loader/LoaderHandler";
import HeaderContent from "../../components/HeaderContent";
import Table from "../../components/Table";
import {
    OccupiedTableLoader,
    FreeTableLoader,
} from "../../components/loader/SkeletonLoaders";

/* actions */
import { allTables } from "../../actions/tableActions";

const ActiveOrdersScreen = ({ history }) => {
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
                <div className="col-12" key={i}>
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

    const renderOccupiedTables = () =>
        filterTablesByState(true).map((table) => (
            <div key={table.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
                <Table table={table} />
            </div>
        ));

    const renderFreeTables = () =>
        filterTablesByState(false).map((table) => (
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
        ));

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
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    <div className="row">
                                        <LoaderHandler
                                            loading={loading}
                                            error={error}
                                            loader={occupiedTableLoader()}
                                            render={renderOccupiedTables}
                                        />
                                    </div>
                                </div>
                                {/* /.card-body */}
                            </div>
                        </div>
                        {/* /.col */}
                        <div className="col-12 col-md-3 col-lg-3">
                            <div className="card">
                                <div className="card-header">Free Tables</div>
                                <div className="card-body">
                                    <LoaderHandler
                                        loading={loading}
                                        error={error}
                                        loader={freeTableLoader()}
                                        render={renderFreeTables}
                                    />
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
