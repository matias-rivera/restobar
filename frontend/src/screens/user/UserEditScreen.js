import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/* Components */
import HeaderContent from "../../components/HeaderContent";
import Input from "../../components/form/Input";
import Checkbox from "../../components/form/Checkbox";
import ButtonGoBack from "../../components/ButtonGoBack";
import LoaderHandler from "../../components/loader/LoaderHandler";

/* Constants */
import {
    USER_UPDATE_RESET,
    USER_DETAILS_RESET,
    USER_DELETE_RESET,
} from "../../constants/userConstants";

/* Actions */
import { listUserDetails, updateUser } from "../../actions/userActions";

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
        if (successUpdate) {
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
    }, [dispatch, history, userId, user, successUpdate]);

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

    const renderForm = () => (
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
            <Checkbox name={"Reset Avatar"} data={avatar} setData={setAvatar} />
            <hr />
            <Checkbox name={"Admin"} data={isAdmin} setData={setIsAdmin} />
            <hr />
            <button type="submit" className="btn btn-success">
                Submit
            </button>
        </form>
    );

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

export default UserEditScreen;
