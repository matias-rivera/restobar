import React from "react";

const OrderCart = ({ productsInOrder, setProductsInOrder }) => {
    //remove product from order
    const removeProduct = (e, product) => {
        e.preventDefault();

        //remove product
        const productsIn = productsInOrder.filter(function (item) {
            return item.id !== product.id;
        });

        setProductsInOrder(productsIn);
    };

    //increase product quantiity
    const addUnit = (e, product) => {
        e.preventDefault();

        const newProducts = productsInOrder.map((el) =>
            el.id === product.id ? { ...el, quantity: el.quantity + 1 } : el
        );
        setProductsInOrder(newProducts);
    };

    //decrease product quantity
    const removeUnit = (e, product) => {
        e.preventDefault();

        const newProducts = productsInOrder.map((el) =>
            el.id === product.id ? { ...el, quantity: el.quantity - 1 } : el
        );
        setProductsInOrder(newProducts);
    };

    const renderCart = () => (
        <>
            {productsInOrder.length > 0 &&
                productsInOrder.map((productIn, i) => (
                    <tr key={i}>
                        <td>{productIn.name}</td>
                        <td>{productIn.quantity}</td>
                        <td className="d-flex justify-content-around">
                            <button
                                disabled={productIn.quantity < 2}
                                className="btn btn-danger"
                                onClick={(e) => removeUnit(e, productIn)}
                            >
                                -
                            </button>
                            <button
                                disabled={productIn.quantity >= productIn.stock}
                                className="btn btn-primary"
                                onClick={(e) => addUnit(e, productIn)}
                            >
                                +
                            </button>
                        </td>
                        <td className="h6">
                            ${productIn.price * productIn.quantity}
                        </td>
                        <td>
                            <button
                                className="btn btn-danger"
                                onClick={(e) => removeProduct(e, productIn)}
                            >
                                X
                            </button>
                        </td>
                    </tr>
                ))}
        </>
    );

    return (
        <>
            <table
                id="orderTable"
                className="table table-bordered table-hover text-center"
            >
                <thead>
                    <tr>
                        <th className="d-none d-sm-table-cell"></th>
                        <th>Product</th>
                        <th>Units</th>
                        <th></th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>{renderCart()}</tbody>
            </table>
        </>
    );
};

export default OrderCart;
