import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

/* components */
import LoaderHandler from "../loader/LoaderHandler";
import Pagination from "../Pagination";
import Search from "../Search";
import { BigSpin } from "../loader/SvgLoaders";

/* actions */
import { listProducts } from "../../actions/productActions";

const ProductsTable = ({
    productsInOrder,
    setProductsInOrder,
    productsAlreadyOrdered,
}) => {
    //add product to order
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const [products, setProducts] = useState([]);

    const addProduct = (e, product) => {
        e.preventDefault();

        //product object
        const productIn = {
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            quantity: 1,
        };
        //if is already in order
        if (!inOrder(productIn, productsInOrder)) {
            setProductsInOrder([...productsInOrder, productIn]);
        } else {
            alert("Product already in order");
        }
    };

    //product list state
    const productList = useSelector((state) => state.productList);
    const {
        loading: loadingProductList,
        error: errorProductList,
        products: productsFromState,
        page,
        pages,
    } = productList;

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));
    }, [keyword, pageNumber]);

    useEffect(() => {
        if (productsFromState) {
            setProducts(mapProducts(productsFromState));
        }
    }, [productsFromState]);

    //check if product is already in order
    const inOrder = (obj, list) => {
        for (let index = 0; index < list.length; index++) {
            if (obj.id === list[index].id) {
                return list[index];
            }
        }
        return false;
    };

    //refresh products table
    const refreshProducts = (e) => {
        e.preventDefault();
        dispatch(listProducts(keyword, pageNumber));
    };

    //check stock to show
    const showStock = (product) => {
        const productInOrder = productsInOrder.find(
            (productIn) => productIn.id === product.id
        );
        if (productInOrder) return product.stock - productInOrder.quantity;
        return product.stock;
    };

    const mapProducts = (productsToMap) => {
        if (!productsAlreadyOrdered) return productsToMap;

        const mappedProducts = productsToMap.map((item) => {
            productsAlreadyOrdered.map((item2) => {
                if (item.id === item2.id) {
                    item.stock = item.stock + item2.quantity;
                }
            });
            return item;
        });
        return mappedProducts;
    };

    const renderRefreshButton = () => (
        <button className="btn btn-info float-right" onClick={refreshProducts}>
            <i className="fas fa-sync-alt"></i>
        </button>
    );

    const renderProducts = () => (
        <table id="productsTable" className="table table-bordered table-hover ">
            <thead
                style={{
                    color: "#fff",
                }}
                className="bg-info"
            >
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>${product.price}</td>
                        <td>{showStock(product)}</td>
                        {inOrder(product, productsInOrder) ? (
                            <td className="text-center">
                                <button disabled className="btn btn-primary">
                                    In Order
                                </button>
                            </td>
                        ) : product.stock > 0 ? (
                            <td className="text-center">
                                <button
                                    className="btn btn-success"
                                    onClick={(e) => addProduct(e, product)}
                                >
                                    <i className="fas fa-plus"></i>
                                </button>
                            </td>
                        ) : (
                            <td className="text-center">
                                <button disabled className="btn btn-danger">
                                    Out of Stock
                                </button>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <>
            {renderRefreshButton()}
            <Search
                keyword={keyword}
                setKeyword={setKeyword}
                setPage={setPageNumber}
            />
            <LoaderHandler
                loading={loadingProductList}
                error={errorProductList}
                render={renderProducts}
                loader={<BigSpin />}
            />

            <Pagination pages={pages} page={page} setPage={setPageNumber} />
        </>
    );
};

export default ProductsTable;
