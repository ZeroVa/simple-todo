import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchToDos, addToDo, removeToDo, updateToDo, toggleToDoCompleted } from './actions/toDo';

var ToDoItem = (props) => <li className={props.className}>
    <div className="todo-item-inner">
        <div className="item-text">{props.item.text}</div>
        <div className="btn-edit">edit</div>
    </div>
</li>;

class ToDoList extends Component {
    render() {
        return (
            <div className="todo-list-outer">
                <ul className="todo-list">
                    {this.props.toDos && this.props.toDos.map(toDoItem => (
                        <ToDoItem className="todo-item" key={toDoItem._id} item={toDoItem} />
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