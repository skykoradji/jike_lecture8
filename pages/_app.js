// pages/_app.js
import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from '../lib/redux';
import actions from '../lib/redux/actions';

const { store, persistor } = configureStore();

export default withRedux(store, { debug: false }, actions)(
  class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
      const init = (await Component.getInitialProps(ctx)) || {};
      return {
        pageProps: {
          // Call page-level getInitialProps
          ...init,
          query: ctx.query,
          host: (ctx.req && ctx.req.headers.host) || window.location.host,
          pathname: ctx.pathname
        }
      };
    }

    render() {
      const { Component, pageProps, store } = this.props;

      return (
        <Container>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <Component {...pageProps} />
            </PersistGate>
          </Provider>
        </Container>
      );
    }
  }
);
