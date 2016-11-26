import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { setLocation } from '../store/actions'

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
    navigator.geolocation.getCurrentPosition(pos => {
      this.props.setLocation({ltd: pos.coords.latitude, lon: pos.coords.longitude})
    })
  }
  render() {
    return (
      <div className={style.container}>
        <div className={style.navigator}>
          <Link to="/map" className={style.link}>
            <MapIcon size={24} />
            <span>Map</span>
          </Link>
          <Link to="/buses" className={style.link}>
            <BusIcon size={24} />
            <span>Transit</span>
          </Link>
          <Link to="/settings" className={style.link}>
            <SettingsIcon size={24} />
            <span>Settings</span>
          </Link>
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default connect(undefined, {
  setLocation
})(Main)
