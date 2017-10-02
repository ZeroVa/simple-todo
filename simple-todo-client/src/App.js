import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {

  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          {/* <Route path='/' component={component}/> */}
          <Route path='/' component={component}/>
          <Route path='/todos' component={ToDoList}/>
          
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
