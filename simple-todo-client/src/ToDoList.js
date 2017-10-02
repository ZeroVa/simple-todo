import React, { Component } from 'react'
import { connect } from 'react-redux';

var task = (props) => <li>{props.taskName}</li>;

class ToDoList extends Component {
    render() {
        return (
            <div>
                <ul>
                    {this.props.toDos.map(toDoItem => (
                        <ToDoItem key={toDoItem._id} item={toDoItem} />
                    ))}
                </ul>
            </div>
        )
    }
}

export default connect((state) => { toDos: state.toDos }, { getToDoList, addToDoItem })(ToDoList);