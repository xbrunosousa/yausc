import React from 'react'
import { InputGroup, InputGroupAddon, Input, Container, Col, Button } from 'reactstrap'

const Form = ({ handleSearch, shortLink, shortLinkOnEnter, valid, isShortening }) => (
	<div className='Form'>

		<Container>
			<Col sm={{ size: 8, offset: 2 }}>
				<InputGroup className='input-one'>
					<InputGroupAddon addonType='prepend'>
						<span aria-label='Emoji User' role='img' className='input-group-text'><i className='fas fa-link' /></span>
					</InputGroupAddon>

					<Input
						bsSize='lg'
						disabled={isShortening}
						type='url'
						className='input-link'
						onChange={handleSearch}
						onKeyDown={shortLinkOnEnter}
						placeholder='Insira o link para encurtar...' />

					<InputGroupAddon addonType='append'>
						<Button disabled={!valid} onClick={shortLink} color='primary'>Encurtar</Button>
					</InputGroupAddon>

				</InputGroup>
				{
					isShortening === true &&
					<div>Está carregando</div>
				}
			</Col>
		</Container>

	</div>
)

export default Form