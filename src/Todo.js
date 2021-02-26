import React from 'react'

const Todo = ({ todo, toggleTodo }) => {


    const handleTodoClick = () => {
        toggleTodo(todo.id)
    }

    return (
        <div className="card">
            <label className="card-body p-3 mb-2 bg-primary text-white">
                {/* Instead of using the toggleTodo function, we use an inbetween function to get the id of the checkbox */}
                <input type="checkbox" checked={todo.complete} onChange={handleTodoClick}/>
                {todo.name} - Deadline: {todo.stopDate}
                
            </label>
        </div>
    )
}

export default Todo;