import React from "react";

const Alert = ({ children }) => {
    return (
        <div className="alert alert-danger alert-dismissible">
            <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-hidden="true"
            >
                ×
            </button>
            <p>{children}</p>
        </div>
    );
};

export default Alert;
