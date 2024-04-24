import { Fragment } from 'react'

import Navigation from '../navigation/Navigation'
import FloatingActionButton from './FloatingActionButton'
import HamburgerBar from './HamburgerBar'

export default function MainComponent() {
  return (
    <Fragment>
      <Navigation />
      <FloatingActionButton />
      <HamburgerBar />
    </Fragment>
  )
}
