import './app.less';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Route
} from 'react-router-dom';
import { Login } from '../login';
import { Dashboard } from '../dashboard';
import { bindActionCreators } from 'redux';
import { connect} from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { actions as appActions } from './index';
import CircularProgress from 'material-ui/CircularProgress';


class App extends Component {
  constructor(props) {
    super(props);
  }

  handleRequestClose() {

  }

  render() {
    const {
      open,
      loading,
      message,
      dismissMessage
    } = this.props;
    var loadingPanel = null;
    if (loading) {
      loadingPanel = <div className='loading_container'>
        <CircularProgress className='loading_icon' size={80} thickness={5} />
      </div>;
    }
    return (
      <div>
        {loadingPanel}
        <Snackbar
          open={open}
          message={message}
          autoHideDuration={2000}
          onRequestClose={() => dismissMessage()}
        />
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </div>
    );
  }
}

App.propTypes = {
  loading: React.PropTypes.bool,
  dismissMessage: React.PropTypes.func
}

const mapStateToProps = (state) => {
  return Object.assign({}, state.app);
}

const mapDispatchToProps = (dispatch) => {
  return {
    dismissMessage: (message) => dispatch(appActions.dismissMessage(message))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
