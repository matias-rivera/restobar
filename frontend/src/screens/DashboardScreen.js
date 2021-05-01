import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderContent from "./../components/HeaderContent";
import SmallBox from "./../components/SmallBox";
import { Link } from "react-router-dom";
import { allTables } from "../actions/tableActions";
import Loader from "../components/Loader";
import Message from "./../components/Message";
import { allActiveOrders, allSales } from "./../actions/orderActions";
import DeliveryListItem from "../components/DeliveryListItem";
import { OccupiedTableLoader } from "../components/loader/TableLoader";
import DataTableLoader from "../components/loader/DataTableLoader";

const DashboardScreen = ({ history }) => {
    const dispatch = useDispatch();

    //user state
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    //tables list state
    const tableAll = useSelector((state) => state.tableAll);
    const { loading: loadingTables, error: errorTables, tables } = tableAll;

    //all orders
    const orderAllActive = useSelector((state) => state.orderAllActive);
    const {
        loading: loadingAllOrders,
        error: errorAllOrders,
        orders: allOrders,
    } = orderAllActive;

    //all orders
    const orderAllSales = useSelector((state) => state.orderAllSales);
    const {
        loading: loadingSales,
        error: errorSales,
        orders: sales,
    } = orderAllSales;

    useEffect(() => {
        dispatch(allTables());
        dispatch(allActiveOrders());
        if (!userInfo) {
            history.push("/login");
        }
        if (userInfo.isAdmin) {
            dispatch(allSales());
        }
    }, [dispatch, history, userInfo]);

    //get all in place orders
    const ordersInPlace = (orders) => {
        const ordersInPlace = orders.filter(function (item) {
            return item.delivery === false;
        });

        return ordersInPlace;
    };

    //get all delivery orders
    const ordersForDelivery = (orders) => {
        const ordersForDelivery = orders.filter(function (item) {
            return item.delivery === true;
        });

        return ordersForDelivery;
    };

    //table row click from in place orders
    const handleRowClick = (e, id) => {
        e.preventDefault();
        history.push(`/order/${id}/view`);
    };

    const getTodaySales = (sales) => {
        let day = new Date();
        day = day.toISOString().slice(8, 10);
        const newSales = sales.filter(function (item) {
            const saleDay = item.updatedAt.slice(8, 10);
            return day === saleDay;
        });
        return newSales;
    };

    const getTodayTotal = (sales) => {
        const salesToday = getTodaySales(sales);
        return salesToday.reduce((acc, item) => acc + item.total, 0).toFixed(2);
    };

    const getTodayDelivery = (sales) => {
        const salesToday = getTodaySales(sales);
        return salesToday.reduce(
            (acc, item) => acc + (item.delivery ? 1 : 0),
            0
        );
    };

    const getTodayProducts = (sales) => {
        const salesToday = getTodaySales(sales);
        return salesToday.reduce((acc, item) => acc + item.total_products, 0);
    };

    const getTotalSales = (sales) => {
        return sales.reduce((acc, item) => acc + item.total, 0).toFixed(2);
    };

    const returnSales = (sales) => {
        var indents = [];
        for (var i = 0; i < (sales.length > 3 ? 4 : sales.length); i++) {
            indents.push(
                <tr key={sales[i].id}>
                    <td className="font-weight-bold">{sales[i].id}</td>
                    <td>
                        <h4>
                            {sales[i].delivery ? (
                                <span className={"badge bg-primary"}>
                                    IN PLACE
                                </span>
                            ) : (
                                <span className={"badge bg-info"}>
                                    DELIVERY
                                </span>
                            )}
                        </h4>
                    </td>
                    <td>
                        <h4>
                            <span className={"badge bg-success"}>
                                ${sales[i].total}
                            </span>
                        </h4>
                    </td>
                    <td>
                        <h4>
                            <span className={"badge bg-warning"}>
                                {sales[i].total_products}
                            </span>
                        </h4>
                    </td>
                    <td>
                        <Link
                            to={`/order/${sales[i].id}/view`}
                            className="btn btn-info"
                        >
                            <i className="fas fa-search"></i>
                        </Link>
                    </td>
                </tr>
            );
        }
        return indents;
    };

    const skeletonBoxes = () => {
        let tableSkeleton = [];
        for (let i = 0; i < 4; i++) {
            tableSkeleton.push(
                <div className="col-lg-3 col-6" key={i}>
                    <OccupiedTableLoader />{" "}
                </div>
            );
        }
        return tableSkeleton;
    };

    const skeletonSales = () => {
        return (
            <div className="row">
                <div className="col-12 col-lg-6">
                    {" "}
                    <div className="card">
                        <div className="card-body">
                            <DataTableLoader />
                        </div>
                    </div>{" "}
                </div>
                <div className="col-12 col-lg-6">
                    {" "}
                    <div className="card">
                        <div className="card-body">
                            <DataTableLoader />
                        </div>
                    </div>{" "}
                </div>
            </div>
        );
    };

    return (
        <>
            <HeaderContent name={"Dashboard"} />

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        {loadingAllOrders ? (
                            skeletonBoxes()
                        ) : errorAllOrders ? (
                            <Message
                                message={errorAllOrders}
                                color={"danger"}
                            />
                        ) : (
                            <>
                                {loadingTables ? (
                                    <Loader variable={loadingTables} />
                                ) : errorTables ? (
                                    <Message
                                        message={errorTables}
                                        color={"danger"}
                                    />
                                ) : (
                                    <SmallBox
                                        number={tables.length}
                                        paragraph={"Free tables"}
                                        link={"active"}
                                        color={"success"}
                                        icon={"fas fa-utensils"}
                                    />
                                )}
                                <SmallBox
                                    number={ordersInPlace(allOrders).length}
                                    paragraph={"In Place Orders"}
                                    link={"active"}
                                    color={"info"}
                                    icon={"fas fa-users"}
                                />
                                <SmallBox
                                    number={ordersForDelivery(allOrders).length}
                                    paragraph={"Orders for delivery"}
                                    link={"delivery"}
                                    color={"danger"}
                                    icon={"fas fa-truck"}
                                />
                                <SmallBox
                                    number={allOrders.length}
                                    paragraph={"Active orders"}
                                    link={"order"}
                                    color={"warning"}
                                    icon={"ion ion-bag"}
                                />
                            </>
                        )}
                    </div>

                    {!userInfo.isAdmin ? (
                        ""
                    ) : loadingSales ? (
                        skeletonSales()
                    ) : errorSales ? (
                        <Message message={errorSales} color={"danger"} />
                    ) : (
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <div className="card">
                                    <div className="card-header border-0">
                                        <h3 className="card-title">
                                            Last Sales
                                        </h3>
                                        <div className="card-tools">
                                            <Link
                                                to="/order"
                                                className="btn btn-tool btn-sm"
                                            >
                                                <i className="nav-icon far fa-clipboard" />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="card-body table-responsive p-0">
                                        <table className="table table-striped table-valign-middle text-center">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Type</th>
                                                    <th>Total</th>
                                                    <th>Products</th>
                                                    <th>More</th>
                                                </tr>
                                            </thead>
                                            <tbody>{returnSales(sales)}</tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <div className="card">
                                    <div className="card-header border-0">
                                        <h3 className="card-title">
                                            Restobar Overview
                                        </h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center border-bottom mb-3">
                                            <p className="text-warning text-xl">
                                                <i className="fas fa-shopping-cart"></i>
                                            </p>
                                            <p className="d-flex flex-column text-right">
                                                <span className="font-weight-bold">
                                                    <i className="ion ion-android-arrow-up text-warning" />{" "}
                                                    {sales
                                                        ? getTodayProducts(
                                                              sales
                                                          )
                                                        : 0}
                                                </span>
                                                <span className="text-muted">
                                                    TODAY PRODUCTS SOLD
                                                </span>
                                            </p>
                                        </div>
                                        {/* /.d-flex */}
                                        <div className="d-flex justify-content-between align-items-center border-bottom mb-3">
                                            <p className="text-info text-xl">
                                                <i className="fas fa-truck"></i>
                                            </p>
                                            <p className="d-flex flex-column text-right">
                                                <span className="font-weight-bold">
                                                    <i className="ion ion-android-arrow-up text-info" />{" "}
                                                    {sales
                                                        ? getTodayDelivery(
                                                              sales
                                                          )
                                                        : 0}
                                                </span>
                                                <span className="text-muted">
                                                    TODAY DELIVERIES MADE{" "}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center border-bottom mb-3">
                                            <p className="text-success text-xl">
                                                <i className="fas fa-money-bill-wave"></i>
                                            </p>
                                            <p className="d-flex flex-column text-right">
                                                <span className="font-weight-bold">
                                                    <span className="text-success">
                                                        <i className="fas fa-dollar-sign text-success"></i>{" "}
                                                        {sales
                                                            ? `${getTodayTotal(
                                                                  sales
                                                              )}`
                                                            : 0}
                                                    </span>{" "}
                                                    (
                                                    {
                                                        getTodaySales(sales)
                                                            .length
                                                    }
                                                    )
                                                </span>
                                                <span className="text-muted">
                                                    TODAY SALES
                                                </span>
                                            </p>
                                        </div>
                                        {/* /.d-flex */}
                                        <div className="d-flex justify-content-between align-items-center mb-0">
                                            <p className="text-danger text-xl">
                                                <i className="fas fa-piggy-bank"></i>
                                            </p>
                                            <p className="d-flex flex-column text-right">
                                                <span className="font-weight-bold">
                                                    <span className="text-success">
                                                        <i className="fas fa-dollar-sign"></i>{" "}
                                                        {sales
                                                            ? `${getTotalSales(
                                                                  sales
                                                              )}`
                                                            : 0}
                                                    </span>
                                                </span>
                                                <span className="text-muted">
                                                    TOTAL SALES
                                                </span>
                                            </p>
                                        </div>
                                        {/* /.d-flex */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="row">
                        <div className="col-12 col-md-9">
                            <div className="card">
                                <div className="card-header border-transparent">
                                    <h3 className="card-title">
                                        Latest In Place Orders
                                    </h3>
                                    <div className="card-tools">
                                        <button
                                            type="button"
                                            className="btn btn-tool"
                                            data-card-widget="collapse"
                                        >
                                            <i className="fas fa-minus" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <div className="table-responsive">
                                        {loadingAllOrders ? (
                                            <DataTableLoader />
                                        ) : errorAllOrders ? (
                                            <Message
                                                message={errorAllOrders}
                                                color={"danger"}
                                            />
                                        ) : (
                                            <table className="table m-0 table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Order ID</th>
                                                        <th>Client</th>
                                                        <th>Table</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {ordersInPlace(allOrders)
                                                        .splice(0, 5)
                                                        .map((order) => (
                                                            <tr
                                                                key={order.id}
                                                                onClick={(e) =>
                                                                    handleRowClick(
                                                                        e,
                                                                        order.id
                                                                    )
                                                                }
                                                                style={{
                                                                    cursor:
                                                                        "pointer",
                                                                }}
                                                            >
                                                                <td>
                                                                    <h4>
                                                                        <span
                                                                            className={
                                                                                "badge bg-primary"
                                                                            }
                                                                        >
                                                                            {
                                                                                order.id
                                                                            }{" "}
                                                                        </span>
                                                                    </h4>
                                                                </td>
                                                                <td>
                                                                    {order.client
                                                                        ? order
                                                                              .client
                                                                              .name
                                                                        : ""}
                                                                </td>
                                                                <td>
                                                                    {order.table
                                                                        ? order
                                                                              .table
                                                                              .name
                                                                        : ""}
                                                                </td>
                                                                <td>
                                                                    <h4>
                                                                        <span
                                                                            className={
                                                                                "badge bg-success"
                                                                            }
                                                                        >
                                                                            $
                                                                            {
                                                                                order.total
                                                                            }{" "}
                                                                        </span>
                                                                    </h4>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                </div>
                                <div className="card-footer clearfix">
                                    <Link
                                        to={"/order/create"}
                                        className="btn btn-sm btn-info float-left"
                                    >
                                        Place New Order
                                    </Link>
                                    <Link
                                        to={"/order"}
                                        className="btn btn-sm btn-secondary float-right"
                                    >
                                        View All Orders
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-3">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        Recently Added Delivery Orders
                                    </h3>
                                    <div className="card-tools">
                                        <button
                                            type="button"
                                            className="btn btn-tool"
                                            data-card-widget="collapse"
                                        >
                                            <i className="fas fa-minus" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <ul className="products-list product-list-in-card pl-2 pr-2">
                                        {loadingAllOrders ? (
                                            <DataTableLoader />
                                        ) : errorAllOrders ? (
                                            <Message
                                                message={errorAllOrders}
                                                color={"danger"}
                                            />
                                        ) : (
                                            ordersForDelivery(allOrders)
                                                .splice(0, 5)
                                                .map((order) => (
                                                    <DeliveryListItem
                                                        id={order.id}
                                                        name={
                                                            order.client
                                                                ? order.client
                                                                      .name
                                                                : ""
                                                        }
                                                        address={
                                                            order.client
                                                                ? order.client
                                                                      .address
                                                                : ""
                                                        }
                                                        key={order.id}
                                                    />
                                                ))
                                        )}
                                    </ul>
                                </div>
                                <div className="card-footer text-center">
                                    <Link
                                        to={"/delivery"}
                                        className="uppercase"
                                    >
                                        View All Delivery Orders
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /.container-fluid */}
            </section>
        </>
    );
};

export default DashboardScreen;
