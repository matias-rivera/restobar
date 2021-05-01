import React from "react";

import Loader from "../Loader";
import Message from "../Message";

const LoaderHandler = ({ loading, error, children }) => {
    return (
        <>
            {loading ? (
                <Loader variable={loading} />
            ) : error ? (
                <Message message={error} color={"danger"} />
            ) : (
                children
            )}
        </>
    );
};
export default LoaderHandler;
