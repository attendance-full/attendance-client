import './record_list.less';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect} from 'react-redux';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { actions as appActions } from '../../../app';
import DatePicker from 'material-ui/DatePicker';
import { serverDateToDate, serverDateToDateTime } from '../../../../utils/utils';
import { fetch, buildUrl } from '../../../../components/api/Api';

const pageSize = 20;
let DateTimeFormat;
DateTimeFormat = global.Intl.DateTimeFormat;

class RecordList extends Component {
	constructor(props) {
		super(props);
		this.state = { startDate: '', endDate: '', name: '', phone: '', gradeId: '', classId: '', page: 1, list: [] };
	}

	componentDidMount() {
	}

	query() {
		const { startDate, endDate, name, phone, gradeId, classId, page } = this.state;
		const { startLoading, stopLoading } = this.props;

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				startDate: serverDateToDate(startDate),
				endDate: serverDateToDate(endDate),
				name,
				phone,
				gradeId,
				classId,
				page,
				pageSize
			}),
		}
		startLoading();
		fetch(buildUrl('/record'), options)
			.then(response => {
				stopLoading();
				if (response.code == '200') {
					this.setState({ list: response.data.list });
				} else {
					showMessage(response.message);
				}
			})
			.catch(() => {
				stopLoading();
			});
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
		const { name, phone, gradeId, classId, list } = this.state;
		const { grade } = this.props;

		const classes = this.getClasses(gradeId);	

		return <div>
			<Paper>
				<Table className='searchPanel'
					selectable={false}>
					<TableBody>
						<TableRow>
							<TableRowColumn>
								<DatePicker
						      hintText="请选择开始时间"
						      floatingLabelText="开始时间"
						      DateTimeFormat={DateTimeFormat}
						      okLabel="确认"
						      cancelLabel="取消"
						      locale="cn"
						      autoOk
						      formatDate={(date) => serverDateToDate(date)}
						      onChange={(e, date) => this.setState({startDate: date})}
						      textFieldStyle={{
						      	width: '100%'
						      }}
						    />
							</TableRowColumn>
							<TableRowColumn>
								<DatePicker
						      hintText="请选择结束时间"
						      floatingLabelText="结束时间"
						      DateTimeFormat={DateTimeFormat}
						      okLabel="确认"
						      cancelLabel="取消"
						      locale="cn"
						      autoOk
						      formatDate={(date) => serverDateToDate(date)}
						      onChange={(e, date) => this.setState({endDate: date})}
						      textFieldStyle={{
						      	width: '100%'
						      }}
						    />
							</TableRowColumn>
							<TableRowColumn>
								<TextField
						      hintText='请搜索的姓名'
						      floatingLabelText='姓名'
						      onChange={(e) => this.setState({ name: e.target.value })}
						      fullWidth
						    />
							</TableRowColumn>
						</TableRow>
						<TableRow>
							<TableRowColumn>
								<TextField
						      hintText='请输入学号'
						      floatingLabelText='学号'
						      onChange={(e) => this.setState({ phone: e.target.value })}
						      fullWidth
						    />
							</TableRowColumn>
							<TableRowColumn>
								<SelectField
				          value={gradeId}
				          onChange={(e, key, payload) => {
				          	const newClasses = this.getClasses(payload);
				          	this.setState({gradeId: payload, classId: ''});
				          }}
				          floatingLabelText="年级"
				          fullWidth
				        >
				        	<MenuItem value="" primaryText="" />
				          {
				          	grade.map((item, index) => <MenuItem key={index} value={item.id} primaryText={item.displayName} />)
				          }
				        </SelectField>
							</TableRowColumn>	
							<TableRowColumn>
								<SelectField
				          value={classId}
				          onChange={(e, key, payload) => this.setState({classId: payload})}
				          floatingLabelText="班级"
				          fullWidth
				        >
				        	<MenuItem value="" primaryText="" />
				          {
				          	classes.map((item, index) => <MenuItem key={index} value={item.id} primaryText={item.displayName} />)
				          }
				        </SelectField>
							</TableRowColumn>
						</TableRow>
					</TableBody>
				</Table>					
				<RaisedButton label="搜索" primary style={{margin: '30px 20px'}} 
					onTouchTap={() => this.query()}/>
			</Paper>
			<Paper style={{marginTop: '20px'}}>
				<Table>
			    <TableHeader>
			      <TableRow>
			        <TableHeaderColumn>姓名</TableHeaderColumn>
			        <TableHeaderColumn>学号</TableHeaderColumn>
			        <TableHeaderColumn>班级</TableHeaderColumn>
			        <TableHeaderColumn>进／出</TableHeaderColumn>
			        <TableHeaderColumn>时间</TableHeaderColumn>
			      </TableRow>
			    </TableHeader>
			    <TableBody>
			    {
			    	list.map((item, index) => {
			    		const currentGrade = grade.filter((gradeItem) => gradeItem.id == item.gradeId);
			    		var displayed = '';
			    		var classes = [];
							if (currentGrade && currentGrade.length > 0) {
								displayed += currentGrade[0] ? currentGrade[0].displayName : '';
								if (currentGrade[0].classes) {
									classes = currentGrade[0].classes;
								}
							}
							const currentClass = classes.filter((classItem) => classItem.id == item.classId);
							if (currentClass && currentClass.length > 0) {
								displayed += currentClass[0] ? currentClass[0].displayName : '';
							}
			    		return <TableRow key={index}>
				        <TableRowColumn>{item.name}</TableRowColumn>
				        <TableRowColumn>{item.phone}</TableRowColumn>
				        <TableRowColumn>{displayed}</TableRowColumn>
				        <TableRowColumn>{item.type}</TableRowColumn>
				        <TableRowColumn>{serverDateToDateTime(item.createDate)}</TableRowColumn>
				      </TableRow>
				    })
			    }
			    </TableBody>
			  </Table>
			</Paper>
		</div>
	}
}

RecordList.propTypes = {
	list: React.PropTypes.array,
	grade: React.PropTypes.array,
	showMessage: React.PropTypes.func,
	startLoading: React.PropTypes.func,
	stopLoading: React.PropTypes.func,
}

const mapStateToProps = (state) => {
  return Object.assign({}, state.employeeList, {
  		grade: state.app.grade,
  	});
}

const mapDispatchToProps = (dispatch) => {
  return {
  	startLoading: () => dispatch(appActions.startLoading()),
  	stopLoading: () => dispatch(appActions.stopLoading()),
  	showMessage: (message) => dispatch(appActions.showMessage(message)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RecordList);
