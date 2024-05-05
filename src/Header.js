import { useContext } from 'react'
import { NoteContext } from './App'

// HEADER COMPONENT
export default function Header() {
  const { showForm, setShowForm } = useContext(NoteContext)

  const appTitle = 'My Notebook'
  return (
    <header className="header">
      <div className="logo">
        <a href="index.html">
          <img src="logo.png" alt="Logo" />
        </a>
        <h1>{appTitle}</h1>
      </div>

      <div>
        <button
          className="btn btn-large btn-open"
          onClick={() => setShowForm((show) => !show)}
        >
          {showForm ? 'Close' : 'Add New'}
        </button>
      </div>
    </header>
  )
}
