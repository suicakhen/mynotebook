import React, { useContext } from 'react'
import { NoteContext } from './App'
import './style.css'

const Pagination = () => {
  const { totalPages, onPageChange, currentPage } = useContext(NoteContext)

  const handlePrevClick = () => {
    onPageChange(currentPage - 1)
  }

  const handleNextClick = () => {
    onPageChange(currentPage + 1)
  }

  return (
    <div className="pagination">
      <button onClick={handlePrevClick} disabled={currentPage === 1}>
        Prev
      </button>
      <span>{currentPage}</span> of <span>{totalPages}</span>
      <button onClick={handleNextClick} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  )
}

export default Pagination
