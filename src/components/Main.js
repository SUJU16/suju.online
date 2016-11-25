import React from 'react'
import { Link } from 'react-router'

import style from '../styles/Main.scss'

class Main extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div className={style.container}>
        <div className={style.navigator}>
          <Link to="/one">Link 1</Link>
          <Link to="/two">Link 2</Link>
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default Main
