import React from 'react';
import PropTypes from 'prop-types'
import { Card, WingBlank } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

@withRouter
class UserCard extends React.Component {
  static propTypes = {
		userlist: PropTypes.array.isRequired
  }
  
  handleClick(v) {
    this.props.history.push(`/chat/${v._id}`)
  }
  render() {
    const Header = Card.Header
    const Body = Card.Body
    return (
      <WingBlank>
        {this.props.userlist.map(v => (
          v.avatar ? <Card key={v._id} onClick={() => this.handleClick(v)}>
            <Header
              title={v.user}
              thumb={require(`../img/${v.avatar}.png`)}
              extra={<span>{v.title}</span>}
            ></Header>
            {v.type === 'boss' ? <div>公司:{v.company}</div> : null}
            <Body>{v.desc.split('\n').map(d => (
              <div key={d}>{d}</div>
            ))}</Body>
            {v.type === 'boss' ? <div>{v.money}</div> : null}
          </Card> : null
        ))}
      </WingBlank>
    );
  }
}

export default UserCard