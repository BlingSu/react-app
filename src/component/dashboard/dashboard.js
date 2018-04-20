import React from 'react'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import NavLinkBar from '../navlink/navlink'
import { Switch, Route } from 'react-router-dom'
import Boss from '../../component/boss/boss'

function Genius() {
  return <h2>Genius shouye </h2>
}
function Msg() {
  return <h2>msg shouye </h2>
}
function User() {
  return <h2>user shouye </h2>
}
@connect(
  state => state
)

class Dashboard extends React.Component {

  render() {
		const { pathname } = this.props.location
		console.log(pathname, '11')
    const user = this.props.user
    const navList = [
			{
				path: '/boss',
				text: '求职者',
				icon: 'boss',
				title: '求职者列表',
				component: Boss,
				hide: user.type=='genius'
			},
			{
				path: '/genius',
				text: 'boss',
				icon: 'job',
				title: 'BOSS列表',
				component: Genius,
				hide: user.type=='boss'
			},
			{
				path: '/msg',
				text: '消息',
				icon: 'msg',
				title: '消息列表',
				component: Msg
			},
			{
				path: '/me',
				text: '我',
				icon: 'user',
				title: '个人中心',
				component: User
			}
    ]
    
    return (
      <div>
				<NavBar className="fix-header" mode="dark">{navList.find(v => v.path == pathname).title}</NavBar>
				<div style={{marginTop:20}}>
					<Switch>
						{navList.map(v => (
							<Route key={v.path} path={v.path} component={v.component}></Route>
						))}
					</Switch>
				</div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}

export default Dashboard