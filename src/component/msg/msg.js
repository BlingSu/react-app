import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

@connect(
  state => state
)

class Msg extends React.Component {
  getLast(arr) {
    return arr[arr.length - 1]
  }
  render() {
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id
    console.log(this.props)
    // 根据chatid 分组
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(item => {
      msgGroup[item.chatid] = msgGroup[item.chatid] || []
      msgGroup[item.chatid].push(item)
    })
    const chatList = Object.values(msgGroup)
    return (
      <div>
      <List>
      { chatList.map(v => {
        const lastItem = this.getLast(v)
        const targetId = v[0].from == userid ? v[0].to : v[0].from
        const unreadNum = v.filter(v => !v.read && v.to == userid).length
        if (!this.props.chat.users[targetId]) {
          return null
        }
        const name = this.props.chat.users[targetId].name ? this.props.chat.users[targetId].name : ''
        const avatar = this.props.chat.users[targetId].avatar ? this.props.chat.users[targetId].avatar : ''
          return (
            <Item 
              thumb={require(`../img/${avatar}.png`)} 
              extra={<Badge text={unreadNum}></Badge>}
              key={lastItem._id}>
              { lastItem.content }
              <Brief>{name}</Brief>
            </Item>
          )
        }) }
        </List>
      </div>
    )
  }
}

export default Msg