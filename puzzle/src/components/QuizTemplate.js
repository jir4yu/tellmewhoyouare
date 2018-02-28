import React, { Component } from 'react'
import PropTypes from 'prop-types';


class QuizTemplate extends Component {

  constructor(props) {
    super(props)
    this.state = {
    	randomImage: null
    }
  }

  componentWillMount() {
  	let number = Math.floor(Math.random() * this.props.sliceNumber) + 1
  	this.setState({
	     randomImage: number
		});
  }

  render() {
    const { quizNumber, sliceNumber, text } = this.props
    return (
    	<div className="puzzle-wrapper">
				<h3 className="lead text-center">{text}</h3>
				<div className="puzzle-block">
					<img src={`./img/quiz${quizNumber}/guest-${this.state.randomImage}.jpg`} className="img-fluid" alt="Puzzle" />
				</div>
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