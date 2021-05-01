import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginate from "../../components/Paginate";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Route, Link } from "react-router-dom";
import HeaderContent from "../../components/HeaderContent";
import Modal from "react-modal";
import Input from "../../components/form/Input";
import { createClient, listClients } from "../../actions/clientActions";
import { customStyles } from "../../utils";
import ModalButton from "../../components/ModalButton";
import SearchBoxMini from "../../components/SearchBoxMini";
import DataTableLoader from "../../components/loader/DataTableLoader";

Modal.setAppElement("#root");

const ClientScreen = ({ history, match }) => {
    const keyword = match.params.keyword || "";
    const pageNumber = match.params.pageNumber || 1;

    const [modalIsOpen, setModalIsOpen] = useState(false);

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

            setName("");
            setAddress("");
            setPhone("");
            setEmail("");
            setDni("");

            setModalIsOpen(false);
        }
    };

    return (
        <>
            <HeaderContent name={"Clients"} />

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
                    <div className="row">
                        <div className="col-12">
                            <Loader variable={createLoading} />
                            <Message message={createError} color={"danger"} />

                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Clients</h3>
                                    <div className="card-tools">
                                        <Route
                                            render={({ history }) => (
                                                <SearchBoxMini
                                                    history={history}
                                                    item={"client"}
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
                                                            Address
                                                        </th>
                                                        <th className="d-none d-sm-table-cell">
                                                            Phone
                                                        </th>
                                                        <th className="d-none d-sm-table-cell">
                                                            Email
                                                        </th>
                                                        <th className="d-none d-sm-table-cell">
                                                            DNI
                                                        </th>
                                                        <th className="d-none d-sm-table-cell">
                                                            Created At
                                                        </th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {clients.map((client) => (
                                                        <tr key={client.id}>
                                                            <td>{client.id}</td>
                                                            <td>
                                                                {client.name}
                                                            </td>
                                                            <td className="d-none d-sm-table-cell">
                                                                {client.address}
                                                            </td>
                                                            <td className="d-none d-sm-table-cell">
                                                                {client.phone}
                                                            </td>
                                                            <td className="d-none d-sm-table-cell">
                                                                {client.email}
                                                            </td>
                                                            <td className="d-none d-sm-table-cell">
                                                                {client.dni}
                                                            </td>
                                                            <td className="d-none d-sm-table-cell">
                                                                {client.createdAt.slice(
                                                                    0,
                                                                    10
                                                                )}
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
                                        </>
                                    )}
                                </div>
                                {/* /.card-body */}
                            </div>

                            <Paginate
                                item={"client"}
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

export default ClientScreen;
