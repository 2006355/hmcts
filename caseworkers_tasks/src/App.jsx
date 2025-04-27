import { useState } from 'react'

import './App.css'
import Task from './assets/cards.jsx'

function App() {


  return (

    <>
    <div className="App">
      <h1>Caseworker Tasks</h1>
      <h2>Task Management</h2>
      <h3>Task List</h3>
      <h4>Click on a task to edit or delete</h4>
      <Task />
     
      </div>
    </>
  )
}

export default App
