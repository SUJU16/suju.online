import React from 'react'
import { Router, Route, browserHistory } from 'react-router'

import logo from '../assets/logo.png'
import '../styles/App.scss'

import Main from './Main'
import MapPage from './Map'
import SettingsPage from './Settings'

class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Main}>
          <Route path="map" component={MapPage}/>
          <Route path="settings" component={SettingsPage}/>
        </Route>
      </Router>
    )
  }
}

export default App
