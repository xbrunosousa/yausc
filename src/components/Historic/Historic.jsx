import React from 'react'
import { Table, Container, Button } from 'reactstrap'

const Historic = ({ clearStorage, userDataSaved }) => (
	<div className='Historic'>
		<span className='historic-title'>
			<i className='fas fa-history' /> Seu histórico de links encurtados
			<Button
				onClick={clearStorage}
				className='historic-clear-btn'
				size='sm'
				outline>
				Limpar
			</Button>
		</span>
		<Container>
			<Table className='historic-table' responsive striped size='sm'>
				<thead>
					<tr>
						<th>Link original</th>
						<th>Link encurtado</th>
						<th>Data</th>
					</tr>
				</thead>
				<tbody>
					{
						userDataSaved.map((item, key) =>
							<tr key={key}>
								<td>
									<a href={item.originalLink}>{item.originalLink}</a>
								</td>

								<td>
									<a href={item.linkshortened}>{item.linkshortened}</a>
								</td>

								<td>
									{item.dateshort}
								</td>
							</tr>
						)
					}
				</tbody>
			</Table>
		</Container>
	</div>
)

export default Historic