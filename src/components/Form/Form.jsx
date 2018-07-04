import React from 'react'
import { InputGroup, InputGroupAddon, Input, Container, Col, Button } from 'reactstrap'

const Form = ({ handleSearch, shortLink, shortLinkOnEnter }) => (
	<div className='Form'>

		<Container>
			<Col sm={{ size: 8, offset: 2 }}>
				<InputGroup className='input-one'>
					<InputGroupAddon addonType='prepend'>
						<span aria-label='Emoji User' role='img' className='input-group-text'><i className='fas fa-link' /></span>
					</InputGroupAddon>

					<Input
						className='input-search-name'
						onChange={handleSearch}
						onKeyDown={shortLinkOnEnter}
						placeholder='Insira o link para encurtar...' />

					<InputGroupAddon addonType='append'>
						<Button onClick={shortLink} color='dark'>Encurtar</Button>
					</InputGroupAddon>

				</InputGroup>
			</Col>
		</Container>

	</div>
)

export default Form