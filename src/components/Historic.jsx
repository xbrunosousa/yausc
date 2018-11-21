import React from 'react';
import { Table, Container, Button } from 'reactstrap';

const Historic = ({ clearStorage, userDataSaved }) => (
  <div className="Historic">
    <div className="historic-title">
      <i className="fas fa-history" /> Seu histórico de links encurtados
      <Button
        onClick={clearStorage}
        className="historic-clear-btn"
        size="sm"
        color="danger"
        outline
      >
        Limpar
      </Button>
    </div>
    <Container>
      <Table responsive className="historic-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Link original</th>
            <th>Link encurtado</th>
          </tr>
        </thead>
        <tbody>
          {userDataSaved.reverse().map((item, key) => (
            <tr key={key}>
              <td>{item.dateshort}</td>

              <td>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.originalLink}
                  href={item.originalLink}
                >
                  {item.originalLink
                    .substr(0, 25)
                    .replace('https://', '')
                    .replace('http://', '') + '...'}
                </a>
              </td>

              <td>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.linkshortened}
                  href={item.linkshortened}
                >
                  {item.linkshortened.replace('http://', '')}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  </div>
);

export default Historic;
