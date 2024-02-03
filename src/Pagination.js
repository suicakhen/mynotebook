import React from "react";
import "./style.css";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
  categoryFilter,
}) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  if (totalPages > currentPage)
    return (
      <div className="pagination">
        {pages.map((page, index) => {
          return (
            <button
              key={index}
              onClick={() => setCurrentPage(page)}
              className={page === currentPage ? "active" : ""}
            >
              {page}
            </button>
          );
        })}
      </div>
    );
};

export default Pagination;
