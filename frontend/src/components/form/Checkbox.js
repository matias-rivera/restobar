import React from "react";
import { capitalize } from "../../utils/functions";

const Checkbox = ({ name, data, setData }) => {
    return (
        <div className="form-group clearfix">
            <div className="icheck-primary d-inline">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id={name}
                    defaultValue
                    checked={data}
                    onChange={(e) => setData(e.target.checked)}
                />
                <label htmlFor={name}>{capitalize(name)}</label>
            </div>
        </div>
    );
};

export default Checkbox;
