import React from "react";
import "../styles/styles.css";

import TodoList from "./TodoList";
import Form from "./Form"
import axios from "axios";

const URL = "http://localhost:9000/api/todos";

export default class App extends React.Component {
  state = {
    todos: [],
    error: "",
    todoInput: "",
    showAll: true,
  };
  resetForm = () => {
    this.setState({ ...this.state, todoInput: "" });
  };

  toggleCompleted = (id) => () => {
    axios
      .patch(`${URL}/${id}`)
      .then((res) => {
        this.setState({
          ...this.state,
          todos: this.state.todos.map((td) => {
            if (td.id !== id) return td;
            return res.data.data;
          }),
        });
      })
      .catch((err) => {
        this.setState({ ...this.state, error: err.response.data.message });
      });
  };

  postTodo = () => {
    axios
      .post(URL, { name: this.state.todoInput })
      .then((res) => {
        this.fetchAllTodos();
        this.resetForm();
      })
      .then((err) => {
        this.setState({ ...this.state, error: err.response.data.message });
      });
  };

  fetchAllTodos = () => {
    axios
      .get(URL)
      .then((res) => {
        this.setState({ ...this.state, todos: res.data.data });
      })
      .catch((err) => {
        this.setState({ ...this.state, error: err.response.data.message });
      });
  };

  handleInputChange = (e) => {
    const { value } = e.target;
    this.setState({ ...this.state, todoInput: value });
  };

  toggleDone = () => {
    this.setState({ ...this.state, showAll: !this.state.showAll });
  };

  onSubmit = (evt) => {
    evt.preventDefault();
    this.postTodo();
  };

  componentDidMount() {
    this.fetchAllTodos();
  }

  render() {
    return (
      <div>
        <h1 className="title">Todos:</h1>
        <TodoList 
          todos={this.state.todos}
          showAll={this.state.showAll}
          toggleCompleted={this.toggleCompleted}
        />
        <Form 
          onSubmit={this.onSubmit}
          showAll={this.state.showAll}
          toggleDone={this.toggleDone}
          todoInput={this.state.todoInput}
          handleInputChange={this.handleInputChange}
        />
      </div>
    );
  }
}
