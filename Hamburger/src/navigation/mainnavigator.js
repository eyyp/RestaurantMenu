import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../features/Login';
import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import Home from '../features/Home';
import Tables from '../features/Tables';
import ProductDetail from '../features/ProductDetail';
import Cart from '../features/Cart';
import Order from '../features/Order';

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
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Tables" component={Tables} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Order" component={Order} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default MainNavigator;