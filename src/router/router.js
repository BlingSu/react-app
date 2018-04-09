import React from 'react'

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

import Home from 'component/Home/Home'
import Page from 'component/Page/Page'
import Counter from 'component/Counter/Counter'
import UserInfo from 'component/UserInfo/UserInfo';

const getRouter = () => (
  <Router>
      <div>
          <ul>
              <li><Link to="/">首页</Link></li>
              <li><Link to="/page">Page</Link></li>
              <li><Link to="/counter">Counter</Link></li>
              <li><Link to="/userinfo">UserInfo</Link></li>
          </ul>
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/page" component={Page}/>
              <Route path="/counter" component={Counter}/>
              <Route path="/userinfo" component={UserInfo}/>
          </Switch>
      </div>
  </Router>
)

export default getRouter
