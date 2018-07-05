import React, { Component } from 'react'
import Form from './Form/Form'
import './App.css'
import {regexURL} from './../regex'

class App extends Component {
	constructor() {
		super()
		this.state = {
			inputValue: undefined,
			outputLink: undefined,
			valid: false
		}
	}

	handleSearch = (e) => {
		const value = e.target.value

		if (value.length !== undefined) { // Se há dados no input, defina-o no inputValue
			this.setState({ inputValue: value })
		}

		if (regexURL.test(value) === true) {
			console.log('URL Válida')
			this.setState({valid: true})
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

		bitly.shorten(this.state.inputValue)
			.then((res) => {
				this.setState({
					outputLink: res.data.url
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
					valid={this.state.valid} />

				<div className='result-link'>
					<span>{this.state.outputLink}</span>
				</div>
			</div>
		)
	}
}

export default App
