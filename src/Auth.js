import React from 'react'
import { connect } from 'react-redux'
import { login } from './Auth.redux'
import { Redirect } from 'react-router-dom'

//合并redeux
@connect(
    state => state.auth,
    { login }
  )
class Auth extends React.Component{
  render() {
    return (
      <div>
        { this.props.isAuth ? <Redirect to="dashboard"></Redirect> : null }
        <h2>没有权限，需要登录一波</h2>
        <button onClick={this.props.login}>登录</button>
      </div>
    )
  }
}

export default Auth
