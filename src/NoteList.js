import supabase from './supabase'
import { NoteContext } from './App'
import { useContext } from 'react'

// LIST OF NOTES
export default function NotesList() {
  const {
    notes,
    setNotes,
    onDeletednote,
    isUpdating,
    categories,
    totalPosts,
    isValidHttpUrl,
  } = useContext(NoteContext)
  if (notes.length === 0) {
    return (
      <p className="message">
        No note for this category yet! Create the first one.
      </p>
    )
  }
  return (
    <section>
      <ul className="notes-list">
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            setNotes={setNotes}
            isUpdating={isUpdating}
            categories={categories}
            onDeletednote={onDeletednote}
            isValidHttpUrl={isValidHttpUrl}
          />
        ))}
      </ul>
      <p>There are {totalPosts} in the list. Add more!</p>
    </section>
  )
}

// INDIVIDUAL NOTE COMPONENT
function Note({
  note,
  setNotes,
  onDeletednote,
  isUpdating,
  categories,
  isValidHttpUrl,
}) {
  async function handleImportant() {
    const { data: importantNote, error } = await supabase
      .from('notes')
      .update({ important: !note.important })
      .eq('id', note.id)
      .select()

    if (!error) {
      setNotes((notes) =>
        notes.map((n) => (n.id === note.id ? importantNote[0] : n))
      )
    }
  }

  return (
    <li className="note" key={note.id}>
      <p>{note.text}</p>
      <button
        className="btn-delete"
        onClick={() => onDeletednote(note.id)}
        disabled={isUpdating}
      >
        <svg className="btn__cross">
          <use xlinkHref="sprite.svg#icon-cross"></use>
        </svg>
      </button>

      <div className="note_action">
        <p style={{ color: '#ADD8E6', fontSize: '14px' }}>
          Title/source:
          <span>
            {isValidHttpUrl(note.source) ? (
              <a
                className="source"
                href={note.source}
                target="_blank"
                rel="noreferrer"
              >
                {note.source}
              </a>
            ) : (
              <span className="title">{note.source} </span>
            )}
          </span>
        </p>
        <span
          className="tag"
          style={{
            color: categories
              .filter((cat) => cat.name === note.category)
              .map((cat) => cat.color)
              .join(''), // assuming color is a string; adjust accordingly
          }}
        >
          {note.category}
        </span>
      </div>
      <>
        <button className="btn-important">
          <svg
            onClick={() => handleImportant(note.id)}
            className={!note.important ? 'icon' : 'icon-important'}
          >
            <use xlinkHref="sprite.svg#icon-star-empty">{note.important}</use>
          </svg>
        </button>
      </>
    </li>
  )
}
