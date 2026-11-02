import { useState } from 'react'
import './App.css'

function App() {
  const [counter, setCounter] = useState(15)

  const addValue = () => {
    setCounter(prev => prev + 1)
  }

  const removeValue = () => {
    setCounter(prev => (prev > 0 ? prev - 1 : 0))
  }

  return (
    <div className="page">
      <main className="content">
        {/* 1. Title in the middle of the page */}
        <h1 className="title">React course with Ashutosh</h1>

        {/* 2. Counter value below the title */}
        <div className="counter-box">
          <span className="counter-label">Counter value</span>
          <span className="counter-value">{counter}</span>
        </div>

        {/* 3. Add and Remove boxes side by side */}
        <div className="button-group">
          <button onClick={addValue} className="btn btn-add">
            Add value
          </button>
          <button onClick={removeValue} className="btn btn-remove">
            Remove value
          </button>
        </div>
      </main>

      {/* 4. Footer at the bottom */}
      <footer className="footer">Footer: {counter}</footer>
    </div>
  )
}

export default App
