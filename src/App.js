import React from 'react';
import {Button} from 'antd-mobile'

class App extends React.Component{
  render() {
    const name = 'name1'
    return (
      <div>
        <h2>test. {name}</h2>
        <Ly boss="ly"></Ly>
        <Qby boss="ly3"></Qby>
      </div>
    )
  }
}

function Qby(props) {
  return <h2>....{props.boss}, 'go'</h2>
}

class Ly extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      solders: ['小1', '小2']
    }
    // this.addSolder = this.addSolder.bind(this)
  }

  componentWillMount() {
    console.log('马上！')
  }
  componentDidMount() {
    console.log('ojbkl')
  }

  addSolder() {
    console.log(1)
    this.setState({
      solders: [...this.state.solders, 'new demo']
    })
  }

  render() {
    console.log('222222')
    // const age = '22'
    return(
      <div>
        <h2>age1,{this.props.boss}</h2>
        <Button type="primary" onClick={() => this.addSolder()}>按钮</Button>
        <ul>
          {this.state.solders.map(v => {
            return <li key={v}>{v}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default App