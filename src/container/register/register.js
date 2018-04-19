import React from 'react'
import Logo from '../../component/logo/logo'
import {List, Radio, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'

@connect(
  state => state.user,
  {register}
)

class Register extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      repeatpwd: '',
      type: 'job_seeker'
    }
    this.handleRegister = this.handleRegister.bind(this)
  }
  handleRegister() {
    this.props.register(this.state)
  }
  handleChange(key, val) {
    this.setState({ [key]: val })
  }
  render() {
		const RadioItem = Radio.RadioItem
    return (
      <div>
        <Logo></Logo>
        <WingBlank>
          <List>
            {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
            <InputItem
              onChange={v=>this.handleChange('user', v)}>用户名</InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              onChange={v=>this.handleChange('pwd', v)}>密码</InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              onChange={v=>this.handleChange('repeatpwd', v)}>确认密码</InputItem>
          </List>
          <WhiteSpace />
          <RadioItem
            checked={this.state.type == 'job_seeker'}
            onClick={()=>this.handleChange('type', 'job_seeker')}>求职者</RadioItem>
          <RadioItem
            checked={this.state.type == 'boss'}
            onClick={()=>this.handleChange('type', 'boss')}>老板</RadioItem>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register
