import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity} from 'react-native'
import { Container, Header, Title, Button, Icon, Left, Right, Body, Thumbnail } from "native-base";
import Logo from '../assets/images/logo-kiuono.svg'


const uri = "https://www.kiuono.com/creche/static/media/enfant-avatar.9664acf5.jpg";
export default class Menu extends Component {
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
            <Header style={{ backgroundColor: 'transparent'}}>
                <Left>
                <Button transparent  onPress={()=>this.props.openDrawer()}>
                    <Icon name="menu"  style={{ color: 'blue'}}/>
                    
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


