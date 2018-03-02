import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom"
import './App.css'

import QuizTemplate from './components/QuizTemplate'
import NotFound from './components/NotFound'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="wrapper">
          <div className="container">
            {/*<div className="d-flex space-around justify-content-around top-navigation">
              <NavLink exact activeClassName="active" to="/">Quiz 1</NavLink>
              <NavLink activeClassName="active" to="/quiz2">Quiz 2</NavLink>
              <NavLink activeClassName="active" to="/quiz3">Quiz 3</NavLink>
            </div>*/}
            <Switch>
              <Route exact 
                path="/" 
                render={() => 
                  <QuizTemplate 
                    quizNumber={1} 
                    text="Guess who's in the picture?" 
                    sliceNumber={9} 
                  /> 
                } 
              />
              {/* Quiz 2 */}
              <Route 
                path="/quiz2" 
                render={() => 
                  <QuizTemplate 
                    quizNumber={2} 
                    text="To easy? how about this" 
                    sliceNumber={12} 
                  /> 
                } 
              />
              {/* Quiz 3 */}
              <Route 
                path="/last" 
                render={() => 
                  <QuizTemplate 
                    quizNumber={3} 
                    text="If you guess them right, you're insane!" 
                    sliceNumber={25} 
                  /> 
                } 
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App
