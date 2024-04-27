import { Fragment } from 'react'

import Navigation from '../navigation/Navigation'
import FloatingActionButton from './FloatingActionButton'
import HamburgerBar from './HamburgerBar'
import { NavigationProp } from '../type';

interface CustomHeaderProps {
  navigation: NavigationProp;
}

const MainComponent: React.FC<CustomHeaderProps> = ({ navigation }) => {
  return (
    <Fragment>
      <Navigation navigation={navigation} />
      <FloatingActionButton />
      <HamburgerBar />
    </Fragment>
  )
}

export default MainComponent
