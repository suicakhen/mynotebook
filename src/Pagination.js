import React, { useContext } from 'react'
import { NoteContext } from './App'
import './style.css'

const Pagination = () => {
  const {
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,
    categoryFilter,
  } = useContext(NoteContext)
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  if (totalPages > currentPage)
    return (
      <div className="pagination">
        {pages.map((page, index) => {
          return (
            <button
              key={index}
              onClick={() => setCurrentPage(page)}
              className={page === currentPage ? 'active' : ''}
            >
              {page}
            </button>
          )
        })}
      </div>
    )
}

export default Pagination
