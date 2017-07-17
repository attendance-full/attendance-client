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

const items = [
  <MenuItem key={1} value={null} primaryText="" />,
  <MenuItem key={2} value={2} primaryText="Every Night" />,
  <MenuItem key={3} value={3} primaryText="Weeknights" />,
  <MenuItem key={4} value={4} primaryText="Weekends" />,
  <MenuItem key={5} value={5} primaryText="Weekly" />,
];

class EmployeeEdit extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			username,
			phone,
			gradeId,
			classId,
			studentId,
			valueChange
		} = this.props;

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
		      hintText='请输入手机号'
		      floatingLabelText='手机号'
		      value={phone}
		      onChange={(e) => valueChange('phone', e.target.value)}
		      fullWidth
		    /><br />
        <SelectField
          value={gradeId}
          onChange={(e) => valueChange('gradeId', e.target.value)}
          floatingLabelText="年级"
          fullWidth
        >
          {items}
        </SelectField>
        <SelectField
          value={classId}
          onChange={(e) => valueChange('classId', e.target.value)}
          floatingLabelText="班级"
          fullWidth
        >
          {items}
        </SelectField>
        <TextField
		      hintText='请输入学号'
		      floatingLabelText='学号'
		      value={studentId}
		      onChange={(e) => valueChange('studentId', e.target.value)}
		      fullWidth
		    /><br />
	    </CardText>
	    <CardActions style={{margin: 'auto', paddingBottom: '20px'}}>
	    	<RaisedButton label="提交" primary />
	    	<RaisedButton label="取消" />
	    </CardActions>
		</Card>;
	}
}

EmployeeEdit.propTypes = {
	username: React.PropTypes.string,
	phone: React.PropTypes.string,
	gradeId: React.PropTypes.string,
	classId: React.PropTypes.string,
	studentId: React.PropTypes.string,
	valueChange: React.PropTypes.func
}

const mapStateToProps = (state) => {
  return Object.assign({}, state.editedEmployee);
}

const mapDispatchToProps = (dispatch) => {
  return {
  	startLoading: () => dispatch(appActions.startLoading()),
  	stopLoading: () => dispatch(appActions.stopLoading()),
  	showMessage: (message) => dispatch(appActions.showMessage(message)),
  	valueChange: (key, value) => dispatch(editActions.valueChange(key, value)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeEdit);
