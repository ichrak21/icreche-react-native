import React from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import { Button,Text } from 'react-native-elements'
import FormInput from './FormInput'
import FormButton from './FormButton'
import { Formik } from 'formik'
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
export default class Login extends React.Component {
    goToSignup = () => this.props.navigation.navigate('Signup')
    render() {
      return (
        <SafeAreaView style={styles.container}>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={values => {this.handleSubmit(values)}}
            validationSchema={validationSchema}
          >
            {({ handleChange, values, handleSubmit, errors }) => (
    <View>
      <FormInput
  name='email'
  value={values.email}
  onChangeText={handleChange('email')}
  placeholder='Enter email'
  autoCapitalize='none'
  iconName='ios-mail'
  iconColor='#2C384A'
/>
<Text style={{ color: 'red' }}>{errors.email}</Text>
<FormInput
  name='password'
  value={values.password}
  onChangeText={handleChange('password')}
  placeholder='Enter password'
  secureTextEntry
  iconName='ios-lock'
  iconColor='#2C384A'
  />
<Text style={{ color: 'red' }}>{errors.password}</Text>
      <View style={styles.buttonContainer}>
        <FormButton
          buttonType='outline'
          onPress={handleSubmit}
          title='LOGIN'
          buttonColor='#039BE5'
        />
      </View>
    </View>
  )
}
          </Formik>
          <Button
            title="Don't have an account? Sign Up"
            onPress={this.goToSignup}
            titleStyle={{
              color: '#F57C00'
            }}
            type="clear"
          />
        </SafeAreaView>
      )
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  buttonContainer: {
    margin: 25
  }
})