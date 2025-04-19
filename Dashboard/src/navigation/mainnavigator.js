import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../features/Login';
import DrawerNavigator from './DrawerNavigator';
import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';

const Stack = createNativeStackNavigator();

const MainNavigator = ({ navigation }) => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown:false
          }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default MainNavigator;