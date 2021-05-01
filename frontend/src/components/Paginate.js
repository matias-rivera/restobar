import React from "react";
import { Link } from "react-router-dom";

const Paginate = ({ item, pages, page, keyword = null }) => {
    return (
        pages > 1 && (
            <ul className="pagination">
                <Link
                    style={{ pointerEvents: page > 1 ? "" : "none" }}
                    to={
                        keyword
                            ? `/${item}/search/${keyword}/page/${page - 1}`
                            : `/${item}/page/${page - 1}`
                    }
                >
                    <li className="page-item">
                        <span
                            className="page-link"
                            style={{ color: page > 1 ? "" : "gray" }}
                        >
                            Previous
                        </span>
                    </li>
                </Link>
                {[...Array(pages).keys()].map((x) => (
                    <Link
                        key={x + 1}
                        to={
                            keyword
                                ? `/${item}/search/${keyword}/page/${x + 1}`
                                : `/${item}/page/${x + 1}`
                        }
                    >
                        <li
                            className={`page-item ${
                                x + 1 === page ? "active" : ""
                            }`}
                        >
                            <span className="page-link">{x + 1}</span>
                        </li>
                    </Link>
                ))}
                <Link
                    style={{ pointerEvents: page < pages ? "" : "none" }}
                    to={
                        keyword
                            ? `/${item}/search/${keyword}/page/${page + 1}`
                            : `/${item}/page/${page + 1}`
                    }
                >
                    <li className="page-item">
                        <span
                            className="page-link"
                            style={{ color: page < pages ? "" : "gray" }}
                        >
                            Next
                        </span>
                    </li>
                </Link>
            </ul>
        )
    );
};

export default Paginate;
