import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage, TouchableOpacity, ScrollView} from 'react-native'
import { H1, Item, Input, Container, Button, Thumbnail, Right} from 'native-base';
import idStorage from './idStorage';
import DeleteLine from "../assets/images/icon-delete-line.svg"
import AddLine from "../assets/images/icon-add-line.svg"
import Jours from "../assets/images/icon-jours.svg"
import Nom from "../assets/images/icon-nom.svg"
import Tel from "../assets/images/icon-telephone.svg"
import Naissance from "../assets/images/icon-naissance.svg"
import { LinearGradient } from 'expo-linear-gradient';
import _ from 'lodash';
import { toUpperCaseFirst } from "./ReactConst";
import Header from './Header'

const axios = require('axios');
const urlServer="https://www.kiuono.com/api/";
export default class Identiter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            token: null,
            numJour: 0,
            horaire: '',
            newTierce: {},
            PrenomNomTierce: null,
            numeroTel: null,
            tierces: [],
            
        };
        this.showAddTierce = this.showAddTierce.bind(this);
        this.deleteTierce = this.deleteTierce.bind(this)
    }
    
    
    async componentDidMount() {
        let id = await idStorage.retrieveItem("IdEnfant")
        let token = await idStorage.retrieveItem("token")
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
        let newTierces = []
        if (result.data.tierceAutorises) {
        newTierces = Array.from(result.data.tierceAutorises, (tierce => Object.assign({}, tierce, { "PrenomNomTierce": toUpperCaseFirst(tierce.nom) + " " + toUpperCaseFirst(tierce.prenom) })))
        }
        this.setState({
            tierces: newTierces
        })
    }
    async returnToParents(){
        let c = await AsyncStorage.getItem('IdEnfant')
        let enfant = await AsyncStorage.getItem('enf')
        this.props.navigation.navigate("ListEnfant", {'id': c, 'enfant': JSON.parse(enfant), 'user':JSON.parse(enfant) } )
    }
    async showAddTierce() {
        if (!_.isEmpty(this.state.PrenomNomTierce) && (!_.isEmpty(this.state.numeroTel))&& (!this.state.numeroTel.match(/^\+(?:[0-9] ?){4,14}[0-9]$/))) {
            let nomParent = this.state.PrenomNomTierce.split(" ")
      
            let newTierce = {
                "id": "",
                "nom": nomParent[0],
                "prenom" : nomParent[1],
                "numeroTel" : this.state.numeroTel,
                "lienDeParente": "ami"
            }
            this.setState(prevState => ({
                tierces: [...prevState.tierces, newTierce]
              }))
              let newlist=[]
            for(let i = 0; i < this.state.tierces.length; i++){
                newlist.push({
                    "id": this.state.tierces[i].id,
                    "nom": this.state.tierces[i].nom,
                    "prenom" : this.state.tierces[i].prenom,
                    "numeroTel" : this.state.tierces[i].numeroTel,
                    "lienDeParente": "ami"
                })
            }
            this.handleSubmitInfoTierce(newlist)
          }
          
          
      }
      deleteTierce = (event, id) => {
        let newArray = [];
        newArray = this.state.tierces.filter(element => element.id !== id);
        this.setState((prevState) => ({
          tierces: [...newArray]
        }));
        let newlist=[]
            for(let i = 0; i < this.state.tierces.length; i++){
                newlist.push({
                    "id": this.state.tierces[i].id,
                    "nom": this.state.tierces[i].nom,
                    "prenom" : this.state.tierces[i].prenom,
                    "numeroTel" : this.state.tierces[i].numeroTel,
                    "lienDeParente": "ami"
                })
            }
        this.handleSubmitInfoTierce(newlist)
      }
      
      onChangeAddTierceNom = (event) => {
        event.persist();
        this.setState((prevState) => ({
          newTierce: { ...prevState.newTierce, ['PrenomNomTierce']: event.nativeEvent.text }
        }));
      }
      onChangeAddTierceTel = (event) => {
        event.persist();
        this.setState((prevState) => ({
          newTierce: { ...prevState.newTierce, ['numeroTel']: event.nativeEvent.text}
        }));
      }
      async handleSubmitInfoTierce(newlist) {
    
        let data = {
          "tiercesAutorises": newlist
        }
        let id = await idStorage.retrieveItem("IdEnfant")
        let token = await idStorage.retrieveItem("token")
        console.log(token)
        console.log(id)
        console.log("dataa............",data)
              var req = {
                method: 'PUT',
                headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer '+ token
                },
                data: data
            }
            console.log('reeeq', req)
            const response = await axios(urlServer+'enfant/creche/enfants/'+ id +'/tierces-autorises', req)
            const result = await response
            console.log(result)
      }
    
    render() {
        const uri = "https://www.kiuono.com/creche/static/media/enfant-avatar.9664acf5.jpg";
        let listeTiers =[]
        
        if (this.state.user){
            for(let i = 0; i < this.state.user.tierceAutorises.length; i++){
                listeTiers.push(
                    <View style={styles.buttons_container}> 
                        <Item rounded style={[styles.inputContainer, {width: '43%'}]} >
                            <Nom style={styles.inputIcon}/>
                            <Input placeholder='Rounded Textbox' value={toUpperCaseFirst(this.state.user.tierceAutorises[i].nom)+' '+ toUpperCaseFirst(this.state.user.tierceAutorises[i].prenom)} style={styles.input}/>
                        </Item>
                        <Item rounded style={[styles.inputContainer, {width: '43%'}]} >
                            <Tel style={styles.inputIcon}/>
                            <Input placeholder='Rounded Textbox' value={this.state.user.tierceAutorises[i].numeroTel} style={styles.input}/>
                        </Item>
                        <TouchableOpacity 
                            onPress={e => this.deleteTierce(e, this.state.user.tierceAutorises[i].id)} style={ styles.button } >
                                <LinearGradient colors={[ '#ff5b67','#ff5b67']} style={ styles.btnDelete}  >
                                    <DeleteLine/>
                                </LinearGradient>
                        </TouchableOpacity>
                       
                    </View>
                )
            } 
            this.state.horaire = ""
            this.state.numJour = Array.from(_.values(this.state.user.horairesDetails.horaires)).reduce((accu, element) => {
                if (element.ouvert) { this.state.horaire = (element.horaireDebut && element.horaireDebut.charAt(0) === '0' ? element.horaireDebut.slice(1, 2) : element.horaireDebut.slice(0, 2)) + "h-" + element.horaireFin.slice(0, 2) + "h" }
                return element.ouvert ? accu + 1 : accu;
              }, 0)   
             
        }else{
            listeTiers.push(<View></View>)
        }
        return (
            <Container>
                <Header/>
                <ScrollView>
            <View style={styles.container}>
            {this.state.user ?
            <View style={{alignSelf: "center"}}>
                <View style={{alignItems: 'center'}}>
                    <Thumbnail large source={{uri: uri}} />
                    <H1 style={{alignItems: 'center',fontWeight: 'bold'}}>Informations sur l'enfant</H1>
                    <View style={styles.buttons_container}> 
                        <Item rounded style={[styles.inputContainer,{width: '46%'}]} >
                            <Nom style={styles.inputIcon}/>
                            <Input placeholder='Rounded Textbox' value={this.state.user.prenom+ ' '+ this.state.user.nom} style={styles.input} />
                        </Item>
                        <Item rounded style={[styles.inputContainer,{width: '46%'}]} >
                            <Naissance style={styles.inputIcon}/>
                            <Input placeholder='Rounded Textbox' value={this.state.user.dateAcceptation} style={styles.input}/>
                        </Item>
                    </View>
                    <View style={styles.buttons_container}> 
                        <Item rounded style={[styles.inputContainer, {width: '46%'}]} >
                            <Naissance style={styles.inputIcon}/>
                            <Input placeholder='Rounded Textbox' value={this.state.user.dateNaissance} style={styles.input} />
                        </Item>
                        <Item rounded style={[styles.inputContainer, {width: '31%'}]}>
                            <Jours style={styles.inputIcon}/>
                            <Input placeholder='Rounded Textbox' value={(this.state.numJour).toString()+ " " + "Jours"} style={styles.input} />
                        </Item>
                        <Item rounded style={[styles.inputContainer, {width: '13%'}]}>
                            <Input placeholder='Rounded Textbox' value={this.state.horaire} style={styles.input} />
                        </Item>
                    </View>
                </View>
            <View style={{ borderBottomColor: '#e9e9e9', borderWidth: 0.5, width: 400, alignSelf: "center" }}
                />

            <View style={{alignItems: 'center'}}>
                <H1 style={{alignItems: 'center',fontWeight: 'bold', margin: 10}}>Tiers autorisés par les parents</H1>
                <View>
                    {listeTiers}
                    <View style={styles.buttons_container}> 
                        <Item rounded style={[styles.inputContainer, {width: '43%'}]} >
                            <Nom style={styles.inputIcon} /> 
                            <Input placeholder='Prénom NOM' style={styles.input} onChangeText={(PrenomNomTierce) => this.setState({PrenomNomTierce})}  value={this.state.PrenomNomTierce}/>
                        </Item>
                        <Item rounded style={[styles.inputContainer, {width: '43%'}]} >
                            <Tel style={styles.inputIcon}/>
                            <Input placeholder='XX XX XX XX XX' style={styles.input} onChangeText={(numeroTel) => this.setState({numeroTel})} value={this.state.numeroTel}/>
                        </Item>
                        <TouchableOpacity 
                            onPress={ () => { this.showAddTierce() }} style={ styles.button }>
                            <LinearGradient colors={[ '#00c5a7','#00c5a7']}  style={ styles.btn } >
                                <AddLine/>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </View>
             : <View/>}
            </View>  
            </ScrollView>       
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
        marginTop: 10,
    },
    inputIcon:{
        marginLeft:15,
        justifyContent: 'center'
      },
      inputContainer: {
        margin: 10,
        alignSelf: "center",
        borderColor: '#ffffff',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderWidth: 1,
        height:40,
        flexDirection: 'row',
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        },
        input: {
            fontSize: 12,
        },
        button:{
            backgroundColor:'red',
            alignItems:'center',
            justifyContent:'center',
            overflow:'hidden',
            borderRadius:20,
            position:'absolute',
            top:12,
            right: 0,
            left: '92%'
        },
        
})


