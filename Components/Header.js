import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity} from 'react-native'
import Logo from '../assets/images/logo-kiuono.svg'
import { Thumbnail} from 'native-base';


const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    goTolistEnfant(){
        const { navigation } = this.props;
        navigation.navigate("ListEnfant")
    }
    render() {
        return (
            <View style={styles.headerStyle }>  
                <View>
                    <TouchableOpacity onPress={() =>  this.goTolistEnfant()}>
                    <Logo style={ styles.titleStyle }/>
                    </TouchableOpacity>
                </View>  
                        
                {/* <Thumbnail small source={{uri: uri}} /> */}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingTop :10,
        alignItems: 'center',
        justifyContent: 'center'
    },
})


