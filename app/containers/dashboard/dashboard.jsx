import './dashboard.less';
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import Drawer from 'material-ui/Drawer';
import { Route } from 'react-router-dom';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { EmployeeList } from  './employee/employee_list';
import { EmployeeView } from  './employee/employee_view';
import { EmployeeEdit } from  './employee/employee_edit';
import { RecordList } from  './record/record_list';
import Paper from 'material-ui/Paper';
import { actions as appActions } from '../app';
import { bindActionCreators } from 'redux';
import { connect} from 'react-redux';
import { fetch, buildUrl } from '../../components/api/Api';
import DatePicker from 'material-ui/DatePicker';

class Dashboard extends Component {

	constructor(props) {
    super(props);

    this.state = {open: false};
  }

  logout() {
  	const {
  		startLoading,
  		stopLoading,
  		showMessage
  	} = this.props;

  	startLoading();
  	const options = {
			method: 'GET',
			credentials: 'include',
		}
		fetch(buildUrl('/logout'), options)
			.then(response => {
				stopLoading();
				if (response.code == '200') {
					valueChange('password', '');
					history.push({pathname: '/'});
				} else {
					showMessage(response.message);
				}
			})
			.catch(() => {
				stopLoading();
			});
  }

	renderRightElement() {
		return <IconMenu
		    iconButtonElement={
		      <IconButton><MoreVertIcon /></IconButton>
		    }
		    targetOrigin={{horizontal: 'right', vertical: 'top'}}
		    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
		  >
		    <MenuItem onTouchTap={() => this.logout() } primaryText="登出" />
	  </IconMenu>
	}

	handleToggle() {
		this.setState({open: !this.state.open});
	}

	render() {
		const { open } = this.state;
		const { history, match } = this.props;
		return <div>
			<AppBar
		    title="Title"
		    onLeftIconButtonTouchTap={() => this.handleToggle()}
		    iconElementRight={this.renderRightElement()}
		  />
		  <Drawer
        docked={true}
        width={200}
        open={true}
        onTouchTap={() => this.handleToggle()}
        className='pc_container'
      >
	      <div className='menu_title'>
	      	标题
	      </div>
        <MenuItem primaryText='employee'
        	onTouchTap={() => history.push({pathname: `${match.path}`})} />
        <MenuItem primaryText='create'
        	innerDivStyle={{marginLeft: '20px'}}
        	onTouchTap={() => history.push({pathname: `${match.path}/employee-edit/-1`})} />
        <MenuItem primaryText='record'
        	onTouchTap={() => history.push({pathname: `${match.path}/record-list`})} />
      </Drawer>
      <div className='dashboard_container'>
      	<Route exact path={match.path} component={EmployeeList} />
      	<Route path={`${match.path}/employee-view`} component={EmployeeView} />
      	<Route path={`${match.path}/employee-edit/:id`} component={EmployeeEdit} />
      	<Route path={`${match.path}/record-list`} component={RecordList} />
      </div>
		</div>
	}
}

Dashboard.propTypes = {
	startLoading: React.PropTypes.func,
	stopLoading: React.PropTypes.func,
	showMessage: React.PropTypes.func,
}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
  	startLoading: () => dispatch(appActions.startLoading()),
  	stopLoading: () => dispatch(appActions.stopLoading()),
  	showMessage: (message) => dispatch(appActions.showMessage(message)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
