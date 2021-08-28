import React, { useState, useEffect } from "react";
import ReactSelect from "react-select";

const Select = ({ items, data, setData, disabled, search = () => {} }) => {
    const [current, setCurrent] = useState(null);

    useEffect(() => {
        mapSelect().forEach((item) => {
            if (item.value === data) {
                setCurrent(item);
            }
        });
    }, [items, data]);

    const mapSelect = () => {
        const mapped = items.map((item) => ({
            label: item.name,
            value: item.id,
        }));
        return mapped;
    };

    const handleChange = (element) => {
        setCurrent(element);
        setData(parseInt(element.value));
    };

    return (
        <ReactSelect
            options={mapSelect()}
            onChange={handleChange}
            value={current}
            onKeyDown={search}
            onFocus={search}
            placeholder="Select value"
            isDisabled={disabled}
            isSearchable
        />
    );
};

export default Select;
