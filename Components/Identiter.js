import React, { Component ,useState, useEffect } from 'react';
import { StyleSheet, View, AsyncStorage, TouchableOpacity, ScrollView, Platform, Text} from 'react-native';
import { H1, Item, Input, Container, Thumbnail, Drawer, Button} from 'native-base';
import idStorage from './idStorage';
import DeleteLine from "../assets/images/icon-delete-line.svg";
import AddLine from "../assets/images/icon-add-line.svg";
import Jours from "../assets/images/icon-jours.svg";
import Nom from "../assets/images/icon-nom.svg";
import Tel from "../assets/images/icon-telephone.svg";
import Naissance from "../assets/images/icon-naissance.svg";
import { LinearGradient } from 'expo-linear-gradient';
import _ from 'lodash';
import { toUpperCaseFirst } from "./ReactConst";
import Header from './Header';
import Sidebar from './SideBar';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import IconPhoto from '../assets/images/icon-photo.svg';
import { URL } from 'react-native-dotenv';
import { Camera } from 'expo-camera';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';

const axios = require('axios');


export default class Identiter extends Component {
    closeDrawer = () => {
        this.drawer._root.close()
      };
      openDrawer = () => {
        this.drawer._root.open()
      };
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
            image: null,
            hasPermission: null,
            type: Camera.Constants.Type.back,
            
        };
        this._pickImage = this._pickImage.bind(this)
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
        const response = await axios(URL+'enfant/parent/enfants/'+ id, req)
        const result = await response
        console.log(id)
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
        this.getPermissionAsync();
    }
    handleCameraType=()=>{
        const { cameraType } = this.state
    
        this.setState({cameraType:
          cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
        })
      }
    async getPermissionAsync () {
        if (Platform.OS === 'ios') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
      };
     async openCamera(){
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermission: status === 'granted' });    
      }
      async closeCamera(){
        this.setState({ hasPermission: null });    
      }
      async _pickImage() {
       
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          this.closeCamera()
          if (result.cancelled) {return ;}
           this.uploadImage(result)
            
            // this.setState({ image: result.uri });
          
      };
      async uploadImage(result){
        let localUri = result.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        // Upload the image using the fetch and FormData APIs
        let data = new FormData();
        // Assume "file" is the name of the form field the server expects
        data.append('file', { uri: localUri, name: filename, type });
        let token = await idStorage.retrieveItem("token")
        try {            
        const response = await axios.post(URL+'creche/files?category=PHOTO',data,{
            headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer '+ token
            }
        })
        const result = await response
        console.log('reeeeeeees', result.data)
        // this.updateEnfant(result.data)
        }catch (error) {
            console.log("error upload image",error)
        }
      }
    async updateEnfant(res){
        console.log("useeer", this.state.user)
        let id = await idStorage.retrieveItem("IdEnfant")
        let token = await idStorage.retrieveItem("token")
        var req = {
            method: 'PUT',
            headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+ token
            },
            data: {
                "biberonActif": this.state.user.biberon.actif,
                "biberonFrequence": this.state.user.biberon.frequence,
                "dateAcceptation": this.state.user.dateAcceptation,
                "dateNaissance": this.state.user.dateNaissance,
                "idPhoto": res.files[0].fileId,
                "nom": this.state.user.nom,
                "poid": this.state.user.poid,
                "prenom": this.state.user.prenom,
                "sexe":this.state.user.sexe,
                "taille": this.state.user.taille
            }
        }
        console.log(req)
        const response = await axios(URL+'enfant/creche/enfants/'+ id, req)
        const result = await response
        console.log(result)

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
            
            this.setState({
                tierces: this.state.tierces.push(newTierce)
            }) //[...prevState.tierces, newTierce]
            
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
        
        //   tierces: [...newArray]
        this.state.tierces= newArray
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
              var req = {
                method: 'PUT',
                headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer '+ token
                },
                data: data
            }
            const response = await axios(URL+'enfant/parent/enfants/'+ id +'/tierces-autorises', req)
            const result = await response
            this.componentDidMount()
            this.state.PrenomNomTierce = null
            this.state.numeroTel = null
      }
      takePicture = async () => {
        if (this.camera) {
          let photo = await this.camera.takePictureAsync();
          this.uploadImage(photo)
          this.closeCamera()
        }
      }
      
    
    render() {
        const uri = "https://www.kiuono.com/creche/static/media/enfant-avatar.9664acf5.jpg";
        let listeTiers =[]
        let { image } = this.state;
        let imageProfile =[]
        if (this.state.user){
            imageProfile.push(
            <View>
                <View style={{justifyContent: "center"}}>
                    {image ?<Thumbnail large source={{uri: image}} />: <Thumbnail large source={{uri: uri}} />}
                    <Button rounded style={{ justifyContent: 'center' , backgroundColor: '#ffc061' , marginLeft: 25,width: 40}} onPress={()=>this.openCamera()}> 
                        <IconPhoto />
                    </Button> 
                </View>
                
            </View>)
            if(this.state.user.tierceAutorises){
            for(let i = 0; i < this.state.user.tierceAutorises.length; i++){
                listeTiers.push(
                    <View style={styles.buttons_container } key = {i}> 
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
            } }
            this.state.horaire = ""
            this.state.numJour = Array.from(_.values(this.state.user.horairesDetails.horaires)).reduce((accu, element) => {
                if (element.ouvert) { this.state.horaire = (element.horaireDebut && element.horaireDebut.charAt(0) === '0' ? element.horaireDebut.slice(1, 2) : element.horaireDebut.slice(0, 2)) + "h-" + element.horaireFin.slice(0, 2) + "h" }
                return element.ouvert ? accu + 1 : accu;
              }, 0)   
             
        }else{
            listeTiers.push(<View></View>)
        }
       
        const { hasPermission } = this.state
        if (hasPermission === null) {
            return (
                <Container>
                     <Drawer
                        ref={(ref) => { this.drawer = ref; }}
                        content={<Sidebar navigation={this.props.navigation}/>}
                        onClose={() => this.closeDrawer()} >
    
                    <Header openDrawer={this.openDrawer.bind(this.props)}/>
                    <ScrollView>
                <View style={styles.container}>
                {this.state.user ?
                <View style={{alignSelf: "center"}}>
                    <View style={{alignItems: 'center'}}>
                        {imageProfile}
                        <H1 style={{alignItems: 'center',fontWeight: 'bold'}}>Informations sur l'enfant</H1>
                        <View style={styles.buttons_container}> 
                            <Item rounded style={[styles.inputContainer,{width: '46%'}]} >
                                <Nom style={styles.inputIcon}/>
                                <Input disabled placeholder='Rounded Textbox' value={this.state.user.prenom+ ' '+ this.state.user.nom} style={styles.input} />
                            </Item>
                            <Item rounded style={[styles.inputContainer,{width: '46%'}]} >
                                <Naissance style={styles.inputIcon}/>
                                <Input disabled placeholder='Rounded Textbox' value={this.state.user.dateAcceptation} style={styles.input}/>
                            </Item>
                        </View>
                        <View style={styles.buttons_container}> 
                            <Item rounded style={[styles.inputContainer, {width: '46%'}]} >
                                <Naissance style={styles.inputIcon}/>
                                <Input disabled placeholder='Rounded Textbox' value={this.state.user.dateNaissance} style={styles.input} />
                            </Item>
                            <Item rounded style={[styles.inputContainer, {width: '31%'}]}>
                                <Jours style={styles.inputIcon}/>
                                <Input disabled placeholder='Rounded Textbox' value={(this.state.numJour).toString()+ " " + "Jours"} style={styles.input} />
                            </Item>
                            <Item rounded style={[styles.inputContainer, {width: '13%'}]}>
                                <Input disabled placeholder='Rounded Textbox' value={this.state.horaire} style={styles.input} />
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
                </Drawer>       
            </Container>
            )
        } else if (hasPermission === false) {
          return <Text>No access to camera</Text>;
        } else {
          return (
              <View style={{ flex: 1 }}>
                <Camera style={{ flex: 1 }} type={this.state.cameraType} ref={ref => {this.camera = ref;}}>
                <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:20}}>
                    <TouchableOpacity
                        style={{
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: 'transparent',                  
                        }}
                        onPress={()=>this._pickImage()}>
                        <Ionicons
                            name="ios-photos"
                            style={{ color: "#fff", fontSize: 40}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        }}
                        onPress={()=>this.takePicture()}>
                        <FontAwesome
                            name="camera"
                            style={{ color: "#fff", fontSize: 40}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        }}
                        onPress={()=>this.handleCameraType()}>
                        <MaterialCommunityIcons
                            name="camera-switch"
                            style={{ color: "#fff", fontSize: 40}}
                        />
                    </TouchableOpacity>
                    </View>
                </Camera>
            </View>
          );
        }
        
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


