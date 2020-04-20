import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Components/Login'
import Home from './Components/Home'
import {createStackNavigator, createAppContainer, StackActions, NavigationActions, createBottomTabNavigator, createSwitchNavigator, createDrawerNavigator} from 'react-navigation';
console.disableYellowBox = true;
const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
  Login: {
    screen: Login,
  }
},{
    initialRouteName: 'Login',
});

const Navigator = createSwitchNavigator({
  Login: { screen: Login },
  Home: { screen: Home }
});
const App = createAppContainer(Navigator);
export default App;