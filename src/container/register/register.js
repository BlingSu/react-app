import React from 'react'
import Logo from '../../component/logo/logo'
import {List, Radio, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'

class Register extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      type: 'job_seeker'
    }
  }
  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        <Logo></Logo>
        <WingBlank>
          <List>
            <InputItem>用户名</InputItem>
            <WhiteSpace />
            <InputItem>密码</InputItem>
            <WhiteSpace />
            <InputItem>确认密码</InputItem>
          </List>
          <WhiteSpace />
          <RadioItem checked={this.state.type == 'job_seeker'}>求职者</RadioItem>
          <RadioItem checked={this.state.type == 'boss'}>老板</RadioItem>
          <WhiteSpace />
          <Button type="primary">登录</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register
