import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ( { handleClick, todos }) => (
    <ul onClick={handleClick}>
        {todos.map(todo => (
            <TodoItem
                key={todo.id}
                todo={todo}
            />
        ))}
    </ul>
);

export default  TodoList;