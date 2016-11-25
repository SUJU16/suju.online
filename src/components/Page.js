import React from 'react'

import css from '../styles/Page.scss'

const Page = ({children, className = ''}) => (
  <div className={css.container}>
    {children}
  </div>
)

export default Page
