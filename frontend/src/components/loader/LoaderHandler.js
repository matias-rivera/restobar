import React from "react";

import Loader from "../Loader";
import Message from "../Message";

const LoaderHandler = ({ loading, error, loader, render }) => {
    return (
        <>
            {loading ? (
                loader ? (
                    loader
                ) : (
                    <Loader variable={loading} />
                )
            ) : error ? (
                <Message message={error} color={"danger"} />
            ) : render ? (
                render()
            ) : (
                <></>
            )}
        </>
    );
};
export default LoaderHandler;
