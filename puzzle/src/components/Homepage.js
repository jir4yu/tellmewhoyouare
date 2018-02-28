import React, { Component, PropTypes } from 'react'

class Homepage extends Component {

  constructor(props) {
    super(props)
    this.state = {
    	randomImage: null
    }
  }

  componentWillMount() {
  	let number = Math.floor(Math.random() * 16) + 1

  	this.setState({
	     randomImage: number
		});
  }

  render() {

    return (
    	<div className="puzzle-wrapper">
				<h3 className="lead text-center">Guess who's in the picture?</h3>
				<div className="puzzle-block">
					<img src={`./img/guest-${this.state.randomImage}.jpg`} className="img-fluid" alt="Puzzle" />
				</div>
			</div>
    )
  }
}

export default Homepage;
