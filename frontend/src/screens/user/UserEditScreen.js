import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    listUserDetails,
    deleteUser,
    updateUser,
} from "../../actions/userActions";
import {
    USER_UPDATE_RESET,
    USER_DETAILS_RESET,
    USER_DELETE_RESET,
} from "../../constants/userConstants";
import { Link } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import HeaderContent from "../../components/HeaderContent";
import Input from "../../components/form/Input";
import Checkbox from "../../components/form/Checkbox";
import ButtonGoBack from "../../components/ButtonGoBack";

const UserEditScreen = ({ history, match }) => {
    const userId = parseInt(match.params.id);

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [avatar, setAvatar] = useState(false);

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    //user details state
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    //user update state
    const userUpdate = useSelector((state) => state.userUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate;

    //user delete state
    const userDelete = useSelector((state) => state.userDelete);
    const { success: successDelete } = userDelete;

    useEffect(() => {
        if (user) {
            if (user.isAdmin) {
                dispatch({ type: USER_UPDATE_RESET });
                dispatch({ type: USER_DETAILS_RESET });
                dispatch({ type: USER_DELETE_RESET });
                history.push("/not-authorized");
            }
        }
        //after update redirect to users
        if (successUpdate || successDelete) {
            dispatch({ type: USER_UPDATE_RESET });
            dispatch({ type: USER_DETAILS_RESET });
            dispatch({ type: USER_DELETE_RESET });
            history.push("/user");
        }
        //load product data
        if (!user || !user.name || user.id !== userId) {
            dispatch(listUserDetails(userId));
        } else {
            //set states s
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [dispatch, history, userId, user, successUpdate, successDelete]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let errorsCheck = {};
        if (!name) {
            errorsCheck.name = "Name is required.";
        }
        if (password > 1 && password < 6) {
            errorsCheck.password =
                "Password must be at least 6 characters long.";
        }

        if (!email) {
            errorsCheck.email = "Email is required.";
        }

        if (Object.keys(errorsCheck).length > 0) {
            setErrors(errorsCheck);
        } else {
            setErrors({});
        }

        if (Object.keys(errorsCheck).length === 0 && !user.isAdmin) {
            dispatch(
                updateUser({
                    id: userId,
                    name,
                    email,
                    password,
                    avatar,
                    isAdmin,
                })
            );
        }
    };

    //handle delete
    /* const handleDelete = (e) => {
        e.preventDefault()
        if(window.confirm('Are you sure?')){
            dispatch(deleteUser(userId))
        }
    } */

    return (
        <>
            {/* Content Header (Page header) */}
            <HeaderContent name={"Users"} />

            {/* Main content */}

            <section className="content">
                <div className="container-fluid">
                    <ButtonGoBack history={history} />
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Edit User</h3>
                                    <Loader variable={loadingUpdate} />
                                    <Message
                                        message={errorUpdate}
                                        color={"danger"}
                                    />
                                    <Loader variable={loading} />
                                    <Message message={error} color={"danger"} />
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <Input
                                            name={"name"}
                                            type={"text"}
                                            data={name}
                                            setData={setName}
                                            errors={errors}
                                        />
                                        <Input
                                            name={"email"}
                                            type={"email"}
                                            data={email}
                                            setData={setEmail}
                                            errors={errors}
                                        />
                                        <Input
                                            name={"password"}
                                            type={"password"}
                                            data={password}
                                            setData={setPassword}
                                            errors={errors}
                                        />
                                        <Checkbox
                                            name={"Reset Avatar"}
                                            data={avatar}
                                            setData={setAvatar}
                                        />
                                        <hr />
                                        <Checkbox
                                            name={"Admin"}
                                            data={isAdmin}
                                            setData={setIsAdmin}
                                        />
                                        <hr />
                                        {/* <button className='btn btn-danger float-right' onClick={handleDelete}>Delete</button> */}
                                        <button
                                            type="submit"
                                            className="btn btn-success"
                                        >
                                            Submit
                                        </button>
                                    </form>
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

export default UserEditScreen;
