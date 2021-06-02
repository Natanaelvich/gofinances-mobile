import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Signin } from '../screens/Signin';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator headerMode="none">
      <Screen name="Signin" component={Signin} />
    </Navigator>
  );
}
