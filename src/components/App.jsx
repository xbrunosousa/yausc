import React, { Component } from 'react'
import Form from './Form/Form'
import './App.css'

class App extends Component {
	componentDidMount() {
		console.log(this.state.inputValue)
	}

	constructor() {
		super()
		this.state = {
			inputValue: undefined,
			outputLink: undefined
		}
	}

	handleSearch = (e) => {
		const value = e.target.value
		if (value.length !== undefined) {
			this.setState({ inputValue: value })
		}
	}

	shortLinkOnEnter = (e) => {
		console.log(e.keyCode)
		if (e.keyCode === 13) {
			this.shortLink()
		}
	}

	shortLink = () => {
		const BitlyClient = require('bitly')
		const bitly = new BitlyClient('5e933564f8015b00e7b23a4830acff93b45f2850') // Generic Access Token bit.ly

		bitly.shorten(this.state.inputValue)
			.then((res) => {
				this.setState({
					outputLink: res.data.url
				})
				console.log(this.state.outputLink)
			})
	}


	render() {
		return (
			<div className="App" >
				<Form
					handleSearch={(e) => this.handleSearch(e)}
					shortLink={() => this.shortLink()}
					shortLinkOnEnter={(e) => this.shortLinkOnEnter(e)} />

				<div className='result-link'>
					<span>{this.state.outputLink}</span>
				</div>
			</div>
		)
	}
}

export default App
