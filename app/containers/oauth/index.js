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
			employee: {},
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
			const { startLoading, showMessage } = this.props;
			const { state, code } = query;
			startLoading();
			fetch(buildUrl(`/employee/${state}`), {method: 'GET'})
				.then((response) => {
					if (response.code == 200) {
						this.setState({ employee: response.data, isLoadingEmployee: false });
					} else {
						this.setState({ isLoadingEmployee: false });
						showMessage(response.message);
					}
				})
				.catch(() => {
					this.setState({ isLoadingEmployee: false });
				})

			fetch(buildUrl(`/wechat/oauth?code=${code}`), {method: 'GET'})
				.then((response) => {
					if (response.code == 200) {
						this.setState({ wechat: response.data, isLoadingWechat: false });
					} else {
						showMessage(response.message);
						this.setState({ isLoadingWechat: false });
					}
				})
				.catch(() => {
					this.setState({ isLoadingWechat: false });
				})
		}
	}

	bind() {
		const { employee, wechat } = this.state;
		const { startLoading, showMessage, stopLoading } = this.props;
		startLoading();
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				employeeId: employeeId,
				wechat: wechat,
			}),
		}
		fetch(buildUrl(`/wechat/bind`), options)
			.then((response) => {
				if (response.code == 200) {
					this.setState({bindUser: response.data, bindSuc: true});
				} else {
					showMessage(response.message);
					this.setState({ isLoadingWechat: false });
				}
			})
			.catch(() => {
				this.setState({ isLoadingWechat: false });
			})
	}

	render() {
		const { employee, wechat, isLoadingEmployee, isLoadingWechat, bindSuc, bindUser } = this.state;
		const { stopLoading } = this.props;
		if (!isLoadingWechat && !isLoadingEmployee) {
			stopLoading();
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
			      {`恭喜您，已订阅${employee.name}的进出学校信息，订阅改学生信息还有${bindUser}。`}
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
