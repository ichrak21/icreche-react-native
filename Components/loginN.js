import React, { Component } from 'react';
import { StyleSheet, ImageBackground,TouchableHighlight , Alert} from 'react-native';
import Logo from "../assets/images/image.svg";
import Id from "../assets/images/id.svg"
import Password from "../assets/images/password.svg"
import {YellowBox} from 'react-native';
import { Container, Content, Card, Text, Body , Item, Input} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    email: Yup.string()
      .label('Email')
      .email('Enter a valid email')
      .required('Please enter a registered email'),
    password: Yup.string()
      .label('Password')
      .required()
      .min(4, 'Password must have at least 4 characters ')
  })

const axios = require('axios');
const urlServer="https://www.kiuono.com/api/auth/";
const image = { uri: "https://www.kiuono.com/creche/static/media/bg-enfants-creche.04e539f1.jpg" };
export default class Login extends Component {
    
      constructor(props) {
        super(props);
        this.state = {
          isReady: false,
          username: '',
          password: '',
        }
      }
      async componentDidMount() {
        YellowBox.ignoreWarnings(['Warning: ...']);
        await Font.loadAsync({
          Roboto: require('native-base/Fonts/Roboto.ttf'),
          Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font,
        });
        this.setState({ isReady: true });
      }
      onClickListener = (viewId) => {
        this.props.navigation.navigate("")
      }
      async loginUser() {
        var params = {
          username: this.state.username.toLowerCase(),
          password: this.state.password,
          grant_type: 'password'
        };
      
        var formData = new FormData();
        
        for (var k in params) {
            formData.append(k, params[k]);
        }
        const options = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic bXktdHJ1c3RlZC1jbGllbnQ6bXlzZWNyZXQ='
          },
          data: formData,
        };
        const response = await  axios(urlServer+'oauth/token', options)
        const res = await response
        console.log(res.data)
        if (res.data.access_token){
        var req = {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+ res.data.access_token
            },
        }
        const response = await axios(urlServer+'me', req)
        const result = await response
        console.log(result.data)
        this.props.navigation.navigate("Home", {'user': result.data })
        }
        else Alert.alert('Please make sure that all inputs are corrects !')
          
      }


    render() {
       

        if (!this.state.isReady) {
            return <AppLoading />;
          }
      return (
        <Container>
           <ImageBackground source={image} style={styles.image}> 
           {/* <Header style={{ backgroundColor: 'rgba(0,76,197, 0.8)'}}/>            */}
              <Content  style={{ backgroundColor: 'rgba(0,76,197, 0.8)', paddingRight:30, paddingLeft:30, paddingTop: 60}}>
                <Body style={{paddingTop:60,paddingTop:40}}>
                    <Logo  />
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>Votre halte-garderie, au quotidien.</Text>
                </Body>
                <Card style={{padding:20, borderRadius:20}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 30 ,marginBottom: 25, alignSelf: "center"}}>Connexion</Text>
                    <Item rounded style={styles.inputContainer} >
                    <Id style={styles.inputIcon} />
                      <Input placeholder="Identifiant" ref="username" underlineColorAndroid='transparent' onChangeText={(username) => this.setState({username})} value={this.state.username} />
                    </Item>
                    <Item rounded style={styles.inputContainer}>
                      <Password style={styles.inputIcon}/>
                      <Input placeholder="Mot de passe" ref="password" secureTextEntry={true} underlineColorAndroid='transparent' onChangeText={(password) => this.setState({password})} value={this.state.password} />
                    </Item>      
                    <TouchableHighlight underlayColor='transparent' style={{flex:3, alignItems: 'flex-start' , justifyContent:"flex-start", flexDirection: 'column'}} onPress={() =>  this.onClickListener()}>
                        <Text style={{color: "#004cc5"}}>Mot de passe oublié ?</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() =>  this.loginUser()} underlayColor='transparent' style={{alignSelf: "center", marginTop:20,backgroundColor: 'transparent'}}>
                      <LinearGradient colors={[ '#ffc061','#ff4f68']}  style={[styles.buttonContainer]}>
                          <Text style={styles.buttonText}> Valider </Text>
                      </LinearGradient>
                    </TouchableHighlight>
                </Card> 
              </Content>
            {/* <Footer style={{ backgroundColor: 'rgba(0,76,197, 0.8)'}}/>    */}
            </ImageBackground>
        </Container>
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
  
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    inputs:{
      height:45,
      flex:1,
      backgroundColor: 'white'
    },
    formContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer: {
      alignSelf: "center",
      borderColor: '#ffffff',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderWidth: 1,
      width:300,
      height:40,
      marginBottom:10,
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
    inputs:{
      width:300,
      marginLeft:16,
      flex:1,
    },
    inputIcon:{
      marginLeft:15,
      justifyContent: 'center'
    },
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width:150,
      borderRadius:25,
      backgroundColor: 'transparent'
    },
    loginText: {
      color: 'white',
    },
  
    buttonText: {
      fontSize: 18,
      textAlign: 'center',
      color: '#ffffff',
    },
  
  });
   