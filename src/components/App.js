import React from 'react'
import { Router, Route, browserHistory } from 'react-router'

import logo from '../assets/logo.png'
import '../styles/App.scss'

import Main from './Main'

const dummy1 = () => <div><h2>dummy 1</h2></div>
const dummy2 = () => <div><h2>dummy 2</h2></div>

class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Main}>
          <Route path="one" component={dummy1}/>
          <Route path="two" component={dummy2}/>
        </Route>
      </Router>
    )
  }
}

export default App
