import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect} from 'react-redux';

class EmployeeView extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div>employee view</div>
	}
}

const mapStateToProps = (state) => {
  return Object.assign({}, state.employee);
}

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeView);
