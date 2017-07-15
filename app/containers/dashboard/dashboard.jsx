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
import Paper from 'material-ui/Paper';

class Dashboard extends Component {

	constructor(props) {
    super(props);

    this.state = {open: false};
  }

	renderRightElement() {
		return <IconMenu
		    iconButtonElement={
		      <IconButton><MoreVertIcon /></IconButton>
		    }
		    targetOrigin={{horizontal: 'right', vertical: 'top'}}
		    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
		  >
		    <MenuItem primaryText="Refresh" />
		    <MenuItem primaryText="Help" />
		    <MenuItem primaryText="Sign out" />
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
        	onTouchTap={() => history.push({pathname: `${match.path}/employee-edit/1`})} />
      </Drawer>
      <div className='dashboard_container'>
      	<Route exact path={match.path} component={EmployeeList} />
      	<Route path={`${match.path}/employee-view`} component={EmployeeView} />
      	<Route path={`${match.path}/employee-edit/:id`} component={EmployeeEdit} />
      </div>
		</div>
	}
}

export default Dashboard;
