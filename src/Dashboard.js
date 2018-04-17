import React from 'react'
import { Link, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import App from './App'
import { logout } from './Auth.redux.js'


function home2() {
  return <h2>home2</h2>
}
function home3() {
  return <h2>home3</h2>
}

@connect(
    state => state.auth,
    { logout }
  )


class Dashboard extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props)
    const redirectToLogin = <Redirect to="/login"></Redirect>
    const app = (
      <div>
        <h1>标题。。</h1>
        { this.props.isAuth ? <button onClick={this.props.logout}>注销</button> : null }
        <ul>
          <li>
            <Link to="/dashboard">home1</Link>
          </li>
          <li>
            <Link to="/dashboard/home2">home2</Link>
          </li>
          <li>
            <Link to="/dashboard/home3">home3</Link>
          </li>
        </ul>
        <Route path="/dashboard/" exact component={App}></Route>
        <Route path="/dashboard/home2" component={home2}></Route>
        <Route path="/dashboard/home3" component={home3}></Route>
      </div>
    )
    return this.props.isAuth ? app : redirectToLogin
  }
}

export default Dashboard
