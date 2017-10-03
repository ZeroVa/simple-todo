import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ToDoList from './ToDoList';
import registerServiceWorker from './registerServiceWorker';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import ToDoReducer from './reducers/toDo';
import { Provider } from 'react-redux';
import {fetchToDos} from './actions/toDo'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    ToDoReducer,
    composeEnhancers(
        applyMiddleware(
            thunkMiddleware,
        )
    )
);

//get user stuff
// store.dispatch(selectSubreddit('reactjs'))
store
  .dispatch(fetchToDos())

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
