import './Login.less';
import React, { Component } from 'react';
import { fetch, buildUrl } from '../../components/api/Api';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { bindActionCreators } from 'redux';
import { connect} from 'react-redux';
import { actions as loadingActions } from '../app';

class Login extends Component {

	componentWillMount() {
		this.setState({ username: '', password: '' });
	}

	handleSubmit (e) {
		console.log('123546')
		this.props.startLoading();
		// fetch(buildUrl('/chanpin/jichu/yonghu/denglu.action'), options)
		// 	.then(response => {
		// 		// if (response.state == '1') {
		// 		})
		// 	.catch();
	}

	onFormValueChange(key, value) {
		var newState = this.state;
		newState[key] = value;
		this.setState(newState);
	}

	render() {
		const { username, password } = this.state;
		return (
			<div className='login'>
				<h3 className='title'>系统登录</h3>
				<Paper className='card_container'
					zDepth={2}>
					<div>
						<TextField
				      hintText="请输入账户"
				      floatingLabelText="账户"
				      fullWidth />
				  </div>
				  <div>
						<TextField
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
	startLoading: React.PropTypes.func
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
  	startLoading: () => {dispatch(loadingActions.startLoading())}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
