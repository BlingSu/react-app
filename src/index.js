import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'

import App from './App'
// import { counter} from './index.redux'
import reducers from './reducer'
import Auth from './Auth.js'
import Dashboard from './Dashboard.js'

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension(): f => f
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    reduxDevtools
  ))
console.log(store.getState())
function home2() {
  return <h2>home2</h2>
}
function home3() {
  return <h2>home3</h2>
}
// class Test extends React.Component{
//   render() {
//     console.log(this.props)
//     return <h2>test component {this.props.match.params.location}</h2>
//   }
// }

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>

      <Switch>
        <Route path="/login" exact component={Auth}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
        <Redirect to="dashboard"></Redirect>
        <Route path="/home3" component={home3}></Route>
      </Switch>

    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

// <Route path="/:location" component={Test}></Route>
