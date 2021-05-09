import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

/* Components */
import HeaderContent from "../../components/HeaderContent";
import Modal from "react-modal";
import Input from "../../components/form/Input";
import ModalButton from "../../components/ModalButton";
import DataTableLoader from "../../components/loader/DataTableLoader";
import LoaderHandler from "../../components/loader/LoaderHandler";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";

/* Actions */
import { createClient, listClients } from "../../actions/clientActions";

/* Styles */
import { modalStyles } from "../../utils/styles";

Modal.setAppElement("#root");

const ClientScreen = ({ history }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [keyword, setKeyword] = useState("");

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [dni, setDni] = useState("");

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const clientList = useSelector((state) => state.clientList);
    const { loading, error, clients, page, pages } = clientList;

    const clientCreate = useSelector((state) => state.clientCreate);
    const {
        loading: createLoading,
        success: createSuccess,
        error: createError,
    } = clientCreate;

    useEffect(() => {
        dispatch(listClients(keyword, pageNumber));
        if (createSuccess) {
            setName("");
            setAddress("");
            setPhone("");
            setEmail("");
            setDni("");
            setModalIsOpen(false);
        }
    }, [dispatch, history, userInfo, pageNumber, keyword, createSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let errorsCheck = {};

        if (!name) {
            errorsCheck.name = "Name is required";
        }
        if (!address) {
            errorsCheck.address = "Address is required";
        }

        if (!phone) {
            errorsCheck.phone = "Phone is required";
        }
        if (!email) {
            errorsCheck.email = "Email is required";
        }

        if (!dni) {
            errorsCheck.dni = "DNI is required";
        }

        if (Object.keys(errorsCheck).length > 0) {
            setErrors(errorsCheck);
        } else {
            setErrors({});
        }

        if (Object.keys(errorsCheck).length === 0) {
            const client = {
                name: name,
                address: address,
                phone: phone,
                email: email,
                dni: dni,
            };

            dispatch(createClient(client));
        }
    };

    const renderModalCreateClient = () => (
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
                        name={"address"}
                        type={"text"}
                        data={address}
                        setData={setAddress}
                        errors={errors}
                    />
                    <Input
                        name={"phone"}
                        type={"text"}
                        data={phone}
                        setData={setPhone}
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
                        name={"dni"}
                        type={"text"}
                        data={dni}
                        setData={setDni}
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
        </>
    );

    const renderClientsTable = () => (
        <table className="table table-hover text-nowrap">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th className="d-none d-sm-table-cell">Address</th>
                    <th className="d-none d-sm-table-cell">Phone</th>
                    <th className="d-none d-sm-table-cell">Email</th>
                    <th className="d-none d-sm-table-cell">DNI</th>
                    <th className="d-none d-sm-table-cell">Created At</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {clients.map((client) => (
                    <tr key={client.id}>
                        <td>{client.id}</td>
                        <td>{client.name}</td>
                        <td className="d-none d-sm-table-cell">
                            {client.address}
                        </td>
                        <td className="d-none d-sm-table-cell">
                            {client.phone}
                        </td>
                        <td className="d-none d-sm-table-cell">
                            {client.email}
                        </td>
                        <td className="d-none d-sm-table-cell">{client.dni}</td>
                        <td className="d-none d-sm-table-cell">
                            {client.createdAt.slice(0, 10)}
                        </td>
                        <td>
                            <Link
                                to={`/client/${client.id}/edit`}
                                className="btn btn-warning btn-lg"
                            >
                                Edit
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <>
            <HeaderContent name={"Clients"} />

            <section className="content">
                <div className="container-fluid">
                    {renderModalCreateClient()}
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Clients</h3>
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
                                    <LoaderHandler
                                        loading={loading}
                                        error={error}
                                        loader={<DataTableLoader />}
                                        render={renderClientsTable}
                                    />
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

export default ClientScreen;
