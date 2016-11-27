import React from 'react'
import ReactSlider from 'react-slider'

import Page from './Page'

const SettingsPage = () => (
  <Page>
    <div>
      <ReactSlider defaultValue={[0, 33, 67, 100]} withBars />
    </div>
  </Page>
)

export default SettingsPage
