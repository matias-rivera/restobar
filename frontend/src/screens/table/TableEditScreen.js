import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/* Components */
import Input from "../../components/form/Input";
import HeaderContent from "../../components/HeaderContent";
import Checkbox from "../../components/form/Checkbox";
import ButtonGoBack from "../../components/ButtonGoBack";
import LoaderHandler from "../../components/loader/LoaderHandler";

/* Constants */
import {
    TABLE_UPDATE_RESET,
    TABLE_DETAILS_RESET,
    TABLE_DELETE_RESET,
} from "../../constants/tableConstants";

/* Actions */
import { listTableDetails, updateTable } from "../../actions/tableActions";

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

    useEffect(() => {
        //after update redirect to users
        if (successUpdate) {
            dispatch({ type: TABLE_UPDATE_RESET });
            dispatch({ type: TABLE_DETAILS_RESET });
            dispatch({ type: TABLE_DELETE_RESET });

            history.push("/table");
        }

        //load table data
        if (table) {
            if (!table.name || table.id !== tableId) {
                dispatch(listTableDetails(tableId));
            } else {
                //set states
                setName(table.name);
                setOccupied(table.occupied);
            }
        }
    }, [dispatch, history, tableId, table, successUpdate]);

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

    const renderForm = () => (
        <form onSubmit={handleSubmit}>
            <Input
                name={"name"}
                type={"text"}
                data={name}
                setData={setName}
                errors={errors}
            />
            <Checkbox name={"occupied"} data={occupied} setData={setOccupied} />

            <hr />
            <button type="submit" className="btn btn-success">
                Submit
            </button>
        </form>
    );

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

export default TableEditScreen;
