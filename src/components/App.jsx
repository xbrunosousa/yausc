import React, { Component } from 'react'
import Form from './Form/Form'
import './App.css'
import { regexURL } from './../regex'
import ReactGA from 'react-ga'
import format from 'date-fns/format'
import Historic from './Historic/Historic'
import NavbarApp from './NavbarApp/NavbarApp'
import FooterApp from './FooterApp/FooterApp'

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
			isShortened: false,
			userDataSaved: undefined
		}
	}

	handleSearch = (e) => {
		const value = e.target.value

		if (value.length !== undefined) { // Se há dados no input, defina-o no inputValue
			this.setState({ inputValue: value })
		}
		regexURL.test(value) === true ? this.setState({ valid: true }) : this.setState({ valid: false })
	}

	shortLinkOnEnter = (e) => {
		if (this.state.valid === true && e.keyCode === 13) { // Se pressionado enter e o campo é válido...
			this.shortLink()
		}
	}

	shortLink = () => {
		const TOKEN = '5e933564f8015b00e7b23a4830acff93b45f2850'
		const BitlyClient = require('bitly')
		const bitly = new BitlyClient(TOKEN) // Generic Access Token bit.ly
		this.setState({ isShortening: true })
		bitly.shorten(this.state.inputValue)
			.then((res) => {
				this.setState({
					outputLink: res.data.url,
					isShortening: false,
					isShortened: true
				})
				if ('values-user' in localStorage) { // Se existir dados salvos no localstorage...
					const oldItems = JSON.parse(localStorage.getItem('values-user')) // recupera os dados para o oldItems

					const newItems = { // Dados para salvar
						linkshortened: this.state.outputLink,
						dateshort: format(new Date(), 'DD/MM - HH:mm'),
						originalLink: this.state.inputValue
					}
					oldItems.push(newItems) // concatena os novos items com os itens antigos
					localStorage.setItem('values-user', JSON.stringify(oldItems)) // Envia os dados concatenados para o storage

				} else {
					const itemsToSave = [{ // dados que serão salvos no storage...
						linkshortened: this.state.outputLink,
						dateshort: format(new Date(), 'DD/MM - HH:mm'),
						originalLink: this.state.inputValue
					}]

					localStorage.setItem('values-user', JSON.stringify(itemsToSave)) // salva os dados acima em JSON
				}
				this.setState({ isShortening: undefined })
			})
	}

	clearStorage = () => { // Limpa os dados salvos no localStorage
		localStorage.clear()
		this.setState({ userDataSaved: null }) // Não haverá dados no localstorage, então...
	}


	render() {
		const userDataSaved = JSON.parse(localStorage.getItem('values-user'))
		return (
			<div className='App'>
				<NavbarApp />
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

				{
					userDataSaved !== null &&
					<Historic
						userDataSaved={userDataSaved}
						clearStorage={() => this.clearStorage()} />
				}

				<FooterApp />
			</div>
		)
	}
}

export default App
