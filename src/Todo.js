import React from 'react'

export default function Todo({ todo, toggleTodo }) {


    function handleTodoClick() {
        toggleTodo(todo.id)
    }

    return (
        <div className="card">
            <label className="card-body p-3 mb-2 bg-primary text-white">
                {/* Instead of using the toggleTodo function, we use an inbetween function to get the id of the checkbox */}
                <input type="checkbox" checked={todo.complete} onChange={handleTodoClick}/>
                {todo.name}
            </label>
        </div>
    )
}
