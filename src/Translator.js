import React, { Component } from 'react'
import axios from 'axios'
class Translator extends Component {
	constructor(props) {
		super(props)

		this.state = {
      submittedTexts:'',
      translations:[]
		}
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
		e.preventDefault()
		console.log(this.state)
		axios
      .post('https://72exx40653.execute-api.us-east-1.amazonaws.com/prod/translateEnglishToAlien', {
        textToTranslate: this.state.submittedTexts
  })
			.then(response => {
        this.setState({translations: response.data})
        
        console.log(response.data)
        
			})
			.catch(error => {
				console.log(error)
      })
      
	}

	render() {
    const { submittedTexts } = this.state
    
		return (
			<div>
				<form onSubmit={this.submitHandler}>
					<div>
						<input
							type="text"
							name="submittedTexts"
							value={submittedTexts}
							onChange={this.changeHandler}
						/>
					</div>
					
					<button type="submit">Submit</button>
				</form>
        <ul>
        { this.state.translations.map(translation => <li>{translation}</li>)}
      </ul>
 
        
			</div>
		)
	}
}

export default Translator


