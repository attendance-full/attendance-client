import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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
			roleId,
			address,
			usernameError,
			phoneError,
			roleIdError
		} = this.props;

		return <Card style={{width: '500px', margin: 'auto', padding: '40px 20px'}}>
			<CardTitle title='创建' />
			<CardText>
				<TextField
		      hintText='请输入姓名'
		      floatingLabelText='姓名'
		      value={username}
		      fullWidth
		    /><br />
		    <TextField
		      hintText='请输入手机号'
		      floatingLabelText='手机号'
		      fullWidth
		    /><br />
		    <SelectField
          value={null}
          onChange={this.handleChange}
          floatingLabelText="角色"
          fullWidth
        >
          {items}
        </SelectField>
		    <TextField
		      hintText='请输入地址'
		      floatingLabelText='地址'
		      multiLine={true}
		      fullWidth
		    />
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
	roleId: React.PropTypes.string,
	address: React.PropTypes.string,
	usernameError: React.PropTypes.string,
	phoneError: React.PropTypes.string,
	roleIdError: React.PropTypes.string,
}

const mapStateToProps = (state) => {
  return Object.assign({}, state.editedEmployee);
}

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeEdit);
