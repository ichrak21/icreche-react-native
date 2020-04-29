import React, { Component } from 'react';
import { StyleSheet,
  Platform,
  View,
  Text,
  Image,
  TouchableOpacity,
  YellowBox,
  Dimensions,
  Button,
} from 'react-native';
import Login from './Components/Login'
import Home from './Components/Home'
import Identiter from './Components/Identiter'
import ListEnfant from './Components/ListEnfant'
import Journer from "./Components/Journer";
import Aliments from "./Components/Aliments";
import HistoriqueEvent from "./Components/HistoriqueEvent";
import HistoriqueMedicale from "./Components/HistoriqueMedicale";
import Message from "./Components/Message";
import Planning from "./Components/Planning"
import SideMenu from './Components/SideBar';
import {createStackNavigator, createAppContainer, StackActions, NavigationActions, createBottomTabNavigator, createSwitchNavigator, createDrawerNavigator} from 'react-navigation';
import { DrawerNavigator } from "react-navigation";
console.disableYellowBox = true;
const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
  Login: {
    screen: Login,
  },
  Identiter: {
    screen: Identiter
  },
  ListEnfant: {
    screen: ListEnfant
  },
  Journer: {
     screen: Journer},
  Aliments: { screen: Aliments},
  HistoriqueEvent: { screen: HistoriqueEvent},
  HistoriqueMedicale: { screen: HistoriqueMedicale},
  Message: { screen: Message},
  Planning: { screen: Planning},
},{
    initialRouteName: 'Login',
});
// const drawerNavigator = createDrawerNavigator({
//   AboutUs: { screen: Identiter }
// });

const Navigator = createSwitchNavigator({
  Login: { screen: Login },
  Home: { screen: Home },
  // Drawer: {screen: drawerNavigator},
  Identiter: {screen: Identiter},
  ListEnfant: { screen: ListEnfant},
  Journer: { screen: Journer},
  Aliments: { screen: Aliments},
  HistoriqueEvent: { screen: HistoriqueEvent},
  HistoriqueMedicale: { screen: HistoriqueMedicale},
  Message: { screen: Message},
  Planning: { screen: Planning},
});

const App = createAppContainer(Navigator);

export default App

// class NavigationDrawerStructure extends Component {
//   toggleDrawer = () => {
//     this.props.navigationProps.toggleDrawer();
//   };
//   render() {
//     return (
//       <View style={{ flexDirection: 'row' }}>
//         <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
//           {/*Donute Button Image */}
//           <Image
//             source={require('./assets/images/drawer.png')}
//             style={{ width: 25, height: 25, marginLeft: 5 }}
//           />
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

// const FirstActivity_StackNavigator = createStackNavigator({
//   Login: {
//     screen: Login,
//     navigationOptions: ({ navigation }) => ({
//       headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
//     }),
//   },
// });

// //Stack Navigator for the Second Option of Navigation Drawer
// const Screen2_StackNavigator = createStackNavigator({
//   //All the screen from the Second Option will be indexed here
//   Identiter: {
//     screen: Identiter,
//     navigationOptions: ({ navigation }) => ({
//       title: 'Demo Screen 2',
//       headerLeft: ()=>  <NavigationDrawerStructure navigationProps={navigation} />,

//       headerStyle: {
//         backgroundColor: '#FF9800',
//       },
//       headerTintColor: '#fff',
//     }),
//   },
// });

// //Stack Navigator for the Third Option of Navigation Drawer
// const Screen3_StackNavigator = createStackNavigator({
//   //All the screen from the Third Option will be indexed here
//   ListEnfant: {
//     screen: ListEnfant,
//     navigationOptions: ({ navigation }) => ({
//       title: 'Demo Screen 3',
//       headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
//       headerStyle: {
//         backgroundColor: '#FF9800',
//       },
//       headerTintColor: '#fff',
//     }),
//   },
// });
// const Screen4_StackNavigator = createStackNavigator({
//   //All the screen from the Third Option will be indexed here
//   Home: {
//     screen: Home,
//     navigationOptions: ({ navigation }) => ({
//       title: 'Demo Screen 3',
//       headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
//       headerStyle: {
//         backgroundColor: '#FF9800',
//       },
//       headerTintColor: '#fff',
//     }),
//   },
// });

// const Drawer = createDrawerNavigator(
//   {
//     //Drawer Optons and indexing

//     NavScreen2: { screen: Screen2_StackNavigator },
//     NavScreen3: { screen: Screen3_StackNavigator },
//     NavScreen4: { screen: Screen4_StackNavigator },
//   },
//   {
//     contentComponent: SideMenu,
//     drawerWidth: Dimensions.get('window').width - 120,
//   }
// );
// export default createAppContainer(Drawer);

