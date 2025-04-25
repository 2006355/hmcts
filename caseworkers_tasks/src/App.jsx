import { useState } from 'react'

import './App.css'
import Task from './assets/cards.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Task />
    </>
  )
}

export default App
