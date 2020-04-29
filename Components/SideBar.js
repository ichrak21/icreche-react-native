import React, { Component } from 'react';
import {
  ScrollView, Text, View, StyleSheet, Alert
} from 'react-native';

import {Content, Button} from 'native-base';
import {NavigationActions} from 'react-navigation';
import { DrawerActions } from 'react-navigation';
import Identiter from "../assets/images/icon-identite.svg";
import Journer from "../assets/images/icon-journee.svg";
import Aliments from "../assets/images/icon-aliments.svg";
import HistoriqueEvent from "../assets/images/icon-historique-evenements.svg";
import HistoriqueMedicale from "../assets/images/icon-historique-medical.svg";
import Message from "../assets/images/icon-message.svg";
import Planning from "../assets/images/icon-planning.svg"

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
      borderColor: '#d6d7da',
      flexDirection: 'row'
  },
  marginIcon: {
    marginRight: 10
  },
  TextStyle: {
    fontWeight: "bold"
  }
});

class Sidebar extends Component {
  constructor(props){
    super(props)
  }
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }

  componentDidUpdate(){
    console.log(this.props.navigation)   // -------> something other than undefined
  }
  render() {
    return (
          <Content style={{backgroundColor:'#FFFFFF'}}>
            <View>
              <ScrollView>
                <View>
                  <View style={styles.menuItem}  >
                    <Journer style={styles.marginIcon}/>
                    <Text style={styles.TextStyle} onPress={this.navigateToScreen('Journer')}>
                      Journée
                    </Text>
                  </View>
                  <View style={styles.menuItem}>
                    <Identiter  style={styles.marginIcon}/>
                    <Text onPress={this.navigateToScreen('Identiter')} style={styles.TextStyle}>
                      Identité
                    </Text>
                   
                  </View>
                  <View style={styles.menuItem}>
                    <HistoriqueMedicale  style={styles.marginIcon} />
                    <Text style={styles.TextStyle} onPress={this.navigateToScreen('HistoriqueMedicale')}>
                    Hitorique Médical
                    </Text>
                  </View>
                  <View style={styles.menuItem}>
                  <Aliments  style={styles.marginIcon} />
                    <Text style={styles.TextStyle} onPress={this.navigateToScreen('Aliments')}>
                    Aliments
                    </Text>
                  </View>
                  <View style={styles.menuItem}>
                    <Planning  style={styles.marginIcon} />
                    <Text style={styles.TextStyle} onPress={this.navigateToScreen('Planning')}>
                    Planning
                    </Text>
                  </View>
                  <View style={styles.menuItem}>
                    <HistoriqueEvent  style={styles.marginIcon}/>
                    <Text style={styles.TextStyle} onPress={this.navigateToScreen('HistoriqueEvent')}>
                    Historique Evénements
                    </Text>
                  </View>
                  <View style={styles.menuItem} >
                    <Message  style={styles.marginIcon} />
                    <Text style={styles.TextStyle} onPress={this.navigateToScreen('Message')}>
                    Message
                    </Text>
                  </View>
                  <View style={styles.menuItem}>
                  <Message  style={styles.marginIcon} />
                    <Text style={styles.TextStyle} onPress={this.navigateToScreen('Message')}>
                    Communauté
                    </Text>
                  </View>
                  <View style={styles.menuItem}>
                  <Message  style={styles.marginIcon} />
                    <Text style={styles.TextStyle} onPress={this.navigateToScreen('Message')}>
                    Créche
                    </Text >
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