import { useContext, useState } from 'react'
import supabase from './supabase'
import { NoteContext } from './App'

export default function NewForm() {
  const [text, setText] = useState('')
  const [source, setSource] = useState('')
  const [category, setCategory] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const textLength = text.length
  const { setNotes, setShowForm, categories, isValidHttpUrl } =
    useContext(NoteContext)

  async function handleSubmit(e) {
    // Prevent browser reload
    e.preventDefault()

    if (text || (isValidHttpUrl(source) && category && textLength <= 200)) {
      // Upload fact to Supabase and receive the new fact object
      setIsUploading(true)
      const { data: newNote, error } = await supabase
        .from('notes')
        .insert([{ text, source, category }])
        .select()
      setIsUploading(false)
      console.log(newNote)

      //  Add the new fact to the UI: add the fact to state
      if (!error) setNotes((notes) => [newNote[0], ...notes])

      //  Reset input fields
      setText('')
      setSource('')
      setCategory('')

      //  Close the form
      setShowForm(false)
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Record what you learned today..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        type="text"
        value={source}
        placeholder="Title..."
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose category:</option>
        {categories.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Add
      </button>
    </form>
  )
}
