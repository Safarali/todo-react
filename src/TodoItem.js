import React from 'react';

const TodoItem = ({ todo }) => (
    <li>
        {todo.text}
        <input 
            type="checkbox" 
            defaultChecked={todo.completed} 
            data-id={todo.id}
        />
    </li>
);

export default TodoItem;