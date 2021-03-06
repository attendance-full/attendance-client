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
import ChangePassword from './password';
import StructureManager from './structure/structure_manage/';

class Dashboard extends Component {

	constructor(props) {
    super(props);

    this.state = {open: false};
  }

  componentDidMount() {
    const { loadGradeSuccess, loadClassesSuccess, match } = this.props;
    const options = {
      method: 'GET',
    }
    fetch(buildUrl('/settings/grade', match), options)
      .then(response => {
        if (response.code == '200') {
          loadGradeSuccess(response.data);
          fetch(buildUrl('/settings/class', match), options)
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

  logout() {
  	localStorage.removeItem('token')	;
    const { match } = this.props;
  	this.props.history.push({pathname: `/${match.params.prefix}`});
  }

  changePassword() {
    const { match } = this.props;
  	this.props.history.push({pathname: `/${match.params.prefix}/dashboard/change-password`});
  }

	renderRightElement() {
		return <IconMenu
		    iconButtonElement={
		      <IconButton><MoreVertIcon /></IconButton>
		    }
		    targetOrigin={{horizontal: 'right', vertical: 'top'}}
		    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
		  >
		  	<MenuItem onTouchTap={() => this.changePassword() } primaryText="修改密码" />
		    <MenuItem onTouchTap={() => this.logout() } primaryText="登出" />
	  </IconMenu>
	}

	handleToggle() {
		this.setState({open: !this.state.open});
	}

	checkActive(url) {
		if (this.props.location.pathname.indexOf(url) >= 0) {
			return { background: 'antiquewhite' }
		}
		return {};
	}

	render() {
		const { open } = this.state;
		const { history, match, username } = this.props;
    var menu = <MenuItem primaryText='记录信息'
            innerDivStyle={this.checkActive('/record-list')}
            onTouchTap={() => history.push({pathname: `/${match.params.prefix}/dashboard/record-list`})} />
    if (username == 'admin') {
      menu = <div>
          <MenuItem primaryText='记录信息'
              innerDivStyle={this.checkActive('/record-list')}
              onTouchTap={() => history.push({pathname: `/${match.params.prefix}/dashboard/record-list`})} />
          <MenuItem primaryText='人员管理'
            innerDivStyle={this.checkActive('/employee-list')}
            onTouchTap={() => history.push({pathname: `/${match.params.prefix}/dashboard/employee-list`})} />
          <MenuItem primaryText='创建/修改'
            innerDivStyle={Object.assign({}, {paddingLeft: '40px'}, this.checkActive('/employee-edit'))}
            onTouchTap={() => history.push({pathname: `/${match.params.prefix}/dashboard/employee-edit/-1`})} />
          <MenuItem primaryText='班级管理'
            innerDivStyle={this.checkActive('/structure-manage')}
            onTouchTap={() => history.push({pathname: `/${match.params.prefix}/dashboard/structure-manage`})} />
        </div>
    }
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
	      	微校徽
	      </div>
        {menu}
      </Drawer>
      <div className='dashboard_container'>
        <Route path={`${match.path}/record-list`} component={RecordList} />
      	<Route exact path={`${match.path}/employee-list`} component={EmployeeList} />
      	<Route path={`${match.path}/employee-view`} component={EmployeeView} />
      	<Route path={`${match.path}/employee-edit/:id`} component={EmployeeEdit} />
      	<Route path={`${match.path}/change-password`} component={ChangePassword} />
      	<Route path={`${match.path}/structure-manage`} component={StructureManager} />
      </div>
		</div>
	}
}

Dashboard.propTypes = {
  username: React.PropTypes.string,
	startLoading: React.PropTypes.func,
	stopLoading: React.PropTypes.func,
	showMessage: React.PropTypes.func,
	loadGradeSuccess: React.PropTypes.func,
  loadClassesSuccess: React.PropTypes.func,
}

const mapStateToProps = (state) => {
  const username = state.login.username;
  return {
    username
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  	startLoading: () => dispatch(appActions.startLoading()),
  	stopLoading: () => dispatch(appActions.stopLoading()),
  	showMessage: (message) => dispatch(appActions.showMessage(message)),
  	loadGradeSuccess: (grade) => dispatch(appActions.loadGradeSuccess(grade)),
    loadClassesSuccess: (classes) => dispatch(appActions.loadClassesSuccess(classes))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
