import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import Nav from './Nav';
import Calendar from './Calendar';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {

  // Destructing the array with all the todos. and replacing them with newTodos created by setTodos
  const [todos, setTodos] = useState([]);

  // useRef() is a build in function to call inputs fields with the attribute "ref"
  const todoName = useRef();
  const todoDate = useRef();

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
    const date = todoDate.current.value

    if (name === '') {
        return
    }

    setTodos(previousTodos => {
      // uuidv4 is a id library that generates id's
        return [ ...previousTodos, {id: uuidv4(), name: name, complete: false, date: date}]
    })

    // Returning the unput box to empty after submit
    todoName.current.value = null;
  }

  function handleClearList () {
    // Making a new list with only the todos that are not marked as complete
    const newTodos = todos.filter(todo => !todo.complete)

    //replacing that list with the old one
    setTodos(newTodos)
  }

  return (
    <>
      <Nav />
      <div className="position-absolute top-50 start-50 translate-middle container-sm p-3 mb-2 bg-info text-dark rounded">
        <Router>
            <Route path="/calendar" component={Calendar}/>

            <h1>My TODO list</h1>
            <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Add to list</span>
                <input ref={todoName} type="text" placeholder="New Todo ..."/>
                <input ref={todoDate} type="date" id="start" name="trip-start"
                    min="2021-01-01" max="2070-12-31">
                </input>
                
                {/* Adding an eventListner to the button */}
                <button className="btn btn-primary" onClick={addToList}>Add</button>
                <button className="btn btn-warning" onClick={handleClearList}>Clear Completed todo's</button>
            </div>

            <TodoList todos={todos} toggleTodo={toggleTodo}/>
            <br/><br/>
            <div className="left-to-do">
                <p>{todos.filter(todo => !todo.complete).length} left!</p>
            </div>
        </Router>
      </div>
    </>
  )
}

export default App;
