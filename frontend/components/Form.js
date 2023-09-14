import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <>
      <form onSubmit={this.props.onSubmit}>
          <input
            onChange={this.props.handleInputChange}
            type="text"
            value={this.props.todoInput}
            placeholder="Enter Todo"
          />
          <button>Create Todo</button>
        </form>
        <button onClick={this.props.toggleDone}>
          {this.props.showAll ? "Hide" : "Show"} Completed
        </button>
      </>
    )
  }
}
