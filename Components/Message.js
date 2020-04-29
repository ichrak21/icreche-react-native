/*Example of Navigation Drawer with Sectioned Menu*/
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View } from 'react-native';
import { Drawer, Button, Text} from 'native-base';
import Header from './Header';
import Sidebar from './SideBar';
// import all basic components

export default class Message extends Component {
    constructor(props) {
        super(props)
    }
  //Screen2 Component
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
  };
  render() {
    return (
    <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<Sidebar navigation={this.props.navigation}/>}
        onClose={() => this.closeDrawer()} >

    <Header openDrawer={this.openDrawer.bind(this.props)}/>
      <View style={styles.MainContainer}>
      
        <Button onPress={()=> this.props.navigation.navigate('ListEnfant')}><Text>Back To list enfants</Text></Button>
      </View>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
  },
});