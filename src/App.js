import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([]);

  // useRef() is a build in function to call inputs fields with the attribute "ref"
  const todoName = useRef();

  useEffect(() => {
    // Can't read strings, need to parse with JSON
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  
    //array is empty so that it only loads once.
  }, [])

  // Store data and re-use
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])


  // pass down the function trough the path (from here to todoList to Todo)
  function toggleTodo(id) {

    // never edit directly in reacht, always make a copy and edit the copy.
    const newTodos = [...todos]

    // find the id of the selected checkbox and git the same id to the copy
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete

    // set new todo as todo
    setTodos(newTodos)
  }

  function addToList(e) {
    const name = todoName.current.value

    if (name === '') {
        return
    }

    setTodos(previousTodos => {
      // uuidv4 is a id library that generates id's
        return [ ...previousTodos, {id: uuidv4(), name: name, complete: false}]
    })
    console.log(name);

    // Returning the unput box to empty after submit
    todoName.current.value = null;
  }

  return (
    <>
      <div className="addTodo">
          <input ref={todoName} type="text"/>
          
          {/* Adding an eventListner to the button */}
          <button onClick={addToList}>Add</button>
          <button>Clear Completed todo's</button>
      </div>

      <TodoList todos={todos} toggleTodo={toggleTodo}/>

      <div className="left-to-do">
          <p>0 left!</p>
      </div>
    </>
  )
}

export default App;
