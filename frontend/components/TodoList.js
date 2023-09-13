import React from 'react'

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);

    const { todos } = this.props
    console.log(todos);
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}
