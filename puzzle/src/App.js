import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import './App.css'

import Homepage from './components/Homepage'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="wrapper">
          <div className="container">
            <Route exact path="/" component={Homepage} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App
