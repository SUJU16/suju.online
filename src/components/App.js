import React from 'react'
import { Redirect, Router, Route, hashHistory } from 'react-router'

import logo from '../assets/logo.png'
import '../styles/App.scss'

import Main from './Main'
import MapPage from './Map'
import SettingsPage from './Settings'

class App extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Redirect from="/" to="map" />
        <Route path="/" component={Main}>
          <Route path="map" component={MapPage}/>
          <Route path="settings" component={SettingsPage}/>
        </Route>
      </Router>
    )
  }
}

export default App
