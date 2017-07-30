import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { actions as appActions } from '../../app';
import { fetch, buildUrl } from '../../../components/api/Api';
import md5 from 'md5';

class ChangePassword extends Component {
	constructor(props) {
		super(props);

		this.state = { oldPassword: '', newPassword: '', confirmPassword: '' };
	}

	submit() {
		const { oldPassword, newPassword, confirmPassword } = this.state;
		const { startLoading, stopLoading, showMessage } = this.props;
		if (oldPassword.length === 0) {
			showMessage('请输入旧密码');
			return;
		}

		if (newPassword.length === 0) {
			showMessage('请输入新密码');
			return;
		}

		if (confirmPassword.length === 0) {
			showMessage('请再次输入新密码');
			return;
		}

		if (newPassword != confirmPassword) {
			showMessage('两次输入的新密码不一致');
			return;
		}

		startLoading();
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				oldPassword: md5(oldPassword),
				newPassword: md5(newPassword)
			}),
		}
		fetch(buildUrl('/change-password'), options)
			.then(response => {
				stopLoading();
				if (response.code == '200') {
					showMessage('修改密码成功');
					this.props.history.goBack();
				} else {
					showMessage(response.message);
				}
			})
			.catch(() => {
				stopLoading();
			});
	}

	render() {
		return <Card style={{width: '500px', margin: 'auto', padding: '40px 20px'}}>
			<CardTitle title='密码修改' />
			<CardText>
				<TextField
		      hintText='请输入旧密码'
		      floatingLabelText='旧密码'
		      type='password'
		      onChange={(e) => this.setState({oldPassword: e.target.value})}
		      fullWidth
		    /><br />
		    <TextField
		      hintText='请输入新密码'
		      floatingLabelText='新密码'
		      type='password'
		      onChange={(e) => this.setState({newPassword: e.target.value})}
		      fullWidth
		    /><br />
		    <TextField
		      hintText='请再次输入新密码'
		      floatingLabelText='确认新密码'
		      type='password'
		      onChange={(e) => this.setState({confirmPassword: e.target.value})}
		      fullWidth
		    /><br />
		  </CardText>
	    <CardActions style={{margin: 'auto', paddingBottom: '20px'}}>
	    	<RaisedButton label="提交" primary onTouchTap={() => this.submit()} />
	    </CardActions>
		</Card>;
	}
}

ChangePassword.propTypes = {
	showMessage: React.PropTypes.func,
	startLoading: React.PropTypes.func,
	stopLoading: React.PropTypes.func,
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
