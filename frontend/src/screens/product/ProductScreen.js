import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

/* Components */
import HeaderContent from "../../components/HeaderContent";
import Modal from "react-modal";
import Input from "../../components/form/Input";
import ModalButton from "../../components/ModalButton";
import DataTableLoader from "../../components/loader/DataTableLoader";
import Select from "../../components/Select";

/* Actions */
import { listProducts, createProduct } from "../../actions/productActions";
import { allCategories } from "../../actions/categoryActions";

/* Styles */
import { modalStyles } from "../../utils/styles";
import Search from "../../components/Search";
import LoaderHandler from "../../components/loader/LoaderHandler";
import Pagination from "../../components/Pagination";
import Message from "../../components/Message";

Modal.setAppElement("#root");

const ProductScreen = ({ history }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [category, setCategory] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    //categories state
    const categoryAll = useSelector((state) => state.categoryAll);
    const {
        loading: loadingCategories,
        error: errorCategories,
        categories,
    } = categoryAll;

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productCreate = useSelector((state) => state.productCreate);
    const {
        loading: createLoading,
        success: createSuccess,
        error: createError,
    } = productCreate;

    useEffect(() => {
        if (createSuccess) {
            setName("");
            setPrice(0);
            setStock(0);
            setCategory(null);

            setModalIsOpen(false);
        }
        dispatch(listProducts(keyword, pageNumber));
        dispatch(allCategories());
    }, [dispatch, history, userInfo, pageNumber, keyword, createSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let errorsCheck = {};

        if (!name) {
            errorsCheck.name = "Name is required";
        }
        if (!price) {
            errorsCheck.price = "Price is required";
        }

        if (!stock) {
            errorsCheck.stock = "Stock is required";
        }
        if (!category) {
            errorsCheck.category = "Category is required";
        }

        if (Object.keys(errorsCheck).length > 0) {
            setErrors(errorsCheck);
        } else {
            setErrors({});
        }

        if (Object.keys(errorsCheck).length === 0) {
            const product = {
                name: name,
                price: price,
                stock: stock,
                categoryId: category,
            };

            dispatch(createProduct(product));
        }
    };

    const renderModalCreateProduct = () => (
        <>
            <ModalButton
                modal={modalIsOpen}
                setModal={setModalIsOpen}
                classes={"btn-success btn-lg mb-2"}
            />
            <Modal
                style={modalStyles}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
            >
                <LoaderHandler loading={createLoading} error={createError} />
                <h2>Create Form</h2>
                <form onSubmit={handleSubmit}>
                    <Input
                        name={"name"}
                        type={"text"}
                        data={name}
                        setData={setName}
                        errors={errors}
                    />
                    <Input
                        name={"price"}
                        type={"number"}
                        data={price}
                        setData={setPrice}
                        errors={errors}
                    />
                    <Input
                        name={"stock"}
                        type={"number"}
                        data={stock}
                        setData={setStock}
                        errors={errors}
                    />

                    <LoaderHandler
                        loading={loadingCategories}
                        error={errorCategories}
                    >
                        <Select
                            data={category}
                            setData={setCategory}
                            items={categories}
                        />
                    </LoaderHandler>

                    {errors.category && (
                        <Message message={errors.category} color={"warning"} />
                    )}
                    <hr />
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <ModalButton
                        modal={modalIsOpen}
                        setModal={setModalIsOpen}
                        classes={"btn-danger float-right"}
                    />
                </form>
            </Modal>
        </>
    );

    const renderProductsTable = () => (
        <LoaderHandler
            loading={loading}
            error={error}
            loader={<DataTableLoader />}
        >
            <table className="table table-hover text-nowrap">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th className="d-none d-sm-table-cell">Created At</th>
                        <th className="d-none d-sm-table-cell">Category</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            <td className="d-none d-sm-table-cell">
                                {product.createdAt.slice(0, 10)}
                            </td>
                            <td className="d-none d-sm-table-cell">
                                {product.category.name}
                            </td>
                            <td>
                                <Link
                                    to={`/product/${product.id}/edit`}
                                    className="btn btn-warning btn-lg"
                                >
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </LoaderHandler>
    );

    return (
        <>
            <HeaderContent name={"Products"} />
            {/* Main content */}

            <section className="content">
                <div className="container-fluid">
                    {renderModalCreateProduct()}

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        Products table
                                    </h3>
                                    <div className="card-tools">
                                        <Search
                                            keyword={keyword}
                                            setKeyword={setKeyword}
                                            setPage={setPageNumber}
                                        />
                                    </div>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body table-responsive p-0">
                                    {renderProductsTable()}
                                </div>
                                {/* /.card-body */}
                            </div>
                            <Pagination
                                page={page}
                                pages={pages}
                                setPage={setPageNumber}
                            />
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

export default ProductScreen;
