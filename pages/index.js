import React from 'react';
import Head from '../components/base/Head.js';
import './../assets/scss/index.scss';
import Historic from './../components/Historic';
import format from 'date-fns/format';
import { regexURL } from './../helpers/regex';
import Form from './../components/Form';
import { toast } from 'react-toastify';

export default class Home extends React.Component {
  state = {
    inputValue: undefined,
    outputLink: undefined,
    valid: false,
    isShortening: false,
    isShortened: false,
    userDataSaved: undefined,
    isCopied: false,
    errShort: false,
    toastDefaultProps: {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    }
  };

  componentDidMount = () => {
    if (localStorage.getItem('values-user')) {
      let userDataSaved = JSON.parse(
        localStorage.getItem('values-user')
      ).reverse();
      this.setState({ userDataSaved });
    }
  };

  handleSearch = e => {
    this.setState({ errShort: false });
    const value = e.target.value;
    if (value.length) {
      this.setState({ inputValue: value });
    }
    regexURL.test(value)
      ? this.setState({ valid: true })
      : this.setState({ valid: false });
  };

  shortLinkOnEnter = e => {
    if (this.state.valid && e.keyCode === 13) {
      this.shortLink();
    }
  };

  shortLink = () => {
    const TOKEN = '5e933564f8015b00e7b23a4830acff93b45f2850';
    const BitlyClient = require('bitly');
    const bitly = new BitlyClient(TOKEN);
    this.setState({ isShortening: true });
    bitly
      .shorten(this.state.inputValue)
      .then(res => {
        this.setState({
          outputLink: res.data.url,
          isShortening: false,
          isShortened: true
        });
        this.successShortToast('Link encurtado com sucesso!');
        if ('values-user' in localStorage) {
          const oldItems = JSON.parse(localStorage.getItem('values-user'));

          const newItems = {
            linkshortened: this.state.outputLink,
            dateshort: format(new Date(), 'DD/MM, HH:mm'),
            originalLink: this.state.inputValue
          };
          oldItems.push(newItems);
          localStorage.setItem('values-user', JSON.stringify(oldItems));
        } else {
          const itemsToSave = [
            {
              linkshortened: this.state.outputLink,
              dateshort: format(new Date(), 'DD/MM, HH:mm'),
              originalLink: this.state.inputValue
            }
          ];

          localStorage.setItem('values-user', JSON.stringify(itemsToSave));
        }
        this.setState({ isShortening: undefined, isCopied: false });
      })
      .catch(() => {
        this.setState({ errShort: true, isShortening: false });
      });
  };

  clearStorage = () => {
    localStorage.clear();
    this.setState({ userDataSaved: null });
  };

  copyLink = () => {
    document.getElementById('result').select();
    document.execCommand('copy');
    this.setState({ isCopied: true });
    this.successShortToast('Copiado para o clipboard! ✅');
  };

  onPaste = () => {
    setTimeout(() => {
      if (this.state.valid) {
        this.shortLink();
      }
    }, 1);
  };

  errorShortToast = () => {
    toast.error(
      'Houve um erro. Por favor, verifique a URL!',
      this.state.toastDefaultProps
    );
  };

  successShortToast = msg => {
    toast.success(msg, this.state.toastDefaultProps);
  };

  render = () => {
    const QR_CODE_URL =
      'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=';
    return (
      <div>
        <Head
          title="YAUSC - Link Shortener with React JS"
          url="https://yausc.xyz"
        />

        <div className="App">
          <Form
            handleSearch={e => this.handleSearch(e)}
            shortLink={() => this.shortLink()}
            shortLinkOnEnter={e => this.shortLinkOnEnter(e)}
            valid={this.state.valid}
            isShortening={this.state.isShortening}
            onPaste={() => this.onPaste()}
          />

          {this.state.errShort && this.errorShortToast()}

          {this.state.isShortened && (
            <div className="container">
              <div className="col-sm-4 offset-sm-4">
                <div className="result-link">
                  <div className="input-group">
                    <input
                      id="result"
                      readOnly
                      className="form-control result-link-input"
                      type="text"
                      value={this.state.outputLink}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-primary button-copy"
                        onClick={this.copyLink}
                      >
                        {this.state.isCopied ? (
                          <i className="fas fa-clipboard-check copied" />
                        ) : (
                          <i className="fas fa-clipboard" />
                        )}
                      </button>
                    </div>
                  </div>
                  <img
                    className="qrcode"
                    alt="Qr Code"
                    src={`${QR_CODE_URL}${this.state.outputLink}`}
                  />
                </div>
              </div>
            </div>
          )}

          {this.state.userDataSaved && (
            <Historic
              userDataSaved={this.state.userDataSaved}
              clearStorage={() => this.clearStorage()}
            />
          )}
        </div>
      </div>
    );
  };
}
