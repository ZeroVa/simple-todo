import * as ToDoActionTypes from '../actionTypes/toDo';
import update from 'immutability-helper';

const initialState = {
    toDos: [

    ]
};

export default function ToDo(state = initialState, action) {

    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    switch (action.type) {
        case ToDoActionTypes.FETCHED_TODOS: {
            return update(state, {
                toDos: {
                    $set: action.toDos
                }
            });
        }

        case ToDoActionTypes.ADDED_TODO: {
            return update(state, {
                toDos: {
                    $push: [action.toDo]
                }
            });
        }

        case ToDoActionTypes.UPDATED_TODO: {
            return update(state, {
                toDos: {
                    [action.index]: {
                        text: {$set: action.text},
                        lastUpdated: {$set: action.lastUpdated}
                    }
                }
            });
        }

        case ToDoActionTypes.REMOVED_TODO: {
            return update(state, {
                toDos: {
                    $splice: [[action.index, 1]]
                }
            });
        }

        case ToDoActionTypes.TOGGLED_TODO_COMPLETED: {
            
            return update(state, {
                toDos: {
                    [action.index]: {
                        completed: {$set: !state.toDos[action.index].completed},
                        lastUpdated: {$set: action.lastUpdated}
                    }
                }
            });
        }

        default:
            return state;
    }
}
