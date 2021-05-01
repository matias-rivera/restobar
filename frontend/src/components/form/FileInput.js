import React from "react";
import { capitalize } from "../../utils/functions";
import Loader from "../Loader";

const FileInput = ({ fileHandler, name, image, uploading }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{capitalize(name)}</label>
            <div className="input-group">
                <label htmlFor={name} className="custom-file-label">
                    {image}
                </label>
                <input
                    type="file"
                    className="custom-file-input"
                    aria-describedby={name}
                    id={name}
                    onChange={fileHandler}
                />
            </div>
            {uploading && <Loader variable={uploading} />}
        </div>
    );
};

export default FileInput;
