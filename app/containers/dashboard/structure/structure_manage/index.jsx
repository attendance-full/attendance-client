import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { actions as appActions } from '../../../app';
import MenuItem from 'material-ui/MenuItem';
import { fetch, buildUrl } from '../../../../components/api/Api';

class StructureManage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newGradeName: '',
			delGradeId: '',
			newClassGradeId: '',
			newClassName: '',
			delClassGradeId: '',
			delClassId: ''
		}
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

	addGrade() {
		const { newGradeName } = this.state;
		if (newGradeName.length == 0) {
			this.props.showMessage('请输入新的年级');
			return;
		}
		this.operateActionSubmit('/structure/add-grade', { gradeName: newGradeName });
	}

	delGrade() {
		const { delGradeId } = this.state;
		if (delGradeId.length == 0) {
			this.props.showMessage('请选择要删除的班级');
			return;
		}
		this.operateActionSubmit('/structure/del-grade', { id: delGradeId });
	}

	addClass() {
		const { newClassGradeId, newClassName } = this.state;
		if (newClassName.length == 0) {
			this.props.showMessage('请输入新的班级');
			return;
		}
		this.operateActionSubmit('/structure/add-class', { gradeId: newClassGradeId, className: newClassName });
	}

	delClass() {
		const { delClassId } = this.state;
		if (delClassId.length == 0) {
			this.props.showMessage('请选择要删除的班级');
			refreshStrusture();
			return;
		}
		this.operateActionSubmit('/structure/del-class', { id: delClassId });
	}

	operateActionSubmit(action, body) {
		const { startLoading, stopLoading, showMessage } = this.props;
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body),
		}
		startLoading();
		fetch(buildUrl(action), options)
			.then(response => {
				stopLoading();
				if (response.code == '200') {
					showMessage('操作成功');
					this.refreshStrusture();
				} else {
					showMessage(response.message);
				}
			})
			.catch(() => {
				stopLoading();
			});
	}

	refreshStrusture() {
		const { loadGradeSuccess, loadClassesSuccess } = this.props;
    const options = {
      method: 'GET',
    }
    fetch(buildUrl('/settings/grade'), options)
      .then(response => {
        if (response.code == '200') {
          loadGradeSuccess(response.data);
          fetch(buildUrl('/settings/class'), options)
            .then(response => {
              if (response.code == '200') {
                loadClassesSuccess(response.data);
              }
            })
            .catch(() => {
            });
        }
      })
      .catch(() => {
      });
	}


	render() {
		const { delGradeId, newClassGradeId, delClassGradeId, delClassId } = this.state;
		const { grade } = this.props;
		return <div>
			<Card style={{marginBottom: '20px', padding: '0 20px'}}>
				<CardTitle title='年级添加' />
				<CardText>
					<TextField
			      hintText='请输入新的年级'
			      floatingLabelText='年级'
			      onChange={(e) => this.setState({newGradeName: e.target.value})}
			      fullWidth
			    /><br />
			  </CardText>
		    <CardActions style={{marginBottom: '20px', paddingBottom: '20px'}}>
		    	<RaisedButton label="添加" primary onTouchTap={() => this.addGrade()} />
		    </CardActions>
			</Card>
			<Card style={{margin: 'auto', padding: '0 20px'}}>
				<CardTitle title='年级删除' />
				<CardText>
					<SelectField
						value={delGradeId}
	          onChange={(e, key, payload) =>
	          	this.setState({delGradeId : payload})}
	          floatingLabelText="年级"
	          fullWidth
	        >
	        {
          	grade.map((item, index) => <MenuItem key={index} value={item.id} primaryText={item.displayName} />)
          }
	        </SelectField>
			  </CardText>
		    <CardActions style={{marginBottom: '20px', paddingBottom: '20px'}}>
		    	<RaisedButton label="删除" primary onTouchTap={() => this.delGrade()} />
		    </CardActions>
			</Card>
			<Card style={{margin: 'auto', padding: '0 20px'}}>
				<CardTitle title='班级添加' />
				<CardText>
					<SelectField
						value={newClassGradeId}
	          onChange={(e, key, payload) =>
	          	this.setState({newClassGradeId : payload})}
	          floatingLabelText="年级"
	          fullWidth
	        >
	        {
	        	grade.map((item, index) => <MenuItem key={index} value={item.id} primaryText={item.displayName} />)
	        }
	        </SelectField>
					<TextField
			      hintText='请输入新的班级'
			      floatingLabelText='班级'
			      onChange={(e) => this.setState({newClassName: e.target.value})}
			      fullWidth
			    /><br />
			  </CardText>
		    <CardActions style={{marginBottom: '20px', paddingBottom: '20px'}}>
		    	<RaisedButton label="添加" primary onTouchTap={() => this.addClass()} />
		    </CardActions>
			</Card>
			<Card style={{margin: 'auto', padding: '0 20px'}}>
				<CardTitle title='班级删除' />
				<CardText>
					<SelectField
						value={delClassGradeId}
	          onChange={(e, key, payload) =>
	          	this.setState({delClassGradeId : payload})}
	          floatingLabelText="年级"
	          fullWidth
	        >
	        {
	        	grade.map((item, index) => <MenuItem key={index} value={item.id} primaryText={item.displayName} />)
	        }
	        </SelectField>
	        <SelectField
	        	value={delClassId}
	          onChange={(e, key, payload) =>
	          	this.setState({delClassId : payload})}
	          floatingLabelText="班级"
	          fullWidth
	        >
	        {
          	this.getClasses(delClassGradeId).map((item, index) => <MenuItem key={index} value={item.id} primaryText={item.displayName} />)
          }
	        </SelectField>
			  </CardText>
		    <CardActions style={{margin: 'auto', paddingBottom: '20px'}}>
		    	<RaisedButton label="删除" primary onTouchTap={() => this.delClass()} />
		    </CardActions>
			</Card>
		</div>;
	}
}

StructureManage.propTypes = {
	grade: React.PropTypes.array,
	showMessage: React.PropTypes.func,
	startLoading: React.PropTypes.func,
	stopLoading: React.PropTypes.func,
	loadGradeSuccess: React.PropTypes.func,
  loadClassesSuccess: React.PropTypes.func,
}

const mapStateToProps = (state) => {
  return Object.assign({},
  	{},
  	{
  		grade: state.app.grade,
  	}
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
  	startLoading: () => dispatch(appActions.startLoading()),
  	stopLoading: () => dispatch(appActions.stopLoading()),
  	showMessage: (message) => dispatch(appActions.showMessage(message)),
  	loadGradeSuccess: (grade) => dispatch(appActions.loadGradeSuccess(grade)),
    loadClassesSuccess: (classes) => dispatch(appActions.loadClassesSuccess(classes))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(StructureManage);
