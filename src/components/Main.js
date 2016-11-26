import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { setActiveApp, setLocation, loadAllDataPoints, loadAllClusters, loadBasicRoute } from '../store/actions'

import style from '../styles/Main.scss'
import MapIcon from 'react-icons/lib/io/ios-location'
import SettingsIcon from 'react-icons/lib/io/ios-cog'
import BusIcon from 'react-icons/lib/io/android-bus'

import 'leaflet/dist/leaflet.css'

class Main extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.loadData()
    window.addEventListener('hashchange', () => {
      this.props.setActive(window.location.hash.substr(1).replace('/', ''))
    })
  }
  render() {
    return (
      <div className={style.container}>
        <div className={style.navigator}>
          <Link to="/map"
            className={style.link + (this.props.activeApp == 'map' ? ' ' + style.activeApp : '')}>
            <MapIcon size={24} />
            <span>Map</span>
          </Link>
          <Link to="/buses"
            className={style.link + (this.props.activeApp == 'buses' ? ' ' + style.activeApp : '')}>
            <BusIcon size={24} />
            <span>Transit</span>
          </Link>
          <Link to="/settings"
            className={style.link + (this.props.activeApp == 'settings' ? ' ' + style.activeApp : '')}>
            <SettingsIcon size={24} />
            <span>Settings</span>
          </Link>
        </div>
        {this.props.children}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: (id) => {
      dispatch(loadAllDataPoints())
      dispatch(loadAllClusters())
      dispatch(loadBasicRoute())
    },
    saveLocation: (location) => dispatch(setLocation(location)),
    setActive: (id) => dispatch(setActiveApp(id))
  }
}

const mapStateToProps = (state) => ({
  activeApp: state.preferences.activeApp,
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
