import { Fragment, useEffect } from 'react'

import BottomTabBarNavigation from '../navigation/BottomTabBarNavigation'
import FloatingActionButton from './FloatingActionButton'
import HamburgerBar from './HamburgerBar'
import { NavigationProp } from '../type';

interface CustomHeaderProps {
  navigation: NavigationProp;
}

const MainComponent: React.FC<CustomHeaderProps> = ({ navigation }) => {
  return (
    <Fragment>
      <BottomTabBarNavigation navigation={navigation} />
      <FloatingActionButton />
      <HamburgerBar />
    </Fragment>
  )
}

export default MainComponent
