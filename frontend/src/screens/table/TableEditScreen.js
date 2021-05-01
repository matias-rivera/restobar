import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Input from "../../components/form/Input";
import HeaderContent from "../../components/HeaderContent";
import {
    TABLE_UPDATE_RESET,
    TABLE_DETAILS_RESET,
    TABLE_DELETE_RESET,
} from "../../constants/tableConstants";
import {
    listTableDetails,
    deleteTable,
    updateTable,
} from "../../actions/tableActions";
import Checkbox from "../../components/form/Checkbox";
import ButtonGoBack from "../../components/ButtonGoBack";

const TableEditScreen = ({ history, match }) => {
    const tableId = parseInt(match.params.id);

    const [name, setName] = useState("");
    const [occupied, setOccupied] = useState(false);

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    //table details state
    const tableDetails = useSelector((state) => state.tableDetails);
    const { loading, error, table } = tableDetails;

    //table update state
    const tableUpdate = useSelector((state) => state.tableUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = tableUpdate;

    //table delete state
    const tableDelete = useSelector((state) => state.tableDelete);
    const { success: successDelete } = tableDelete;

    useEffect(() => {
        //after update redirect to users
        if (successUpdate || successDelete) {
            dispatch({ type: TABLE_UPDATE_RESET });
            dispatch({ type: TABLE_DETAILS_RESET });
            dispatch({ type: TABLE_DELETE_RESET });

            history.push("/table");
        }

        //load table data
        if (!table.name || table.id !== tableId) {
            dispatch(listTableDetails(tableId));
        } else {
            //set states
            setName(table.name);
            setOccupied(table.occupied);
        }
    }, [dispatch, history, tableId, table, successUpdate, successDelete]);

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
            const tableUpdated = {
                id: tableId,
                name: name,
                occupied: occupied,
            };
            dispatch(updateTable(tableUpdated));
        }
    };

    //Delete function
    /*  const handleDelete = (e) => {
        e.preventDefault()
        if(window.confirm('Are you sure?')){
            dispatch(deleteTable(tableId))
        }
    } */

    return (
        <>
            {/* Content Header (Page header) */}
            <HeaderContent name={"Tables"} />

            {/* Main content */}

            <section className="content">
                <div className="container-fluid">
                    <ButtonGoBack history={history} />
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Edit Table</h3>
                                    <Loader variable={loadingUpdate} />
                                    <Message
                                        message={errorUpdate}
                                        color={"danger"}
                                    />
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    {loading ? (
                                        <Loader variable={loading} />
                                    ) : error ? (
                                        <Message
                                            message={error}
                                            color={"danger"}
                                        />
                                    ) : (
                                        <form onSubmit={handleSubmit}>
                                            <Input
                                                name={"name"}
                                                type={"text"}
                                                data={name}
                                                setData={setName}
                                                errors={errors}
                                            />
                                            <Checkbox
                                                name={"occupied"}
                                                data={occupied}
                                                setData={setOccupied}
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
                                    )}
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

export default TableEditScreen;
