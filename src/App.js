import React, { Component, Fragment } from 'react';
import axios from 'axios';
import qs from 'qs';
import TodoList from './TodoList';
import Form from './Form';

import { getAllTodos } from './APIs'


class App extends Component {
  state = {
    todos: [],
    inputText: ''
  }
  componentDidMount() {
    this.getAllTodos();
  };

  getAllTodos = async () => {
    try {
      const url = 'http://quip-todos.herokuapp.com/get_todos?email=example@gmail.com';
      const todos = await axios.get(url);
      this.setState(() => ({ todos: todos.data }));
    } catch (error) {

    }
  };

  handleComplete = async (id, status) => {
    const data = {
      email: 'example@gmail.com',
      completed: status,
      id
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url:'http://quip-todos.herokuapp.com/mark_completed'
    }
    try {
      const response = await axios(options);
      const { id, completed } = response.data;
      
      this.setState((prevState) => ({
        todos: prevState.todos.map(todo => (todo.id === parseInt(id) ? {...todo, completed} : todo ))
      }))
      
    } catch (error) {
      console.log(error.response);
    } 
  };
  
  handleClick = (e) => {
    if(e.target.dataset.id) {
      const { id } = e.target.dataset;
      const { completed } = this.state.todos[id];
      this.handleComplete(id, !completed);
    }
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState(() => (
      { inputText: value }
    ));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.handleAddItem();
  }

  handleAddItem = async () => {
    const data = {
      email: 'example@gmail.com',
      text: this.state.inputText
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url: 'http://quip-todos.herokuapp.com/add_todo'
    };

    try {
      const response = await axios(options);
      const todo = response.data;

      this.setState((prevState) => ({
        todos: [...prevState.todos, todo],
        inputText: ''
      }));
      
    } catch (error) {
      console.log(error.response);
      
    }
  }

  handleResetAll = async () => {
    const data = {
      email: 'example@gmail.com',
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url: 'http://quip-todos.herokuapp.com/reset'
    }

    try {
      await axios(options);
      this.setState((prevState) => ({
        todos: prevState.todos.slice(0, 5)
      }))
      
    } catch (e) {
      console.log(e.response);
      
    }
    
  }

  render() {
    return (
      <Fragment>
          <TodoList 
            handleClick={this.handleClick}
            todos={this.state.todos}
          />
          <Form
            handleSubmit={this.handleSubmit}
            inputText={this.state.inputText}
            handleChange={this.handleChange}
          />
          <button onClick={this.handleResetAll}>Reset all items</button>
      </Fragment>
    );
  }
}

export default App;
