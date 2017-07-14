import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import Drawer from 'material-ui/Drawer';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

class Dashboard extends Component {

	renderRightElement() {
		return <IconMenu
		    iconButtonElement={
		      <IconButton><MoreVertIcon /></IconButton>
		    }
		    targetOrigin={{horizontal: 'right', vertical: 'top'}}
		    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
		  >
		    <MenuItem primaryText="Refresh" />
		    <MenuItem primaryText="Help" />
		    <MenuItem primaryText="Sign out" />
	  </IconMenu>
	}

	render() {
		return <div>
			<AppBar
		    title="Title"
		    iconElementLeft={<IconButton><NavigationClose /></IconButton>}
		    iconElementRight={this.renderRightElement()}
		  />
		  <Drawer open={false}>
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </Drawer>
		</div>
	}
}

export default Dashboard;
