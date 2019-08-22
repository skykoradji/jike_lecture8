import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Notification from '../components/Notification';
import theme from './theme';
import actions from './redux/actions';
import 'react-toastify/dist/ReactToastify.css';

const mapStateToProps = state => {
  return {
    user: state.user,
    authentication: state.authentication
  };
};

function withRoot(Component) {
  function App(props) {
    const { auth } = props;
    if (auth) {
      if (!props.authentication.isLoggedIn) {
        window.location.href = '/login';
        return null;
      }
    }
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Header {...props} />
        <div
          style={{
            marginTop: 20,
            padding: 30,
            maxWidth: 1000,
            minHeight: '72vh',
            margin: '0 auto'
          }}
        >
          <Component {...props} />
        </div>
        <Notification />
        <Footer />
      </MuiThemeProvider>
    );
  }

  return connect(
    mapStateToProps,
    actions
  )(App);
}

export default withRoot;
