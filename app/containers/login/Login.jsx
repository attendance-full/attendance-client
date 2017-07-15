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

class Login extends Component {

	componentWillMount() {
		this.setState({ username: '', password: '' });
	}

	handleSubmit() {
		this.props.showMessage(11111);
		this.props.history.push({pathname: '/dashboard'});
	}

	render() {
		const {
			username,
			password,
			valueChange
		} = this.props;
		console.log(username);

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
	valueChange: React.PropTypes.func
}

const mapStateToProps = (state) => {
  return Object.assign({}, state.login);
}

const mapDispatchToProps = (dispatch) => {
  return {
  	startLoading: () => dispatch(appActions.startLoading()),
  	stopLoading: () => dispatch(appActions.stopLoading()),
  	showMessage: (message) => dispatch(appActions.showMessage(message)),
  	valueChange: (key, value) => dispatch(loginActions.valueChange(key, value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
