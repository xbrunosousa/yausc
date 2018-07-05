import React, { Component } from 'react'
import Form from './Form/Form'
import './App.css'
import { regexURL } from './../regex'
import ReactGA from 'react-ga'

class App extends Component {
	componentDidMount() {
		// Google Analytics
		ReactGA.initialize('UA-118867430-1')
		ReactGA.pageview(window.location.pathname + window.location.search)
	}
	constructor() {
		super()
		this.state = {
			inputValue: undefined,
			outputLink: undefined,
			valid: false,
			isShortening: false,
			isShortened: false
		}
	}

	handleSearch = (e) => {
		const value = e.target.value

		if (value.length !== undefined) { // Se há dados no input, defina-o no inputValue
			this.setState({ inputValue: value })
		}

		if (regexURL.test(value) === true) {
			console.log('URL Válida')
			this.setState({ valid: true })
		} else {
			this.setState({ valid: false })
		}
	}

	shortLinkOnEnter = (e) => {
		if (this.state.valid === true && e.keyCode === 13) { // Se pressionado enter e o campo é válido...
			this.shortLink()
		}
	}

	shortLink = () => {
		const BitlyClient = require('bitly')
		const bitly = new BitlyClient('5e933564f8015b00e7b23a4830acff93b45f2850') // Generic Access Token bit.ly
		this.setState({ isShortening: true })
		bitly.shorten(this.state.inputValue)
			.then((res) => {
				this.setState({
					outputLink: res.data.url,
					isShortening: false,
					isShortened: true
				})
			})
	}


	render() {
		return (
			<div className="App" >
				<Form
					handleSearch={(e) => this.handleSearch(e)}
					shortLink={() => this.shortLink()}
					shortLinkOnEnter={(e) => this.shortLinkOnEnter(e)}
					valid={this.state.valid}
					isShortening={this.state.isShortening} />
				{
					this.state.isShortened === true &&
					<div className='result-link'>
						<input readOnly className='result-link-input' type='textarea' value={this.state.outputLink} />
					</div>
				}
			</div>
		)
	}
}

export default App
