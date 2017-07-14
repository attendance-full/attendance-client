import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Route
} from 'react-router-dom';
import Login from '../login/login';
import { bindActionCreators } from 'redux';
import { connect} from 'react-redux';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var loading = null;
    if (this.props.loading) {
      loading = <div className='loading_container'>123</div>;
    }
    return (
      <div>
        {loading}
        <Route exact path="/" component={Login} />
      </div>
    );
  }
}

App.propTypes = {
  loading: React.PropTypes.bool
}

const mapStateToProps = (state) => {
  return state.loading;
}

export default connect(mapStateToProps)(App);
