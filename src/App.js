import { useState, useEffect, createContext, useContext } from 'react'
import supabase from './supabase'
import './style.css'
import CategoryFilter from './CategoryFilter'
import Header from './Header'
import NewForm from './NewForm'
import NotesList from './NoteList'
import Pagination from './Pagination'

/*CATEGORY OBJECT */
const CATEGORIES = [
  { name: 'Maths', color: '#3b82f6' },
  { name: 'English', color: '#16a34a' },
  { name: 'Science', color: '#ef4444' },
  { name: 'HSS', color: '#eab308' },
  { name: 'Religion', color: '#db2777' },
  { name: 'Drama', color: '#14b8a6' },
  { name: 'PE', color: '#f97316' },
  { name: 'Sports', color: '#8b5cf6' },
]

function isValidHttpUrl(string) {
  let url
  try {
    url = new URL(string)
  } catch (_) {
    return false
  }
  return url.protocol === 'http:' || url.protocol === 'https:'
}

// 1) CREATE A CONTEXT
const NoteContext = createContext()

function App() {
  const [showForm, setShowForm] = useState(false)
  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentCategory, setCurrentCategory] = useState('all')
  const [isUpdating, setIsUpdating] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(6)

  // Load this only for the first load but not everytime the page rendering.
  useEffect(
    function () {
      async function getNotes() {
        setIsLoading(true)

        let query = supabase.from('notes').select('*')

        if (currentCategory !== 'all')
          query = query.eq('category', currentCategory)
        const { data: notes, error } = await query
          .order('text', { ascending: false })
          .limit(100)

        if (!error) setNotes(notes)
        else alert('There was a problem fecthing data !')

        setIsLoading(false)
      }
      getNotes() // As soon as the data arrieved, they will be stored in the notes variable.
    },
    [currentCategory]
  )
  //[] is dependency, unless this dependency array, it will keep reloading.

  async function handleDelete(id) {
    const confirmed = window.confirm('Are you sure you want to delete it?')

    if (!confirmed) return

    setIsUpdating(true)
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id)
      .select()

    setIsUpdating(false)

    if (!error) setNotes((notes) => notes.filter((note) => id !== note.id))
  }

  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage
  const currentPosts = notes.slice(firstPostIndex, lastPostIndex)
  const totalPosts = notes.length

  return (
    <NoteContext.Provider
      value={{
        setNotes,
        setShowForm,
        categories: CATEGORIES,
        isValidHttpUrl,
        setCurrentCategory,
        isLoading,
        notes: currentPosts,
        onDeletednote: handleDelete,
        totalPosts,
      }}
    >
      <>
        <Header />
        {showForm ? <NewForm /> : null}
        <main className="main">
          <CategoryFilter />
          {isLoading ? <Loading /> : <NotesList />}
        </main>
        <Pagination />
      </>
    </NoteContext.Provider>
  )
}

/* PAGE LOADING */
function Loading() {
  return <p className="message">Loading...</p>
}

export default App
export { NoteContext }
