import React from 'react';

const Historic = ({ clearStorage, userDataSaved }) => (
  <div className="Historic">
    <div className="historic-title">
      <i className="fas fa-history" /> Seu histórico de links encurtados
      <button
        onClick={clearStorage}
        className="historic-clear-btn btn btn-outline-danger"
      >
        Limpar
      </button>
    </div>
    <div className="container">
      <div className="table-responsive">
        <table className="historic-table table">
          <thead className="">
            <tr className="">
              <th>Data</th>
              <th>Link original</th>
              <th>Link encurtado</th>
            </tr>
          </thead>
          <tbody>
            {userDataSaved.map((item, key) => (
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
        </table>
      </div>
    </div>
  </div>
);

export default Historic;
