import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

/* Components */
import HeaderContent from "./../components/HeaderContent";
import SmallBox from "./../components/SmallBox";
import DeliveryListItem from "../components/DeliveryListItem";
import DataTableLoader from "../components/loader/DataTableLoader";
import LoaderHandler from "../components/loader/LoaderHandler";

/* Actions */

import {
    OccupiedTableLoader,
    SkeletonBoxes,
    SkeletonSales,
} from "../components/loader/SkeletonLoaders";
import { getStatistics } from "../actions/orderActions";

const DashboardScreen = ({ history }) => {
    const dispatch = useDispatch();

    //user state
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const orderStatistics = useSelector((state) => state.orderStatistics);
    const { loading, error, data } = orderStatistics;

    const { orders, sales, statistics } = data;

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        }
        dispatch(getStatistics());
    }, [dispatch, history, userInfo]);

    //get all in place orders
    const ordersInPlace = (orders) => {
        const ordersInPlace = orders.filter(function (item) {
            return item.delivery === false;
        });

        return ordersInPlace;
    };

    const getTodaySales = (items) => {
        let day = new Date();
        day = day.toISOString().slice(8, 10);
        const newSales = items.filter(function (item) {
            const saleDay = item.updatedAt.slice(8, 10);
            return day === saleDay;
        });
        return newSales;
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

    const returnSales = () => {
        var indents = [];
        for (var i = 0; i < (sales.length > 3 ? 4 : sales.length); i++) {
            indents.push(
                <tr key={sales[i].id}>
                    <td className="font-weight-bold">{sales[i].id}</td>
                    <td className="h4">
                        {sales[i].delivery ? (
                            <span className={"badge bg-primary"}>IN PLACE</span>
                        ) : (
                            <span className={"badge bg-info"}>DELIVERY</span>
                        )}
                    </td>
                    <td className="h4">
                        <span className={"badge bg-success"}>
                            ${sales[i].total}
                        </span>
                    </td>
                    <td className="h4">
                        <span className={"badge bg-warning"}>
                            {sales[i].products.length}
                        </span>
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

    const renderSmallBoxes = () => (
        <>
            <SmallBox
                number={orders.length}
                paragraph={"Active orders"}
                link={"order"}
                color={"success"}
                icon={"fas fa-utensils"}
            />

            <SmallBox
                number={ordersInPlace(orders).length}
                paragraph={"In Place Orders"}
                link={"active"}
                color={"info"}
                icon={"fas fa-users"}
            />
            <SmallBox
                number={ordersForDelivery(orders).length}
                paragraph={"Orders for delivery"}
                link={"delivery"}
                color={"danger"}
                icon={"fas fa-truck"}
            />

            <SmallBox
                number={orders.length}
                paragraph={"Total orders"}
                link={"order"}
                color={"warning"}
                icon={"ion ion-bag"}
            />
        </>
    );

    const renderSales = () => (
        <div className="row">
            <div className="col-12 col-lg-6">
                <div className="card">
                    <div className="card-header border-0">
                        <h3 className="card-title">Last Sales</h3>
                        <div className="card-tools">
                            <Link to="/order" className="btn btn-tool btn-sm">
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
                        <h3 className="card-title">Restobar Overview</h3>
                    </div>
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center border-bottom mb-3">
                            <p className="text-warning text-xl">
                                <i className="fas fa-shopping-cart"></i>
                            </p>
                            <p className="d-flex flex-column text-right">
                                <span className="font-weight-bold">
                                    <i className="ion ion-android-arrow-up text-warning" />{" "}
                                    {statistics && statistics.orders}
                                </span>
                                <span className="text-muted">
                                    TOTAL ORDERS COMPLETED
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
                                    {statistics && statistics.deliveries}
                                </span>
                                <span className="text-muted">
                                    TOTAL DELIVERIES COMPLETED
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
                                        {statistics && statistics.today}
                                    </span>
                                </span>
                                <span className="text-muted">TODAY SALES</span>
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
                                        {statistics && statistics.total}
                                    </span>
                                </span>
                                <span className="text-muted">TOTAL SALES</span>
                            </p>
                        </div>
                        {/* /.d-flex */}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderOrders = () => (
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
                {ordersInPlace(orders)
                    .splice(0, 5)
                    .map((order) => (
                        <tr
                            key={order.id}
                            onClick={(e) => handleRowClick(e, order.id)}
                            style={{
                                cursor: "pointer",
                            }}
                        >
                            <td>
                                <h4>
                                    <span className={"badge bg-primary"}>
                                        {order.id}
                                    </span>
                                </h4>
                            </td>
                            <td>{order.client ? order.client.name : ""}</td>
                            <td>{order.table ? order.table.name : ""}</td>
                            <td>
                                <h4>
                                    <span className={"badge bg-success"}>
                                        ${order.total}
                                    </span>
                                </h4>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );

    const renderDeliveries = () =>
        ordersForDelivery(orders)
            .splice(0, 5)
            .map((order) => (
                <DeliveryListItem
                    id={order.id}
                    name={order.client ? order.client.name : ""}
                    address={order.client ? order.client.address : ""}
                    key={order.id}
                />
            ));

    return (
        <>
            <HeaderContent name={"Dashboard"} />

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <LoaderHandler
                            loading={loading}
                            error={error}
                            loader={<SkeletonBoxes />}
                            render={renderSmallBoxes}
                        />
                    </div>

                    {userInfo.isAdmin && (
                        <LoaderHandler
                            loading={loading}
                            error={error}
                            loader={<SkeletonSales />}
                            render={renderSales}
                        />
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
                                        <LoaderHandler
                                            loading={loading}
                                            error={error}
                                            loader={<DataTableLoader />}
                                            render={renderOrders}
                                        />
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
                                        <LoaderHandler
                                            loading={loading}
                                            loader={<DataTableLoader />}
                                            error={error}
                                            render={renderDeliveries}
                                        />
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
