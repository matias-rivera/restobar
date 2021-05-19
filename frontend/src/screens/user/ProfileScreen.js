import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import axios from "axios";

/* Components */
import HeaderContent from "../../components/HeaderContent";
import Input from "../../components/form/Input";
import ModalButton from "../../components/ModalButton";
import FileInput from "../../components/form/FileInput";
import DataTableLoader from "../../components/loader/DataTableLoader";
import LoaderHandler from "../../components/loader/LoaderHandler";

/* Constants */
import {
    USER_DETAILS_RESET,
    USER_LOGOUT,
    USER_UPDATE_RESET,
} from "../../constants/userConstants";

/* Actions */
import {
    listUserDetails,
    login,
    updateProfile,
} from "../../actions/userActions";

/* Styles */
import { modalStyles } from "../../utils/styles";

const ProfileScreen = ({ history }) => {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [image, setImage] = useState("");
    const [uploading, setUploading] = useState(false);

    const [modal, setModal] = useState(false);

    const [errors, setErrors] = useState({});

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
        //after update redirect to users
        if (successUpdate) {
            localStorage.removeItem("userInfo");
            dispatch({ type: USER_UPDATE_RESET });
            dispatch({ type: USER_DETAILS_RESET });
            dispatch({ type: USER_LOGOUT });
            dispatch(login(email, password ? password : passwordCheck));
            history.push("/login");
        }

        //load product data
        if ((!user || !user.name) && userInfo) {
            dispatch(listUserDetails(userInfo._id));
        } else {
            //set states
            setName(user.name);
            setEmail(user.email);
            setImage(user.image);
        }
    }, [dispatch, history, user, userInfo, successUpdate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let errorsCheck = {};

        if (!name) {
            errorsCheck.name = "Name is required.";
        }

        if (password.length > 0 && password.length < 6) {
            errorsCheck.password =
                "Password must be at least 6 characters long.";
        }

        if (!email) {
            errorsCheck.email = "Email is required.";
        }

        if (confirmPassword.length > 0 && confirmPassword.length < 6) {
            errorsCheck.confirmPassword =
                "Password must be at least 6 characters long.";
        }

        if (
            confirmPassword &&
            confirmPassword.length > 5 &&
            confirmPassword !== password
        ) {
            errorsCheck.confirmPassword = "Passwords must be the same.";
        }

        if (Object.keys(errorsCheck).length > 0) {
            setErrors(errorsCheck);
        } else {
            setErrors({});
        }

        if (Object.keys(errorsCheck).length === 0) {
            setModal(true);
        }
    };

    const handleModalSubmit = (e) => {
        e.preventDefault();

        let errorsCheck = {};

        if (!passwordCheck.length) {
            errorsCheck.passwordCheck = "Password is required.";
        }

        if (Object.keys(errorsCheck).length > 0) {
            setErrors(errorsCheck);
        } else {
            setErrors({});
        }

        if (Object.keys(errorsCheck).length === 0) {
            dispatch(
                updateProfile({
                    id: userInfo._id,
                    name,
                    email,
                    password,
                    image,
                    passwordCheck,
                })
            );
            setModal(false);
        }
    };

    // upload file
    const uploadingFileHandler = async (e) => {
        //get first element from files which one is the image
        const file = e.target.files[0];
        //form instance
        const formData = new FormData();
        //add file
        formData.append("image", file);
        //start loader
        setUploading(true);
        try {
            //form config
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };
            //api call to upload image
            const { data } = await axios.post("/api/upload", formData, config);
            //set image path
            setImage(data);
            //stop loader
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const imageName = (image) => {
        const imageArray = image.split(`uploads`);
        return imageArray[1];
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
            <Input
                name={"confirmPassword"}
                type={"password"}
                data={confirmPassword}
                setData={setConfirmPassword}
                errors={errors}
            />
            <FileInput
                fileHandler={uploadingFileHandler}
                name={"photo"}
                image={imageName(image)}
                uploading={uploading}
            />
            <hr />
            <button type="submit" className="btn btn-primary btn-block">
                Update
            </button>
        </form>
    );

    const renderInfo = () => (
        <>
            <div className="text-center">
                <img
                    className="profile-user-img img-fluid img-circle"
                    src={image}
                    alt="User profile picture"
                />
            </div>
            <h3 className="profile-username text-center">
                {userInfo && userInfo.name}
            </h3>
            <p className="text-muted text-center">
                {userInfo && userInfo.isAdmin ? "Administrator" : "Employee"}
            </p>
        </>
    );

    const renderProfile = () => (
        <>
            <LoaderHandler loading={loadingUpdate} error={errorUpdate} />
            {renderInfo()}
            {renderForm()}
        </>
    );

    const renderModalCheckPassword = () => (
        <Modal
            style={modalStyles}
            isOpen={modal}
            onRequestClose={() => setModal(false)}
        >
            <h2>Password check</h2>
            <p>
                For security reasons, please insert your actual password to
                confirm changes.
            </p>
            <form onSubmit={handleModalSubmit}>
                <Input
                    name={"passwordCheck"}
                    type={"password"}
                    data={passwordCheck}
                    setData={setPasswordCheck}
                    errors={errors}
                />
                <hr />
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>

                <ModalButton
                    modal={modal}
                    setModal={setModal}
                    classes={"btn-danger float-right"}
                />
            </form>
        </Modal>
    );
    return (
        <>
            {/* Content Header (Page header) */}
            <HeaderContent name={"Profile"} />
            {/* Main content */}
            <section className="content">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        {renderModalCheckPassword()}
                        <div className="col-12 col-md-6">
                            {/* Profile Image */}
                            <div className="card card-primary card-outline">
                                <div className="card-body box-profile">
                                    <LoaderHandler
                                        loading={loading}
                                        error={error}
                                        loader={<DataTableLoader />}
                                        render={renderProfile}
                                    />
                                </div>
                                {/* /.card-body */}
                            </div>
                            {/* /.card */}
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

export default ProfileScreen;
