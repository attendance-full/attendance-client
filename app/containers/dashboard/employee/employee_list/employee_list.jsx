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
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class EmployeeList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { list } = this.props;
		return <div>
			<Paper>
				<Table className='searchPanel'
					selectable={false}>
					<TableBody>
						<TableRow>
							<TableRowColumn>
								<TextField
						      hintText='请输入姓名'
						      floatingLabelText='姓名'
						      fullWidth
						    />
							</TableRowColumn>
							<TableRowColumn>
								<TextField
						      hintText='请输入姓名'
						      floatingLabelText='姓名'
						      fullWidth
						    />
							</TableRowColumn>
							<TableRowColumn>
								<TextField
						      hintText='请输入姓名'
						      floatingLabelText='姓名'
						      fullWidth
						    />
							</TableRowColumn>
						</TableRow>
						<TableRow>
							<TableRowColumn>
								<TextField
						      hintText='请输入姓名'
						      floatingLabelText='姓名'
						      fullWidth
						    />
							</TableRowColumn>
						</TableRow>
					</TableBody>
				</Table>					
				<RaisedButton label="搜索" primary style={{margin: '30px 20px'}} />
			</Paper>
			<Paper style={{marginTop: '20px'}}>
				<Table>
			    <TableHeader>
			      <TableRow>
			        <TableHeaderColumn>姓名</TableHeaderColumn>
			        <TableHeaderColumn>电话</TableHeaderColumn>
			        <TableHeaderColumn>地址</TableHeaderColumn>
			      </TableRow>
			    </TableHeader>
			    <TableBody>
			    {
			    	list.map((item, index) => <TableRow key={index}>
				        <TableRowColumn>{item.name}</TableRowColumn>
				        <TableRowColumn>{item.phone}</TableRowColumn>
				        <TableRowColumn>{item.address}</TableRowColumn>
				      </TableRow>)
			    }
			    </TableBody>
			  </Table>
			</Paper>
		</div>
	}
}

EmployeeList.propTypes = {
	list: React.PropTypes.array,
}

const mapStateToProps = (state) => {
  return Object.assign({}, state.employeeList);
}

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
