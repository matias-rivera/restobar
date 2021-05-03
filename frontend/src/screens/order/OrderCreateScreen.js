import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/* Components */
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import HeaderContent from "../../components/HeaderContent";
import ButtonGoBack from "../../components/ButtonGoBack";

/* Form components */
import Textarea from "../../components/form/Textarea";
import Checkbox from "../../components/form/Checkbox";

/* Order components */
import ProductsTable from "../../components/order/ProductsTable";
import OrderInfo from "../../components/order/OrderInfo";
import Select from "../../components/Select";
import OrderCart from "../../components/order/OrderCart";
import LoaderHandler from "../../components/loader/LoaderHandler";

/* Constants */
import { TABLE_ALL_RESET } from "../../constants/tableConstants";
import { PRODUCT_LIST_RESET } from "../../constants/productConstants";
import { CLIENT_ALL_RESET } from "../../constants/clientConstants";
import { ORDER_CREATE_RESET } from "../../constants/orderConstants";

/* Actions */
import { allTables } from "../../actions/tableActions";
import { allClients } from "../../actions/clientActions";
import { createOrder } from "../../actions/orderActions";

const OrderCreateScreen = ({ history, match }) => {
    /* Get table from url */
    const tableFromUrl = window.location.href.indexOf("table") !== -1;
    /* Get delivery from url */
    const deliveryFromUrl = window.location.href.indexOf("delivery") !== -1;

    const [table, setTable] = useState(
        tableFromUrl ? parseInt(match.params.id) : null
    );
    const [client, setClient] = useState(null);
    const [delivery, setDelivery] = useState(deliveryFromUrl);
    const [note, setNote] = useState("");
    const [errors, setErrors] = useState({});
    const [total, setTotal] = useState(0);
    const [productsInOrder, setProductsInOrder] = useState([]);

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    //order create state
    const orderCreate = useSelector((state) => state.orderCreate);
    const { success, loading, error } = orderCreate;

    //tables list state
    const tableAll = useSelector((state) => state.tableAll);
    const {
        loading: loadingAllTables,
        error: errorAllTables,
        tables,
    } = tableAll;

    //client list state
    const clientAll = useSelector((state) => state.clientAll);
    const {
        loading: loadingAllClients,
        error: errorAllClients,
        clients,
    } = clientAll;

    useEffect(() => {
        if (success) {
            dispatch({ type: PRODUCT_LIST_RESET });
            dispatch({ type: TABLE_ALL_RESET });
            dispatch({ type: CLIENT_ALL_RESET });
            dispatch({ type: ORDER_CREATE_RESET });
            if (delivery) {
                history.push("/delivery");
            } else {
                history.push("/active");
            }
        } else {
            dispatch(allClients());
            dispatch(allTables());
        }
    }, [dispatch, history, success, error]);

    const handleSubmit = (e) => {
        e.preventDefault();

        /* Set Errors */
        let errorsCheck = {};
        if (!table && !delivery) {
            errorsCheck.table = "Table is required";
        }
        if (!client) {
            errorsCheck.client = "Client is required";
        }

        if (productsInOrder.length < 1) {
            errorsCheck.products = "Cart cannot by empty";
        }

        /* Check errors */
        if (Object.keys(errorsCheck).length > 0) {
            setErrors(errorsCheck);
        } else {
            setErrors({});
        }

        if (Object.keys(errorsCheck).length === 0) {
            /* Create order */
            const order = {
                total: total,
                tableId: !delivery ? table : 0,
                clientId: client,
                products: productsInOrder,
                delivery: delivery,
                note: note,
            };
            /* Make request */
            dispatch(createOrder(order));
        }
    };

    /* Filter tables */
    const filterFreeTables = () => {
        const mappedTables = tables.filter((table) => {
            return table.occupied === false;
        });
        return mappedTables;
    };

    const renderProductsTable = () => (
        <ProductsTable
            productsInOrder={productsInOrder}
            setProductsInOrder={setProductsInOrder}
        />
    );

    const renderCart = () => (
        <>
            {errors.products && (
                <Message message={errors.products} color={"warning"} />
            )}
            <OrderInfo
                total={total}
                setTotal={setTotal}
                productsInOrder={productsInOrder}
            />
            <OrderCart
                productsInOrder={productsInOrder}
                setProductsInOrder={setProductsInOrder}
            />
        </>
    );

    const renderTablesSelect = () => (
        <LoaderHandler loading={loadingAllTables} error={errorAllTables}>
            <Select
                data={table}
                setData={setTable}
                items={filterFreeTables(tables)}
                disabled={delivery}
            />
            {errors.table && (
                <Message message={errors.table} color={"warning"} />
            )}
        </LoaderHandler>
    );

    const renderClientsSelect = () => (
        <LoaderHandler loading={loadingAllClients} error={errorAllClients}>
            <Select data={client} setData={setClient} items={clients} />
            {errors.client && (
                <Message message={errors.client} color={"warning"} />
            )}
        </LoaderHandler>
    );

    const renderDeliveryCheckbox = () => (
        <Checkbox name={"delivery"} data={delivery} setData={setDelivery} />
    );

    const renderNoteTextarea = () => (
        <Textarea
            title={"Note (optional)"}
            rows={3}
            data={note}
            setData={setNote}
        />
    );

    const renderSubmitButton = () => (
        <button
            onClick={handleSubmit}
            className="btn btn-success btn-lg float-right "
        >
            Submit
        </button>
    );

    return (
        <>
            {/* Content Header (Page header) */}
            <HeaderContent name={"Orders"} />

            {/* Main content */}
            <section className="content">
                <div className="container-fluid">
                    <ButtonGoBack history={history} />
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Create Order</h3>
                                    <Loader variable={loading} />
                                    <Message message={error} color={"danger"} />
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12 col-lg-6">
                                            {renderProductsTable()}
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            {renderCart()}
                                            <div className="row">
                                                <div className="col-12 col-md-6">
                                                    {renderTablesSelect()}
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    {renderClientsSelect()}
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                {renderDeliveryCheckbox()}
                                            </div>
                                            {renderNoteTextarea()}
                                        </div>
                                    </div>
                                    {renderSubmitButton()}
                                </div>
                                {/* /.card-body */}
                            </div>
                        </div>
                        {/* /.col */}
                    </div>
                    {/* /.row */}
                </div>
                {/* /.container-fluid */}
            </section>
        </>
    );
};

export default OrderCreateScreen;
