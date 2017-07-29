import './login.less';
import React, { Component } from 'react';
import { fetch, buildUrl } from '../../components/api/Api';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { bindActionCreators } from 'redux';
import { connect} from 'react-redux';
import { actions as appActions } from '../app';
import { actions as loginActions } from './index';
import md5 from 'md5';

class Login extends Component {

	componentWillMount() {
		this.setState({ username: '', password: '' });
	}

	handleSubmit() {
		const {
			username,
			password,
			startLoading,
			stopLoading,
			history,
			showMessage,
			valueChange
		} = this.props;
		startLoading();
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password: md5(password)
			}),
		}
		fetch(buildUrl('/login'), options)
			.then(response => {
				stopLoading();
				if (response.code == '200') {
					valueChange('password', '');
					localStorage.setItem('token', response.data.token);
					history.push({pathname: '/dashboard/employee-list'});
				} else {
					showMessage(response.message);
				}
			})
			.catch(() => {
				stopLoading();
			});
	}

	render() {
		const {
			username,
			password,
			valueChange
		} = this.props;

		return (
			<div className='login'>
				<h3 className='title'>系统登录</h3>
				<Paper className='card_container'
					zDepth={2}>
					<div>
						<TextField
							value={username}
							onChange={(e) => valueChange('username', e.target.value)}
				      hintText="请输入账户"
				      floatingLabelText="账户"
				      fullWidth />
				  </div>
				  <div>
						<TextField
							value={password}
							onChange={(e) => valueChange('password', e.target.value)}
				      hintText="请输入密码"
				      floatingLabelText="密码"
				      type='password'
				      fullWidth />
				  </div>
				  <RaisedButton label="登录"
						primary
						fullWidth
						className='login_button'
						onTouchTap={() => this.handleSubmit()} />
				</Paper>
			</div>
		)
	}
}

Login.propTypes = {
	username: React.PropTypes.string,
	password: React.PropTypes.string,
	startLoading: React.PropTypes.func,
	stopLoading: React.PropTypes.func,
	showMessage: React.PropTypes.func,
	valueChange: React.PropTypes.func,
	login: React.PropTypes.func,
}

const mapStateToProps = (state) => {
  return Object.assign({}, state.login);
}

const mapDispatchToProps = (dispatch) => {
  return {
  	startLoading: () => dispatch(appActions.startLoading()),
  	stopLoading: () => dispatch(appActions.stopLoading()),
  	showMessage: (message) => dispatch(appActions.showMessage(message)),
  	valueChange: (key, value) => dispatch(loginActions.valueChange(key, value)),
  	login: (username, password) => dispatch(loginActions.login(username, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
