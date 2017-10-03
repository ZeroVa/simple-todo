import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchToDos, addToDo, removeToDo, updateToDo, toggleToDoCompleted } from './actions/toDo';

var ToDoItem = (props) => <li>{props.item.text}</li>;

class ToDoList extends Component {
    render() {
        return (
            <div>
                <ul>
                    {this.props.toDos && this.props.toDos.map(toDoItem => (
                        <ToDoItem key={toDoItem._id} item={toDoItem} />
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        toDos: state.toDos
    };
}

export default connect(mapStateToProps, { fetchToDos, addToDo, removeToDo, updateToDo, toggleToDoCompleted })(ToDoList);