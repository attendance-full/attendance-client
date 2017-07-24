import React, { Component } from 'react';
import { Card, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import KeyboardArrowLeftIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import KeyboardArrowRightIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

const buttonStyle = {
	minWidth: '44px'
};

const size=5;

class Pagination extends Component {

	constructor(props) {
		super(props);
		this.state = {pages: [], currentPage: 0, pageCount: 0, current: 0, count: 0};
	}

	componentWillReceiveProps(newProps) {
		const { totalCount, pageSize, currentPage } = newProps;
		this.setState({ totalCount, pageSize, currentPage }, () =>
			this.calRenderPages()
		);
	}

	calRenderPages() {
		const { totalCount, pageSize, currentPage } = this.state;
	 	const current = Math.ceil(currentPage / size) - 1;
	 	const count = Math.ceil(totalCount / pageSize)
	 	const pageCount = Math.ceil(count / size);
	 	this.setState({ pageCount, current, count });
	}

	pageChanged(currentPage) {
		if (currentPage == this.state.currentPage) {
			return;
		}
		this.setState({currentPage});
		this.props.pageChanged(currentPage);
	}

	render() {
		const { currentPage, current, pageCount, totalCount, count } = this.state;
		const pages = [];
	 	for(var i = current * 5 + 1; i <= current * 5 + 5 && i <= count; i ++) {
	 		pages.push(i);
	 	}
		return <Card>
			<CardActions>
				<RaisedButton disabled={current == 0}
					icon={<KeyboardArrowLeftIcon />}
					style={buttonStyle}
					onTouchTap={() => this.setState({current: current - 1})}/>
				{
					pages.map((item, index) => <RaisedButton key={index}
						primary={item == currentPage}
						style={buttonStyle}
						onTouchTap={() => this.pageChanged(item)}
						label={item}/>)
				}
				<RaisedButton disabled={current >= pageCount - 1}
					icon={<KeyboardArrowRightIcon />}
					style={buttonStyle}
					onTouchTap={() => this.setState({current: current + 1})}/>
			</CardActions>
		</Card>
	}
}

Pagination.propTypes = {
	totalCount: React.PropTypes.number,
	pageSize: React.PropTypes.number,
	currentPage: React.PropTypes.number,
	pageChanged: React.PropTypes.func
}

export default Pagination;
