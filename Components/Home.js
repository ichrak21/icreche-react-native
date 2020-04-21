import React, { Component } from 'react';
import { StyleSheet, View,Text,TouchableHighlight} from 'react-native'



export default class Home extends Component {
    
    constructor(props) {
        super(props)
    }
    onClickListener = (viewId) => {
        this.props.navigation.navigate("Login")
      }
    
    render() {
        const { navigation } = this.props;
        const car = navigation.getParam('user');
        console.log("car Contriol car ****************")
        console.log(car)
        return (
            <View style={styles.container }>
               <Text>{car.compteType}</Text>
               <Text>{car.name}</Text>
               {/* <TouchableHighlight onPress={this.onClickListener()} underlayColor='transparent' style={{alignSelf: "center", marginTop:20,backgroundColor: 'transparent'}}>
                 <Text style={styles.buttonText}> Valider </Text>
              </TouchableHighlight> */}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})


