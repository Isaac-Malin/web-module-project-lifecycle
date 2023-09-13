import React from "react";

import TodoList from "./TodoList"
import axios from "axios";

const URL = "http://localhost:9000/api/todos";

export default class App extends React.Component {
  state = {
    todos: [],
    error: ''
  };

  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        
        this.setState({ ...this.state.todos, todos: res.data.data})
        console.log(this.state.todos);
      })
      .catch(err => {
        this.setState({ ...this.state, error: err.response.data.message })
      })
  }
  componentDidMount() {
    this.fetchAllTodos()
  }

  render() {
    return (
      <div>
        <h2>Error: {this.state.error}</h2>
        <h2>Todos:</h2>
        {
          this.state.todos.map(td => {
            return <div key={td.id}>{td.name}</div>
          })
        }
      </div>
    )
  }
}
