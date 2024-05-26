import { Fragment, useEffect } from 'react'

import BottomTabBarNavigation from '../navigation/BottomTabBarNavigation'
import FloatingActionButton from './FloatingActionButton'
import HamburgerBar from './HamburgerBar'
import { NavigationProp } from '../type';

interface CustomHeaderProps {
  navigation: NavigationProp;
}

const MainComponent: React.FC<CustomHeaderProps> = ({ navigation }) => {
  useEffect(() => {
    // Your initialization function here
    const initializeApp = () => {
      navigation.navigate('LogIn')
      console.log('App has started');
    };

    initializeApp();
  }, []);

  return (
    <Fragment>
      <BottomTabBarNavigation navigation={navigation} />
      <FloatingActionButton />
      <HamburgerBar />
    </Fragment>
  )
}

export default MainComponent
