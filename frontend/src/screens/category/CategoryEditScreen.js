import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/* Components */
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import HeaderContent from "../../components/HeaderContent";
import Input from "../../components/form/Input";
import ButtonGoBack from "../../components/ButtonGoBack";

/* Constants */
import {
    CATEGORY_UPDATE_RESET,
    CATEGORY_DETAILS_RESET,
    CATEGORY_DELETE_RESET,
} from "../../constants/categoryConstants";

/* Actions */
import {
    updateCategory,
    listCategoryDetails,
} from "../../actions/categoryActions";
import LoaderHandler from "../../components/loader/LoaderHandler";

const CategoryEditScreen = ({ history, match }) => {
    const categoryId = parseInt(match.params.id);

    const [name, setName] = useState("");

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    //category details state
    const categoryDetails = useSelector((state) => state.categoryDetails);
    const { loading, error, category } = categoryDetails;

    //category update state
    const categoryUpdate = useSelector((state) => state.categoryUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = categoryUpdate;

    useEffect(() => {
        //after update redirect to users
        if (successUpdate) {
            dispatch({ type: CATEGORY_UPDATE_RESET });
            dispatch({ type: CATEGORY_DETAILS_RESET });
            dispatch({ type: CATEGORY_DELETE_RESET });
            history.push("/category");
        }

        //load product data
        if (category) {
            if (!category.name || category.id !== categoryId) {
                dispatch(listCategoryDetails(categoryId));
            } else {
                //set states
                setName(category.name);
            }
        }
    }, [dispatch, history, categoryId, category, successUpdate]);

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
            dispatch(
                updateCategory({
                    id: categoryId,
                    name,
                })
            );
        }
    };

    const renderForm = () => (
        <form onSubmit={handleSubmit}>
            <Input
                name={"name"}
                type={"text"}
                data={name}
                setData={setName}
                errors={errors}
            />
            <hr />
            <button type="submit" className="btn btn-success">
                Submit
            </button>
        </form>
    );

    return (
        <>
            {/* Content Header (Page header) */}
            <HeaderContent name={"Categories"} />
            {/* Main content */}

            <section className="content">
                <div className="container-fluid">
                    <ButtonGoBack history={history} />
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        Edit Category
                                    </h3>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    <LoaderHandler
                                        loading={loadingUpdate}
                                        error={errorUpdate}
                                    />
                                    <LoaderHandler
                                        loading={loading}
                                        error={error}
                                        render={renderForm}
                                    />
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

export default CategoryEditScreen;
