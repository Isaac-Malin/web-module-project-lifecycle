import React from 'react'

export default class TodoList extends React.Component {
  render() {
    return (
      <>
        {this.props.todos.reduce((acc, td) => {
          if (this.props.showAll || !td.completed)
            return acc.concat(
              <div
                className="todo"
                onClick={this.props.toggleCompleted(td.id)}
                key={td.id}
              >
                {td.name} {td.completed ? "✔️" : ""}
              </div>
            );
          return acc;
        }, [])}
      </>
    )
  }
}
