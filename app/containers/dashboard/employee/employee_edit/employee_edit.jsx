import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { actions as editActions } from './index';
import { actions as appActions } from '../../../app';
import { fetch, buildUrl } from '../../../../components/api/Api';
import IconButton from 'material-ui/IconButton';
import CachedHome from 'material-ui/svg-icons/action/cached';


class EmployeeEdit extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if (this.idEdit()) {
			this.getInfo()
		}
	}

	getInfo() {
		const {
			match,
			showMessage,
			stopLoading,
			startLoading,
			initEditInfo
		} = this.props;
		startLoading();
		fetch(buildUrl(`/employee/${match.params.id}`), {method: 'GET'})
			.then((response) => {
				stopLoading();
				if (response.code == 200) {
					initEditInfo(response.data)
				} else {
					showMessage(response.message);
				}
			})
			.catch(() => {
				stopLoading();
			})
	}

	submit() {
		const {
			username,
			phone,
			gradeId,
			classId,
			rfid,
			history,
			match,
			showMessage,
			stopLoading,
			startLoading,
			clearEditPage
		} = this.props;
		if (username.trim().length == 0){
			showMessage('请输入姓名');
			return;
		}

		if (phone.trim().length == 0) {
			showMessage('请输入学号');
			return;
		}

		const options = {
			method: this.idEdit() ? 'PUT' : 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: username,
				phone,
				gradeId,
				classId,
				rfid
			}),
		}
		startLoading();
		fetch(buildUrl(this.idEdit() ? `/employee/${match.params.id}` : '/employee'), options)
			.then(response => {
				stopLoading();
				if (response.code == '200') {
					showMessage('创建成功');
					clearEditPage();
					history.push({pathname: '/dashboard'});
				} else {
					showMessage(response.message);
				}
			})
			.catch(() => {
				stopLoading();
			});
	}

	idEdit() {
		return this.props.match.params.id >= 0;
	}

	getNewestRFID() {
		const { startLoading, stopLoading, showMessage, valueChange } = this.props;
		const options = {
			method: 'GET',
		};
		startLoading();
		fetch(buildUrl('/rfid'), options)
			.then(response => {
				stopLoading();
				if (response.code == 200) {
					valueChange('rfid', response.data.identity)
				} else {
					showMessage(response.message);
				}
			})
			.catch(() => {
				stopLoading();
			})
	}

	getClasses(gradeId) {
		var classes = [];
		const currentGrade = this.props.grade.filter((item) => item.id == gradeId);
		if (currentGrade && currentGrade.length > 0) {
			if (currentGrade[0].classes) {
				classes = currentGrade[0].classes;
			}
		}
		return classes;
	}

	render() {
		const {
			username,
			phone,
			gradeId,
			classId,
			rfid,
			valueChange,
			grade
		} = this.props;

		const classes = this.getClasses(gradeId);

		return <Card style={{width: '500px', margin: 'auto', padding: '40px 20px'}}>
			<CardTitle title='创建' />
			<CardText>
				<TextField
		      hintText='请输入姓名'
		      floatingLabelText='姓名'
		      value={username}
		      onChange={(e) => valueChange('username', e.target.value)}
		      fullWidth
		    /><br />
		    <TextField
		      hintText='请输入学号'
		      floatingLabelText='学号'
		      value={phone}
		      onChange={(e) => valueChange('phone', e.target.value)}
		      fullWidth
		    /><br />
        <SelectField
          value={gradeId}
          onChange={(e, key, payload) => {
          	var newClasses = this.getClasses(payload);
          	if (newClasses.length > 0) {
          		valueChange('classId', newClasses[0].id);
          	} else {
          		valueChange('classId', '');
          	}
          	valueChange('gradeId', payload);
          }}
          floatingLabelText="年级"
          fullWidth
        >
          {
          	grade.map((item, index) => <MenuItem key={index} value={item.id} primaryText={item.displayName} />)
          }
        </SelectField>
        <SelectField
          value={classId}
          onChange={(e, key, payload) => valueChange('classId', payload)}
          floatingLabelText="班级"
          fullWidth
        >
          {
          	classes.map((item, index) => <MenuItem key={index} value={item.id} primaryText={item.displayName} />)
          }
        </SelectField>
        <div style={{height: '72px'}}>
        <div style={{width: '85%', float: 'left'}}>
	        <TextField
			      hintText='请输入学号'
			      floatingLabelText='卡号'
			      value={rfid}
			      disabled
			      onChange={(e) => valueChange('phone', e.target.value)}
			      fullWidth
			    />
		    </div>
		    <IconButton style={{marginTop: '25px'}}
		    	tooltip="点击获取卡号"
		    	onTouchTap={() => this.getNewestRFID()}>
		      <CachedHome />
		    </IconButton>
		    </div>
	    </CardText>
	    <CardActions style={{margin: 'auto', paddingBottom: '20px'}}>
	    	<RaisedButton label="提交" primary onTouchTap={() => this.submit()} />
	    	<RaisedButton label="取消" />
	    </CardActions>
		</Card>;
	}
}

EmployeeEdit.propTypes = {
	username: React.PropTypes.string,
	phone: React.PropTypes.string,
	gradeId: React.PropTypes.number,
	classId: React.PropTypes.number,
	valueChange: React.PropTypes.func,
	grade: React.PropTypes.array,
	showMessage: React.PropTypes.func,
	startLoading: React.PropTypes.func,
	stopLoading: React.PropTypes.func,
	clearEditPage: React.PropTypes.func,
	initEditInfo: React.PropTypes.func,
}

const mapStateToProps = (state) => {
  return Object.assign({},
  	state.editedEmployee,
  	{
  		grade: state.app.grade,
  	}
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
  	startLoading: () => dispatch(appActions.startLoading()),
  	stopLoading: () => dispatch(appActions.stopLoading()),
  	showMessage: (message) => dispatch(appActions.showMessage(message)),
  	valueChange: (key, value) => dispatch(editActions.valueChange(key, value)),
  	clearEditPage: () => dispatch(editActions.clearEditPage()),
  	initEditInfo: (info) => dispatch(editActions.initEditInfo(info)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeEdit);
