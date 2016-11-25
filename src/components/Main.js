import React from 'react'
import { Link } from 'react-router'

import style from '../styles/Main.scss'
import 'leaflet/dist/leaflet.css'

class Main extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div className={style.container}>
        <div className={style.navigator}>
          <Link to="/map" className={style.link}>
            Map
          </Link>
          <Link to="/settings" className={style.link}>
            Settings
          </Link>
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default Main
