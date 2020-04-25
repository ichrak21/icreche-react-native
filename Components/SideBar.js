import React, { Component } from 'react';
import {
  ScrollView, Text, View, StyleSheet, Alert
} from 'react-native';

import {Content} from 'native-base';
import {NavigationActions} from 'react-navigation';
import { StackNavigator } from 'react-navigation';

import PropTypes from 'prop-types';


const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
  },
  heading: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
  },
  menuItem:{
      padding: 20,
      borderWidth: 0.5,
      borderColor: '#d6d7da'
  }
});

class Sidebar extends Component {
  constructor(props){
    super(props)
    this.navigate  = props.navigation;
  }
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    console
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }

  render() {
    console.log(this.props)
    // const { navigate } = this.props.navigation;
    return (
          <Content style={{backgroundColor:'#FFFFFF'}}>
            <View>
              <ScrollView>
                <View>
                  <View style={styles.menuItem}>
                    <Text >
                      Journée
                    </Text>
                  </View>
                  <View style={styles.menuItem}>
                    <Text >
                    Identité
                    </Text>
                  </View>
                  <View style={styles.menuItem}>
                    <Text >
                    Hitorique Médical
                    </Text>
                  </View>
                  <View style={styles.menuItem}>
                    <Text >
                    Aliments
                    </Text>
                  </View>
                  <View style={styles.menuItem}>
                    <Text >
                    Planning
                    </Text>
                  </View>
                  <View style={styles.menuItem}>
                    <Text >
                    Historique Evénements
                    </Text>
                  </View>
                  <View style={styles.menuItem}>
                    <Text >
                    Message
                    </Text>
                  </View>
                  <View style={styles.menuItem}>
                    <Text >
                    Communauté
                    </Text>
                  </View>
                  <View style={styles.menuItem}>
                    <Text >
                    Créche
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </Content>
    );
  }
}
Sidebar.propTypes = {
  navigation: PropTypes.object
};

export default Sidebar;