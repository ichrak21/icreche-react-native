import React, { Component } from 'react';
import { StyleSheet, View, Image,ScrollView, TouchableOpacity, ImageBackground, AsyncStorage, Alert} from 'react-native'
import { Card, CardItem, Thumbnail, Text, Button,  Left, Body, Right, Container, Header} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import SrcBiberon from '../assets/images/etat-biberon-grey.svg';
import SrcRepas from '../assets/images//etat-repas-grey.svg';
import SrcSieste from '../assets/images/etat-sieste-grey.svg';
import SrcSante from '../assets/images/etat-sante-grey.svg';
import SrcAlert from '../assets/images/etat-alert-grey.svg';
import SrcMedicament from '../assets/images/etat-medicament-grey.svg';
import Attendu from '../assets/images/attendu.svg';
import Add from '../assets/images/add-white.svg';
import Logo from '../assets/images/logo-kiuono.svg';
import idStorage from './idStorage';

const axios = require('axios');
const urlServer="https://www.kiuono.com/api/";
function jsUpperCaseFirst(string) {
    return string.charAt(0).toUpperCase();
}

export default class ListEnfant extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null
        }
    }
    async componentDidMount() {
        let token = await idStorage.retrieveItem("token")
        var req = {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+ token
            },
        }
        const response = await axios(urlServer+'enfant/creche/enfants', req)
        const result = await response
        console.log(result)
       

      }
    async Enfant(id){
        await idStorage.saveItem('IdEnfant', id.toString());
        const { navigation } = this.props;
        let c = navigation.getParam('user');
        await AsyncStorage.setItem('enf', JSON.stringify(c));
        this.props.navigation.navigate("Identiter" )       
    }
    render() {
        const uri = "https://www.kiuono.com/creche/static/media/enfant-avatar.9664acf5.jpg";
        const { navigation } = this.props;
        let enfant
        const id = navigation.getParam('id')
        if(id== undefined){
            enfant = navigation.getParam('user');
        }else{
            enfant = navigation.getParam('enfant');
        }
        var listeEnfant = [];

	for(let i = 0; i < enfant.length; i++){
		listeEnfant.push(
                <TouchableOpacity style={styles.buttons_container}  onPress={() =>  this.Enfant(enfant[i].id )}>
                <Card style={styles.cardNotActive}>
                        <CardItem cardBody style={{height: 100,borderRadius:15 }}>
                            <ImageBackground source={{uri: 'https://www.kiuono.com/creche/static/media/enfant-avatar.9664acf5.jpg'}} imageStyle={{  borderTopRightRadius:15, borderTopLeftRadius:15 }} style={{ height: "100%",flex:1}}>
                                <TouchableOpacity 
                                    onPress={ () => { alert("handler here") }}>
                                        <LinearGradient colors={[ '#ffc061','#ff4f68']}  style={ styles.button } >
                                        <Add/>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </ImageBackground>
                            
                        </CardItem>
                        <CardItem style={{borderRadius:20, padding:20}}>
                            <Body style={{alignItems: 'center'}}>
                                <View style={styles.icons}>
                                    <View style={{paddingRight:5}}>
                                        <Attendu/>
                                    </View>
                                    <View >
                                        <Text style={{borderRadius:20}}>{enfant[i].prenom  + " " + jsUpperCaseFirst(enfant[i].nom) + "."}</Text>
                                        <Text style={{borderRadius:20}}>{enfant[i].agenda.statutDetails.statut}</Text>
                                    </View>
                                </View>
                                <View style={styles.icons}>
                                    <SrcBiberon style={styles.blockIcons}/>
                                    <SrcRepas style={styles.blockIcons}/>
                                    <SrcSieste style={styles.blockIcons}/>
                                    <SrcSante style={styles.blockIcons}/>
                                    <SrcAlert style={styles.blockIcons}/>
                                    <SrcMedicament style={styles.blockIcons}/>
                                </View>
                            </Body>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
		)
	}     
        return (
             
            <Container>
               <Header style={{ backgroundColor: 'transparent'}}>
                <Body style={{ justifyContent :'center'}}>
                    <View >
                    <Logo/>
                    </View>
                </Body>
                <Right>
                    <Button transparent>
                        <Thumbnail small source={{uri: uri}} /> 
                    </Button>
                </Right>
            </Header>
           
            <View style={styles.container}>
            
                 <ScrollView>
                 { listeEnfant }
                 </ScrollView>
              
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
      },
      icons: {
        paddingTop: 10,
        flexDirection: 'row',
      },
      blockIcons :{
        margin: 3
      },
      button:{
        width:30,
        height:30,
        backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center',
        overflow:'hidden',
        borderRadius:20,
        position:'absolute',
        right:10,
        top:10
      },
      cardActive :{
        width: 250, 
        borderRadius:15,
        borderColor: "red", 
        borderRightWidth: 1, 
        borderLeftWidth:1,
         borderTopWidth:1,
         borderBottomWidth: 1
      },
      cardNotActive :{
        width: 250, 
        borderRadius:15
      },
    backBtnStyle: {
        width: 25,
        left: 10
    },
   
})


