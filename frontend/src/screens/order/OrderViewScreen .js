import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/* Components */
import HeaderContent from "../../components/HeaderContent";
import ButtonGoBack from "../../components/ButtonGoBack";
import ViewBox from "../../components/ViewBox";
import LoaderHandler from "../../components/loader/LoaderHandler";

/* constants */
import { ORDER_UPDATE_RESET } from "../../constants/orderConstants";

/* actions */
import {
    listOrderDetails,
    updateOrderToPaid,
} from "../../actions/orderActions";

const OrderViewScreen = ({ history, match }) => {
    const orderId = parseInt(match.params.id);

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    //order details state
    const orderDetails = useSelector((state) => state.orderDetails);
    const { loading, error, order } = orderDetails;

    //order edit state
    const orderUpdate = useSelector((state) => state.orderUpdate);
    const {
        loading: loadingUpdate,
        success: successUpdate,
        errorUpdate,
    } = orderUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: ORDER_UPDATE_RESET });
            if (order.delivery) {
                history.push("/delivery");
            } else {
                history.push("/active");
            }
        }
        if (!order.id || order.id !== orderId) {
            dispatch(listOrderDetails(orderId));
        }
    }, [dispatch, history, order, orderId, successUpdate]);

    const handlePay = (e) => {
        e.preventDefault();

        const updatedOrder = {
            id: orderId,
        };

        dispatch(updateOrderToPaid(updatedOrder));
    };

    const handleEdit = (e) => {
        e.preventDefault();
        history.push(`/order/${orderId}/edit`);
    };

    //get all order items
    const totalItems = (productsIn) => {
        return productsIn.reduce(
            (acc, item) => acc + item.OrderProduct.quantity,
            0
        );
    };

    const renderCartInfo = () =>
        order.products && (
            <div className="small-box bg-info">
                <div className="inner">
                    <h3>TOTAL ${order.total}</h3>
                    <p>
                        {order.products.length > 0
                            ? totalItems(order.products)
                            : 0}{" "}
                        Items in Order
                    </p>
                </div>
                <div className="icon">
                    <i className="fas fa-shopping-cart" />
                </div>
            </div>
        );

    const renderOrderProducts = () => (
        <table
            id="orderTable"
            className="table table-bordered table-hover table-striped text-center table-overflow"
        >
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {order.products &&
                    order.products.length > 0 &&
                    order.products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td className="text-center h4">
                                <span className="badge bg-primary">
                                    {product.OrderProduct.quantity}
                                </span>
                            </td>
                            <td className="text-center h4">
                                <span className="badge bg-info">
                                    ${product.price}
                                </span>
                            </td>
                            <td className="text-center h4">
                                <span className={"badge bg-success"}>
                                    $
                                    {product.price *
                                        product.OrderProduct.quantity}{" "}
                                </span>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );

    const renderOrderInfo = () => (
        <>
            <div className="row">
                <div className="col-12 col-md-6">
                    <ViewBox
                        title={order.id}
                        paragraph={"ORDER ID"}
                        icon={"far fa-clipboard"}
                        color={"bg-info"}
                    />
                </div>

                {order.isPaid ? (
                    <div className="col-12 col-md-6">
                        <ViewBox
                            title={"Paid"}
                            paragraph={"Order is already paid"}
                            icon={"fas fa-check"}
                            color={"bg-success"}
                        />
                    </div>
                ) : (
                    <div className="col-12 col-md-6">
                        <ViewBox
                            title={"Not Paid"}
                            paragraph={"Order is still not paid"}
                            icon={"far fa-times-circle"}
                            color={"bg-danger"}
                        />
                    </div>
                )}

                <div className="col-12 col-md-6">
                    {order.client && (
                        <ViewBox
                            title={order.client.name}
                            paragraph={`ID: ${order.client.id}`}
                            icon={"fas fa-user"}
                            color={"bg-info"}
                        />
                    )}
                </div>

                {order.table ? (
                    <div className="col-12 col-md-6">
                        <ViewBox
                            title={order.table.name}
                            paragraph={`ID: ${order.table.id}`}
                            icon={"fas fa-utensils"}
                            color={"bg-info"}
                        />
                    </div>
                ) : (
                    <div className="col-12 col-md-6">
                        {order.client && (
                            <ViewBox
                                title={"Delivery"}
                                paragraph={order.client.address}
                                icon={"fas fa-truck"}
                                color={"bg-primary"}
                            />
                        )}
                    </div>
                )}
            </div>

            <div className="col-12">
                <ViewBox
                    title={"Note:"}
                    paragraph={order.note}
                    icon={"far fa-sticky-note"}
                    color={"bg-silver"}
                />
            </div>
        </>
    );

    const renderOrderEdit = () => (
        <div className="card">
            <div className="card-header bg-warning">Edit Order</div>
            <div className="card-body">
                <button className="btn btn-block" onClick={handleEdit}>
                    <ViewBox
                        title={`Edit Order`}
                        paragraph={`Click to Edit`}
                        icon={"fas fa-edit"}
                        color={"bg-warning"}
                    />
                </button>
            </div>
        </div>
    );

    const renderOrderPay = () => (
        <div className="card">
            <div className="card-header bg-success">Update to Paid</div>
            <div className="card-body">
                <button className="btn btn-block" onClick={handlePay}>
                    <ViewBox
                        title={`PAY $${order.total}`}
                        paragraph={`Click to Pay`}
                        icon={"fas fa-hand-holding-usd"}
                        color={"bg-success"}
                    />
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Content Header (Page header) */}
            <HeaderContent name={"Orders"} />
            <LoaderHandler
                loading={loadingUpdate}
                error={errorUpdate}
            ></LoaderHandler>
            {/* Main content */}
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <ButtonGoBack history={history} />

                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">View Order</h3>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    <div className="row">
                                        <LoaderHandler
                                            loading={loading}
                                            error={error}
                                        >
                                            <div className="col-12 col-md-6">
                                                {renderCartInfo()}
                                                {renderOrderProducts()}
                                            </div>

                                            <div className="col-12 col-md-6">
                                                {renderOrderInfo()}
                                            </div>
                                        </LoaderHandler>
                                    </div>
                                </div>
                                {/* /.card-body */}
                            </div>
                        </div>
                        {/* /.col */}
                    </div>
                    {/* /.row */}
                    <div className="row justify-content-between">
                        <LoaderHandler loading={loading} error={error}>
                            <div className="col-12 col-md-3">
                                {!order.isPaid ? renderOrderEdit() : ""}
                            </div>
                            <div className="col-12 col-md-3">
                                {!order.isPaid ? renderOrderPay() : ""}
                            </div>
                        </LoaderHandler>
                    </div>
                </div>
                {/* /.container-fluid */}
            </section>
        </>
    );
};

export default OrderViewScreen;
