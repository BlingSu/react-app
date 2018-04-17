import React from 'react'
import { connect } from 'react-redux'
import { addGun, removeGun, addGunAsync } from './index.redux'

@connect(
  state => ({num:state.counter}),
  { addGun, removeGun, addGunAsync }
)

class App extends React.Component{
  render() {
    return (
      <div>
        <h1>now have ok === {this.props.num}</h1>
        <button onClick={this.props.addGun}>增加</button>
        <button onClick={this.props.removeGun}>减少</button>
        <button onClick={this.props.addGunAsync}>测试async</button>
      </div>
    )
  }
}

export default App
