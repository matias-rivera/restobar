import React from "react";

const Pagination = ({ pages, page, setPage }) => {
    return (
        pages > 1 && (
            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={() => setPage(page - 1)}
                            disabled={page < 2}
                        >
                            Previous
                        </button>
                    </li>
                    {[...Array(pages).keys()].map((x) => (
                        <li
                            key={`page${x}`}
                            className={`page-item ${
                                x + 1 === page ? "active" : ""
                            }`}
                        >
                            <button
                                className={`page-link `}
                                onClick={() => setPage(x + 1)}
                            >
                                {x + 1}
                            </button>
                        </li>
                    ))}

                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={() => setPage(page + 1)}
                            disabled={page >= pages}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        )
    );
};

export default Pagination;
