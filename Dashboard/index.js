/**
 * @format
 */
import './gesture-handler';
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import MainNavigator from './src/navigation/mainnavigator';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => MainNavigator);
