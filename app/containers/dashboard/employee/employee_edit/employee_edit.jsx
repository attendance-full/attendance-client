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
import Checkbox from 'material-ui/Checkbox';


class EmployeeEdit extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if (this.idEdit()) {
			this.getInfo()
		} else {
			this.props.clearEditPage();
		}
	}

	getInfo() {
		const {
			match,
			showMessage,
			stopLoading,
			startLoading,
			initEditInfo,
		} = this.props;
		startLoading();
		fetch(buildUrl(`/employee/${match.params.id}`, match), {method: 'GET'})
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
			observedPhone,
			isObserved,
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

		if (!(/^1[34578]\d{9}$/.test(observedPhone))) {
			showMessage('请输入正确的手机号');
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
				rfid,
				observedPhone,
				isObserved
			}),
		}
		startLoading();
		fetch(buildUrl(this.idEdit() ? `/employee/${match.params.id}` : '/employee', match), options)
			.then(response => {
				stopLoading();
				if (response.code == '200') {
					showMessage('创建成功');
					clearEditPage();
					history.push({pathname: `/${match.params.prefix}/dashboard/employee-list`});
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
		const { startLoading, stopLoading, showMessage, valueChange, match } = this.props;
		const options = {
			method: 'GET',
		};
		startLoading();
		fetch(buildUrl('/rfid', match), options)
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
			grade,
			observedPhone,
			isObserved
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
        <TextField
		      hintText='请输入家长手机号'
		      floatingLabelText='家长手机号'
		      value={observedPhone}
		      onChange={(e) => valueChange('observedPhone', e.target.value)}
		      fullWidth
		    /><br />
		    <Checkbox
		      label="是否接受信息"
		      checked={isObserved == 1}
		      style={{ marginTop: '10px' }}
		      onCheck={() => valueChange('isObserved', 1 - isObserved)}
		    />
        <div style={{height: '72px'}}>
	        <div>
		        <TextField
				      hintText='请刷卡'
				      floatingLabelText='卡号'
				      value={rfid}
				      fullWidth
				    />
			    </div>
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
	observedPhone: React.PropTypes.string,
	isObserved: React.PropTypes.number,
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
