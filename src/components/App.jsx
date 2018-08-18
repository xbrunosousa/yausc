import React, { Component } from 'react';
import Form from './Form/Form';
import './App.css';
import { regexURL } from './../regex';
import ReactGA from 'react-ga';
import {
  Col,
  Container,
  Input,
  InputGroupAddon,
  Button,
  InputGroup
} from 'reactstrap';
import format from 'date-fns/format';
import Historic from './Historic/Historic';
import NavbarApp from './NavbarApp/NavbarApp';
import FooterApp from './FooterApp/FooterApp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  componentDidMount() {
    // Google Analytics
    ReactGA.initialize('UA-121994767-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
  constructor() {
    super();
    this.state = {
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
  }

  handleSearch = e => {
    this.setState({ errShort: false });
    const value = e.target.value;
    if (value.length !== undefined) {
      // Se há dados no input, defina-o no inputValue
      this.setState({ inputValue: value });
    }
    regexURL.test(value) === true
      ? this.setState({ valid: true })
      : this.setState({ valid: false });
  };

  shortLinkOnEnter = e => {
    if (this.state.valid === true && e.keyCode === 13) {
      // Se pressionado enter e o campo é válido...
      this.shortLink();
    }
  };

  shortLink = () => {
    const TOKEN = '5e933564f8015b00e7b23a4830acff93b45f2850';
    const BitlyClient = require('bitly');
    const bitly = new BitlyClient(TOKEN); // Generic Access Token bit.ly
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
          // Se existir dados salvos no localstorage...
          const oldItems = JSON.parse(localStorage.getItem('values-user')); // recupera os dados para o oldItems

          const newItems = {
            // Dados para salvar
            linkshortened: this.state.outputLink,
            dateshort: format(new Date(), 'DD/MM, HH:mm'),
            originalLink: this.state.inputValue
          };
          oldItems.push(newItems); // concatena os novos items com os itens antigos
          localStorage.setItem('values-user', JSON.stringify(oldItems)); // Envia os dados concatenados para o storage
        } else {
          const itemsToSave = [
            {
              // dados que serão salvos no storage...
              linkshortened: this.state.outputLink,
              dateshort: format(new Date(), 'DD/MM, HH:mm'),
              originalLink: this.state.inputValue
            }
          ];

          localStorage.setItem('values-user', JSON.stringify(itemsToSave)); // salva os dados acima em JSON
        }
        this.setState({ isShortening: undefined, isCopied: false });
      })
      .catch(() => {
        this.setState({ errShort: true, isShortening: false });
      });
  };

  clearStorage = () => {
    // Limpa os dados salvos no localStorage
    localStorage.clear();
    this.setState({ userDataSaved: null }); // Não haverá dados no localstorage, então...
  };

  copyLink = () => {
    document.getElementById('result').select(); // seleciona conteúdo do input
    document.execCommand('copy'); // copy selected
    this.setState({ isCopied: true }); // Auto explicativo 🤨
    this.successShortToast('Copiado para o clipboard! ✅');
  };

  onPaste = () => {
    setTimeout(() => {
      if (this.state.valid === true) {
        this.shortLink();
      }
    }, 1);
  };
  errorShortToast() {
    toast.error(
      'Houve um erro. Por favor, verifique a URL!',
      this.state.toastDefaultProps
    );
  }
  successShortToast(msg) {
    toast.success(msg, this.state.toastDefaultProps);
  }

  render() {
    const userDataSaved = JSON.parse(localStorage.getItem('values-user'));
    const QR_CODE_URL =
      'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=';
    return (
      <div className="App">
        <ToastContainer />
        <NavbarApp />
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
          <Container>
            <Col sm={{ size: 4, offset: 4 }}>
              <div className="result-link">
                <InputGroup>
                  <Input
                    bsSize="lg"
                    id="result"
                    readOnly
                    className="result-link-input"
                    type="text"
                    value={this.state.outputLink}
                  />
                  <InputGroupAddon addonType="append">
                    <Button className="button-copy" onClick={this.copyLink}>
                      {this.state.isCopied === true ? (
                        <i className="fas fa-clipboard-check copied" />
                      ) : (
                        <i className="fas fa-clipboard" />
                      )}
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
                <img
                  className="qrcode"
                  alt="Qr Code"
                  src={`${QR_CODE_URL}${this.state.outputLink}`}
                />
              </div>
            </Col>
          </Container>
        )}

        {userDataSaved !== null && (
          <Historic
            userDataSaved={userDataSaved}
            clearStorage={() => this.clearStorage()}
          />
        )}

        <FooterApp />
      </div>
    );
  }
}

export default App;
