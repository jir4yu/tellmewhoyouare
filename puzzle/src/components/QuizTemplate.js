import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Cookies from 'js-cookie'

class QuizTemplate extends Component {

  constructor(props) {
    super(props)
    this.state = {
    	randomImage: null,
      isFinished: false,
      gotPuzzle: Cookies.get(`${this.props.stage}`)
    }
  }

  componentWillMount() {
    if ( this.state.gotPuzzle ) {
      /**
       * IF already have a stage cookie
       * set state number from that cookie
       */
      let number = Cookies.get(`${this.props.stage}-puzzle-number`)
      this.setState({
        randomImage: number
      });
    } else {
      /**
       * IF not have a stage cookie yet
       * random number, assign state number and set new cookie with 5 mins expire
       */
    	let number = Math.floor(Math.random() * this.props.sliceNumber) + 1
      Cookies.set(`${this.props.stage}`, true, {expires: new Date().getTime() + 5 * 60 * 1000})
      Cookies.set(`${this.props.stage}-puzzle-number`, number, {expires: new Date().getTime() + 5 * 60 * 1000})
      this.setState({
        randomImage: number
      });
    }
  }

  componentDidMount() {
    /*
     * If fire database was changed
     * update stage message and status by setting state
     */
    this.props.database.ref(`${this.props.stage}`).on('value', (snapshot) => {
      if (snapshot.val() === true) {
        this.setState({
          isFinished: true
        })
      } else {
        this.setState({
          isFinished: false
        })
      }
    })
  }

  render() {
    const { quizNumber, sliceNumber, text } = this.props
    return (
      <div>
        { 
          this.state.isFinished 
          ? <div className="puzzle-wrapper">
              <h1 className="ended-text">
                Stage was ended
                <small>- {this.props.answer} -</small>
              </h1>
              <div className="puzzle-block">
                <img src={`./img/quiz${quizNumber}/completed.jpg`} className="img-fluid" alt="Answer" />
              </div>
            </div>
          : <div className="puzzle-wrapper">
              <h3 className="lead text-center">{text}</h3>
              <div className="puzzle-block">
                <img src={`./img/quiz${quizNumber}/guest-${this.state.randomImage}.jpg`} className="img-fluid" alt="Puzzle" />
              </div>
            </div>
        }
      </div>
    )
  }
}

export default QuizTemplate;

QuizTemplate.propTypes = {
  quizNumber: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  sliceNumber: PropTypes.number.isRequired
}