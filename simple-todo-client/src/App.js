import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import ToDoList from './ToDoList';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="router-inner">
            {/* <Route path='/' component={component}/> */}
            <div className="header" style={{ textAlign: 'center' }}>
              <h2>Simple ToDo</h2>
            </div>
            <Route path='/' component={ToDoList} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
