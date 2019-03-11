import React from 'react';
import App, { Container } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import Navbar from './../components/NavbarApp';
import Footer from './../components/FooterApp';
import { ToastContainer } from 'react-toastify';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-121994767-2');
// ReactGA.pageview(window.location.pathname + window.location.search);

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  console.log('change complete');
  NProgress.done();
});
Router.events.on('routeChangeError', err => {
  console.log(err, 'change error');
  NProgress.done();
});

class Layout extends React.Component {
  render() {
    const { children } = this.props;
    return <div className="layout">{children}</div>;
  }
}

export default class extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Layout>
          <div className="app-content">
            <ToastContainer />
            <Navbar />
            <Component pageContext={this.pageContext} {...pageProps} />
            <Footer />
          </div>
        </Layout>
      </Container>
    );
  }
}
