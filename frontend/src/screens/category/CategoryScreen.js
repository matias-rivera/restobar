import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginate from "../../components/Paginate";
import TableCrud from "../../components/TableCrud";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { createCategory, listCategories } from "../../actions/categoryActions";
import { Route, Link } from "react-router-dom";
import HeaderContent from "../../components/HeaderContent";
import ModalButton from "../../components/ModalButton";
import { customStyles } from "../../utils";
import Modal from "react-modal";
import Input from "../../components/form/Input";
import SearchBoxMini from "../../components/SearchBoxMini";
import DataTableLoader from "../../components/loader/DataTableLoader";

const CategoryScreen = ({ history, match }) => {
    const keyword = match.params.keyword || "";
    const pageNumber = match.params.pageNumber || 1;

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const categoryList = useSelector((state) => state.categoryList);
    const { loading, error, categories, page, pages } = categoryList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const categoryCreate = useSelector((state) => state.categoryCreate);
    const {
        loading: createLoading,
        success: createSuccess,
        error: createError,
    } = categoryCreate;

    useEffect(() => {
        dispatch(listCategories(keyword, pageNumber));
    }, [dispatch, history, userInfo, pageNumber, keyword, createSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let errorsCheck = {};

        if (!name) {
            errorsCheck.name = "Name is required";
        }

        if (Object.keys(errorsCheck).length > 0) {
            setErrors(errorsCheck);
        } else {
            setErrors({});
        }

        if (Object.keys(errorsCheck).length === 0) {
            const category = {
                name: name,
            };

            dispatch(createCategory(category));

            setName("");

            setModalIsOpen(false);
        }
    };

    return (
        <>
            <HeaderContent name={"Categories"} />

            {/* Main content */}

            <section className="content">
                <div className="container-fluid">
                    <ModalButton
                        modal={modalIsOpen}
                        setModal={setModalIsOpen}
                        classes={"btn-success btn-lg mb-2"}
                    />
                    <Modal
                        style={customStyles}
                        isOpen={modalIsOpen}
                        onRequestClose={() => setModalIsOpen(false)}
                    >
                        <h2>Create Form</h2>
                        <form onSubmit={handleSubmit}>
                            <Input
                                name={"name"}
                                type={"text"}
                                data={name}
                                setData={setName}
                                errors={errors}
                            />

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

                    <div className="row">
                        <div className="col-12">
                            <Loader variable={createLoading} />
                            <Message message={createError} color={"danger"} />

                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        Categories table
                                    </h3>
                                    <div className="card-tools">
                                        <Route
                                            render={({ history }) => (
                                                <SearchBoxMini
                                                    history={history}
                                                    item={"category"}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body table-responsive p-0">
                                    {loading ? (
                                        <DataTableLoader />
                                    ) : error ? (
                                        <Message
                                            message={error}
                                            color={"danger"}
                                        />
                                    ) : (
                                        <>
                                            <table className="table table-hover text-nowrap">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Name</th>
                                                        <th className="d-none d-sm-table-cell">
                                                            Created At
                                                        </th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {categories.map(
                                                        (category) => (
                                                            <tr
                                                                key={
                                                                    category.id
                                                                }
                                                            >
                                                                <td>
                                                                    {
                                                                        category.id
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        category.name
                                                                    }
                                                                </td>
                                                                <td className="d-none d-sm-table-cell">
                                                                    {category.createdAt.slice(
                                                                        0,
                                                                        10
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    <Link
                                                                        to={`/category/${category.id}/edit`}
                                                                        className="btn btn-warning btn-lg"
                                                                    >
                                                                        Edit
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </>
                                    )}
                                </div>
                                {/* /.card-body */}
                            </div>

                            <Paginate
                                item={"category"}
                                pages={pages}
                                page={page}
                                keyword={keyword ? keyword : null}
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

export default CategoryScreen;
