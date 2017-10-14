import React, { Component } from 'react';
import { fetch, buildUrl } from '../../components/api/Api';
import { bindActionCreators } from 'redux';
import { connect} from 'react-redux';
import { actions as appActions } from '../app';
import { urlSearchData } from '../../utils/utils';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

class Oauth extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			employee: { observer: [] },
			wechat: {},
			isLoadingEmployee: false,
			isLoadingWechat: false,
			bindUser: '',
			bindSuc: false
		};
	}

	componentDidMount() {
		this.setState({ isLoadingEmployee: true, isLoadingWechat: true }, () => {
			this.fetchData();
		});
	}

	fetchData() {
		const query = urlSearchData(this.props.location.search);
		if (query) {
			const { startLoading, showMessage, match } = this.props;
			const { state, code } = query;
			startLoading();
			fetch(buildUrl(`/employee/${state}`, match), {method: 'GET'})
				.then((response) => {
					if (response.code == 200) {
						this.setState({ employee: response.data, isLoadingEmployee: false }, ()=> this.checkEmployeeBind());
					} else {
						this.setState({ isLoadingEmployee: false }, ()=> this.checkEmployeeBind());
						showMessage(response.message);
					}
				})
				.catch(() => {
					this.setState({ isLoadingEmployee: false }, ()=> this.checkEmployeeBind());
				})

			fetch(buildUrl(`/wechat/oauth?code=${code}`, match), {method: 'GET'})
				.then((response) => {
					if (response.code == 200) {
						this.setState({ wechat: response.data, isLoadingWechat: false }, ()=> this.checkEmployeeBind());
					} else {
						showMessage(response.message);
						this.setState({ isLoadingWechat: false }, ()=> this.checkEmployeeBind());
					}
				})
				.catch(() => {
					this.setState({ isLoadingWechat: false }, ()=> this.checkEmployeeBind());
				})
		}
	}

	checkEmployeeBind() {
		const { isLoadingEmployee, isLoadingWechat, employee, wechat } = this.state;
		const { stopLoading } = this.props;
		if (!isLoadingWechat && !isLoadingEmployee) {
			stopLoading();
			var isExist = false;
			employee.observer.map((item) => {
				if (item.openid == wechat.openid) {
					isExist = true;
					return
				}
			});
			if (isExist == true) {
				this.setState({ bindSuc: true });
			}
		}
	}

	bind() {
		const { employee, wechat } = this.state;
		const { startLoading, showMessage, stopLoading, match } = this.props;
		wechat.employeeId = employee.id;
		startLoading();
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(wechat),
		}
		fetch(buildUrl(`/wechat/bind`, match), options)
			.then((response) => {
				if (response.code == 200) {
					this.setState({ isLoadingWechat: true, bindSuc: true }, ()=> this.checkEmployeeBind());
				} else {
					showMessage(response.message);
					this.setState({ isLoadingWechat: false }, ()=> this.checkEmployeeBind());
				}
				stopLoading();
			})
			.catch(() => {
				this.setState({ isLoadingWechat: false }, ()=> this.checkEmployeeBind());
				stopLoading();
			})
	}

	render() {
		const { employee, wechat, isLoadingEmployee, isLoadingWechat, bindSuc } = this.state;
		var bindUser = '';
		var remark = '';
		employee.observer.map((item) => bindUser += item.nickname + ',');
		if (bindUser.length > 0) {
			bindUser = bindUser.substring(0, bindUser.length - 1);
			remark = `订阅改学生信息还有${bindUser}。`
		}

		return <Card style={{margin:'20px'}}>
			<CardHeader
	      title={wechat.nickname}
	      avatar={wechat.headimgurl}
	    />
			{
				bindSuc ? 
				<div>
					<CardText>
			      {`恭喜您，已订阅${employee.name}的进出学校信息。${remark}`}
			    </CardText>
				</div>
				:
				<div>
			    <CardText>
			      {`欢迎使用校园管理系统，您现在正在订阅${employee.name}的进出学校信息。`}
			    </CardText>
			    <CardActions>
			      <RaisedButton primary label="订阅" style={{marginLeft: '20px', marginBottom: '20px'}}
			      	onTouchTap={() => this.bind()} />
			    </CardActions>
		    </div>
		  }
		</Card>
	}
}

Oauth.propTypes = {
	startLoading: React.PropTypes.func,
	stopLoading: React.PropTypes.func,
	showMessage: React.PropTypes.func,
}

const mapStateToProps = (state) => {
  return Object.assign({});
}

const mapDispatchToProps = (dispatch) => {
  return {
  	startLoading: () => dispatch(appActions.startLoading()),
  	stopLoading: () => dispatch(appActions.stopLoading()),
  	showMessage: (message) => dispatch(appActions.showMessage(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Oauth);
