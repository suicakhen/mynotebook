import { useContext } from 'react'
import { NoteContext } from './App'
// CATEGORY OF NOTE
export default function CategoryFilter() {
  const { setCurrentCategory, categories } = useContext(NoteContext)
  return (
    <aside>
      <ul className="category-box">
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => setCurrentCategory('all')}
          >
            All
          </button>
        </li>

        {categories.map((cat) => (
          <li key={cat.name} className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
              onClick={() => setCurrentCategory(cat.name)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
