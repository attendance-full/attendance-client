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
import { fetch, buildUrl } from '../../components/api/Api';


class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { loadGradeSuccess, loadClassesSuccess } = this.props;
    const options = {
      method: 'GET',
    }
    fetch(buildUrl('/settings/grade'), options)
      .then(response => {
        if (response.code == '200') {
          loadGradeSuccess(response.data);
          fetch(buildUrl('/settings/class'), options)
            .then(response => {
              if (response.code == '200') {
                loadClassesSuccess(response.data);
              }
            })
            .catch(() => {
            });
        }
      })
      .catch(() => {
      });
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
  dismissMessage: React.PropTypes.func,
  loadGradeSuccess: React.PropTypes.func,
  loadClassesSuccess: React.PropTypes.func,
}

const mapStateToProps = (state) => {
  return Object.assign({}, state.app);
}

const mapDispatchToProps = (dispatch) => {
  return {
    dismissMessage: (message) => dispatch(appActions.dismissMessage(message)),
    loadGradeSuccess: (grade) => dispatch(appActions.loadGradeSuccess(grade)),
    loadClassesSuccess: (classes) => dispatch(appActions.loadClassesSuccess(classes))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
