import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { NavigationProp } from '../type';

const ProtectedScreen = (WrappedComponent: React.ComponentType<any>) => {
  const ProtectedComponent: React.FC<NavigationProp> = (props) => {
    const { user } = useAuth();

    useEffect(() => {
      if (!user) {
        props.navigation.navigate('LogIn');
      }
    }, [user, props.navigation]);

    if (user === null) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    // Render the wrapped component if user is authenticated
    return <WrappedComponent {...props} />;
  };

  return ProtectedComponent;
};

export default ProtectedScreen;
