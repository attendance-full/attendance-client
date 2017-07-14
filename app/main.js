import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { App } from './containers/app';
import RootReducer from './rootReducer';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

const store = createStore(
  RootReducer
)

injectTapEventPlugin();

ReactDOM.render(
  (<BrowserRouter>
  	<Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
  		  <Route exact path="/" component={App} />
      </MuiThemeProvider>
  	</Provider>
  </BrowserRouter>),
  document.getElementById('content')
);
