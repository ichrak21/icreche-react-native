import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage} from 'react-native'
import { Card, Text, CardItem, H1, Item, Input, Container, Button} from 'native-base';
import idStorage from './idStorage';
const axios = require('axios');
const urlServer="https://www.kiuono.com/api/";

export default class Identiter extends Component {
    constructor(props) {
        super(props)
        
    }
    state = {
        user: null,
        token: null
    };
    async componentDidMount() {
        let id = await idStorage.retrieveItem("IdEnfant")
        let token = await idStorage.retrieveItem("token")
        // console.log('Tokeeeen...........;',token)
        // console.log('idddddd', id)
        var req = {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+ token
            },
        }
        const response = await axios(urlServer+'enfant/creche/enfants/'+ id, req)
        const result = await response
        this.setState({
            user: result.data
        })
        // console.log(result.data)
    }
    async returnToParents(){
        let c = await AsyncStorage.getItem('IdEnfant')
        let enfant = await AsyncStorage.getItem('enf')
        console.log('enfaaant',enfant)
        this.props.navigation.navigate("ListEnfant", {'id': c, 'enfant': JSON.parse(enfant), 'user':JSON.parse(enfant) } )
    }
    
    
    render() {
        const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
        console.log("...................",this.state.user) 
        let listeTiers =[]
        if (this.state.user){
            for(let i = 0; i < this.state.user.tierceAutorises.length; i++){
                listeTiers.push(
                    <View style={styles.buttons_container}> 
                    
                        <Item rounded style={{width: '40%'}}>
                            <Input placeholder='Rounded Textbox' value={this.state.user.tierceAutorises[i].nom+' '+ this.state.user.tierceAutorises[i].prenom} />
                        </Item>
                        <Item rounded style={{width: '40%'}}>
                            <Input placeholder='Rounded Textbox' value={this.state.user.tierceAutorises[i].numeroTel} />
                        </Item>
                        <Button rounded>
                            <Text>-</Text>
                        </Button>
                       
                    </View>
                )
            }      
        }else{
            listeTiers.push(<View></View>)
        }
        
        return (
            <Container>
            <View style={styles.container}>
            {this.state.user ?
            <View>
                <H1>Informations sur l'enfant</H1>
            <View style={styles.buttons_container}> 
                <Item rounded style={{width: '50%'}}>
                    <Input placeholder='Rounded Textbox' value={this.state.user.prenom} />
                </Item>
                <Item rounded style={{width: '50%'}}>
                    <Input placeholder='Rounded Textbox' value={this.state.user.nom} />
                </Item>
            </View>
            <View style={styles.buttons_container}> 
                <Item rounded style={{width: '50%'}}>
                    <Input placeholder='Rounded Textbox' value={this.state.user.dateNaissance} />
                </Item>
                {/* <Item rounded style={{width: '20%'}}>
                    <Input placeholder='Rounded Textbox' value={this.state.user.dateNaissance} />
                </Item>
                <Item rounded style={{width: '30%'}}>
                    <Input placeholder='Rounded Textbox' value={this.state.user.nom} />
                </Item> */}
            </View>
            <H1>Tiers autorisés par les parents</H1>
            <View>
                {listeTiers}
                <View style={styles.buttons_container}> 
                    
                    <Item rounded style={{width: '40%'}}>
                        <Input placeholder='Prénom NOM'  />
                    </Item>
                    <Item rounded style={{width: '40%'}}>
                        <Input placeholder='XX XX XX XX XX' />
                    </Item>
                    <Button rounded>
                        <Text>+</Text>
                    </Button>
                       
                    </View>
            </View>
            </View>
             : <View/>}
            </View>         
        </Container>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
       
    },
    buttons_container: {
        flexDirection: 'row',
        marginTop: 30,
    },
})


