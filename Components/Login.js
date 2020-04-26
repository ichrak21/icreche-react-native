import React, { Component } from 'react';
import { StyleSheet, ImageBackground,TouchableHighlight , Alert, AsyncStorage} from 'react-native';
import Logo from "../assets/images/image.svg";
import Id from "../assets/images/id.svg"
import Password from "../assets/images/password.svg"
import {YellowBox} from 'react-native';
import { Container, Content, Card, Text, Body , Item, Input, View} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as Yup from 'yup'
import { Formik } from 'formik';

const validationSchema = Yup.object().shape({
    username: Yup.string()
      .label('Username')
      .required("le nom d'utilisateur est obligatoire"),
    password: Yup.string()
      .label('Password')
      .required('le mot de passe est obligatoire')
  })

const axios = require('axios');
const urlServer="https://www.kiuono.com/api/";
const image = { uri: "https://www.kiuono.com/creche/static/media/bg-enfants-creche.04e539f1.jpg" };

export default class Login extends Component {
       constructor(props) {
        super(props);
        this.state = {
          isReady: false,
          username: '',
          password: '',
          errorLogin: null
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
       
          // const data = await SyncStorage.init();
          // console.log('AsyncStorage is ready!', data);

      }
      onClickListener = (viewId) => {
        this.props.navigation.navigate("ListEnfant")
      }
      async loginUser(values) {
        var params = {
          username: values.username.toLowerCase(),
          password: values.password,
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
        try {
            const response = await axios(urlServer+'auth/oauth/token', options)
            const res = await response
            console.log(res)
            if (res.data.access_token){
                var req = {
                    method: 'GET',
                    headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer '+ res.data.access_token
                    },
                }
                const response = await axios(urlServer+'enfant/creche/enfants', req)
                const result = await response
                await AsyncStorage.setItem('token', res.data.access_token)
                if(result.data.enfants.length >1){
                  this.props.navigation.navigate("ListEnfant", {'user': result.data.enfants })
                }else{
                  this.props.navigation.navigate("Identiter", {'user': result.data.enfants })
                }
                
                }
          } catch (error) {
            if(error.response.status == 400){
                const error = ({
                    payload: "Login ou mot de passe incorrect"
                  });
                return  this.setState({ errorLogin: error });
               
            }
          }
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
                    <Formik
                        initialValues={{ username: '', password: '' }}
                        onSubmit={values => {this.loginUser(values)}}
                        validationSchema={validationSchema}
                    >
                        {({ handleChange, values, handleSubmit, errors}) => (
                        <View>
                            <Item rounded style={styles.inputContainer} >
                                <Id style={styles.inputIcon} />
                                <Input placeholder="Identifiant" underlineColorAndroid='transparent' onChangeText={handleChange('username')} value={values.username} />
                            </Item>
                            <Text style={{ color: 'red' }}>{errors.username}</Text>
                            <Item rounded style={styles.inputContainer}>
                                <Password style={styles.inputIcon}/>
                                <Input placeholder="Mot de passe" secureTextEntry={true} underlineColorAndroid='transparent' onChangeText={handleChange('password')} value={values.password} />
                            </Item> 
                            <Text style={{ color: 'red' }}>{errors.password}</Text>
                            {this.state.errorLogin && !errors.password && !errors.username ? (<Text style={{color: "red"}}>{this.state.errorLogin.payload}</Text> ) : null}
                            <View>
                                <TouchableHighlight underlayColor='transparent' style={{flex:3, alignItems: 'flex-start' , justifyContent:"flex-start", flexDirection: 'column'}} onPress={() =>  this.onClickListener()}>
                                    <Text style={{color: "#004cc5"}}>Mot de passe oublié ?</Text>
                                </TouchableHighlight>
                                <TouchableHighlight onPress={handleSubmit} underlayColor='transparent' style={{alignSelf: "center", marginTop:20,backgroundColor: 'transparent'}}>
                                <LinearGradient colors={[ '#ffc061','#ff4f68']}  style={[styles.buttonContainer]}>
                                    <Text style={styles.buttonText}> Valider </Text>
                                </LinearGradient>
                                </TouchableHighlight>
                            </View>
                        </View>
                        )
                        }
            </Formik>
                   
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
   
