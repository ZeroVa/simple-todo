import * as ToDoActionTypes from '../actionTypes/toDo';
let nextId = 0;

export const fetchToDos = () => {
    return function (dispatch, getState) {
        return fetch('/api/toDo')
            .then(
            response => response.json(),
            error => console.log('An error occured.', error)
            )
            .then(
            json => {
                dispatch(fetchedToDos(json));
            }
            )
    }
}

export const addToDo = text => {
    return function (dispatch, getState) {
        return fetch('/api/toDo', {
            method: 'POST',
            body: JSON.stringify({
                text,
                completed: false,
                created: new Date(),
                lastUpdated: new Date()
            })
        })
            .then(
            response => response.json(),
            error => console.log('An error occured.', error)
            )
            .then(
            json => {
                dispatch(addedToDo(json));
            }
            );
    }
};

export const updateToDo = (index, text) => {
    return function (dispatch, getState) {
        const {toDos} = getState();
        let thisToDo = toDos[index]._id;
        return fetch(`/api/toDo/${thisToDo._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                text,
                lastUpdated: new Date()
            })
        })
            .then(
            response => response.json(),
            error => console.log('An error occured.', error)
            )
            .then(
            json => {
                dispatch(updatedToDo(index, json.text, json.lastUpdated));
            }
            );
    }
};

export const removeToDo = (index) => {
    return function (dispatch, getState) {
        const {toDos} = getState();
        let thisToDo = toDos[index]._id;
        return fetch(`/api/toDo/${thisToDo._id}`, {
            method: 'DELETE',
        })
            .then(() => {
                dispatch(removedToDo(index));
            });
    }
};

export const toggleToDoCompleted = (index) => {
    return function (dispatch, getState) {
        const {toDos} = getState();
        let thisToDo = toDos[index]._id;
        return fetch(`/api/toDo/${thisToDo._id}`, {
            method: 'POST',
            body: JSON.stringify({
                lastUpdated: new Date(),
                completed: !thisToDo.completed
            })
        })
        .then(
            response => response.json(),
            error => console.log('An error occured.', error)
            )
        .then( (json) => {
            dispatch(toggledToDoCompleted(index, json.lastUpdated));
        });
    }
}

export const fetchedToDos = toDos => {
    return {
        type: ToDoActionTypes.FETCHED_TODOS,
        toDos
    }
};

export const addedToDo = toDo => {
    return {
        type: ToDoActionTypes.ADDED_TODO,
        toDo
    }
};

export const updatedToDo = (index, text, lastUpdated) => {
    return {
        type: ToDoActionTypes.UPDATED_TODO,
        index,
        text,
        lastUpdated
    }
};

export const removedToDo = index => {
    return {
        type: ToDoActionTypes.REMOVED_TODO,
        index
    };
};

export const toggledToDoCompleted = (index, lastUpdated) => {
    return {
        type: ToDoActionTypes.TOGGLED_TODO_COMPLETED,
        index,
        lastUpdated
    };
};


