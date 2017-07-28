import './employee_list.less'
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
  TableFooter,
} from 'material-ui/Table';
import Pagination from '../../../../components/pagination';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover/Popover';
import { actions as appActions } from '../../../app';
import { fetch, buildUrl } from '../../../../components/api/Api';
import { renderQrUrl } from '../../../../utils/utils';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import CodeIcon from 'material-ui/svg-icons/action/code';
import ViewListIcon from 'material-ui/svg-icons/action/view-list';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const pageSize = 20;

class EmployeeList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			phone: '',
			gradeId: '',
			classId: '',
			page: 1,
			list: [],
			totalCount: 0,
			qrCode: '',
			open: false,
			anchor: null,
			selectItem: null
		};
	}

	componentDidMount() {
		this.query();
	}

	query() {
		const { name, phone, gradeId, classId, page } = this.state;
		const { startLoading, stopLoading, showMessage } = this.props;

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
				phone,
				gradeId,
				classId,
				page,
				pageSize
			}),
		}
		startLoading();
		fetch(buildUrl('/employee/query'), options)
			.then(response => {
				stopLoading();
				if (response.code == '200') {
					this.setState({ list: response.data.list, totalCount: response.data.totalCount });
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

	pageChanged(page) {
		this.setState({ page }, () => {
			this.query();
		});
	}

	jumpToRecordList(item) {
		this.props.history.push({pathname: '/dashboard/record-list',
			query: {
				phone: item.phone,
			}
		});

	}

	eidtEmployee(item) {
		this.props.history.push({pathname: `/dashboard/employee-edit/${item.id}`});
	}

	confirmDelete(item) {
		this.setState({ selectItem: item })
	}

	deleteEmployee(item) {
		const { startLoading, stopLoading, showMessage } = this.props;
		fetch(buildUrl(`/employee/${item.id}`), { method: 'DELETE' })
			.then(response => {
				stopLoading();
				if (response.code == '200') {
					this.query();
					showMessage('删除成功');
				} else {
					showMessage(response.message);
				}
			})
			.catch(() => {
				stopLoading();
			});
	}

	showQRcode(item, event) {
		event.preventDefault();
    this.setState({
      open: true,
      anchor: event.currentTarget,
      qrCode: renderQrUrl(item)
    });
	}

	handleRequestClose() {
		this.setState({
      open: false,
    });
	}

	handleClose(deleteStudent) { 
		if (deleteStudent) {
			this.deleteEmployee(this.state.selectItem);
		}
		this.setState({ selectItem: null });
	}

	render() {
		const { name, phone, gradeId, classId, list, totalCount, page, open, qrCode, anchor, selectItem } = this.state;
		const { grade } = this.props;

		const actions = [
      <FlatButton
        label="确认删除"
        primary
        onTouchTap={() => this.handleClose(true)}
      />,
      <FlatButton
        label="取消"
        onTouchTap={() => this.handleClose(false)}
      />,
    ];


		const classes = this.getClasses(gradeId);	

		return <div>
			<Paper>
				<Table className='searchPanel'
					selectable={false}>
					<TableBody>
						<TableRow>
							<TableRowColumn>
								<TextField
						      hintText='请搜索的姓名'
						      floatingLabelText='姓名'
						      onChange={(e) => this.setState({ name: e.target.value })}
						      fullWidth
						    />
							</TableRowColumn>
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
						</TableRow>
						<TableRow>
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
				<Table selectable={false}
					bodyStyle={{overflow: 'visible'}}>
			    <TableHeader>
			      <TableRow>
			        <TableHeaderColumn>姓名</TableHeaderColumn>
			        <TableHeaderColumn>学号</TableHeaderColumn>
			        <TableHeaderColumn>班级</TableHeaderColumn>
			        <TableHeaderColumn></TableHeaderColumn>
			      </TableRow>
			    </TableHeader>
			    <TableBody style>
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
				        <TableRowColumn style={{overflow: 'visible'}}>
					        <IconButton tooltip="查看记录"
					        	tooltipPosition="bottom-left"
					        	onTouchTap={() => this.jumpToRecordList(item)}>
							      <ViewListIcon />
							    </IconButton>
							    <IconButton tooltip="修改信息"
							    	onTouchTap={() => this.eidtEmployee(item)}>
							      <ModeEditIcon />
							    </IconButton>
							    <IconButton tooltip="删除信息"
							    	tooltipStyles={{zIndex: '2000'}}
							    	onTouchTap={() => this.confirmDelete(item)}>
							      <DeleteIcon />
							    </IconButton>
							    <IconButton tooltip="查看二维码"
							    	onTouchTap={(event) => this.showQRcode(item, event)}>
							      <CodeIcon />
							    </IconButton>
				        </TableRowColumn>
				      </TableRow>
				    })
			    }
			    </TableBody>
			    <TableFooter>
			    	<Pagination totalCount={totalCount}
			    		pageSize={pageSize}
			    		currentPage={page}
			    		pageChanged={(page) => this.pageChanged(page)}/>
			    </TableFooter>
			  </Table>
			  <Popover
          open={open}
          anchorEl={anchor}
          onRequestClose={() => this.handleRequestClose()}
        >
        	<a href={qrCode} download><img src={qrCode} /></a>
        </Popover>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.selectItem != null}
          onRequestClose={() => this.handleClose(false)}
        >
          {`您确定要删除${selectItem == null || selectItem.name}的信息？`}
        </Dialog>
			</Paper>
		</div>
	}
}

EmployeeList.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
