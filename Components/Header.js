import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity} from 'react-native'
import { Container, Header, Title, Icon,Button, Left, Right, Body, Thumbnail } from "native-base";
import Logo from '../assets/images/logo-kiuono.svg'
import { Ionicons } from '@expo/vector-icons';


const uri = "https://www.kiuono.com/creche/static/media/enfant-avatar.9664acf5.jpg";
export default class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    // async componentDidMount () {
    //     await Expo.Font.loadAsync({
    //         Ionicons: require('@expo/vector-icons/website/src/fonts/Ionicons.ttf'),
    //     });
    // }
    goTolistEnfant(){
        const { navigation } = this.props;
        navigation.navigate("ListEnfant")
    }
    render() {
        return (
            <Header style={{ backgroundColor: 'transparent'}}>
                <Left>
                <Button transparent  onPress={()=>this.props.openDrawer()}>
                    <Ionicons name="md-menu" size={32} style={{ color: 'blue'}}/>
                </Button>
                </Left>
                <Body >
                    <View >
                    <Logo style={styles.headerStyle}/>
                    </View>
                    
                </Body>
                <Right>
                    <Button transparent>
                        <Thumbnail small source={{uri: uri}} /> 
                    </Button>
                </Right>
            </Header>
        )
    }
}
const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
})


