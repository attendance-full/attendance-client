import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { App } from './containers/app';
import RootReducer from './rootReducer';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import thunk from 'redux-thunk';

function logger({ getState }) {
  return (next) => (action) => {
    console.log('will dispatch', action)

    // 调用 middleware 链中下一个 middleware 的 dispatch。
    let returnValue = next(action)

    console.log('state after dispatch', getState())

    // 一般会是 action 本身，除非
    // 后面的 middleware 修改了它。
    return returnValue
  }
}

const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);

const store = createStoreWithMiddleware(RootReducer)

injectTapEventPlugin();

ReactDOM.render(
  (<BrowserRouter>
  	<Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
  		  <Route path="/" component={App} />
      </MuiThemeProvider>
  	</Provider>
  </BrowserRouter>),
  document.getElementById('content')
);
