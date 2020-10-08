import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardEvent,
  FlatList, ActivityIndicator, Image
} from 'react-native';
import firebase from '../../firebaseConnection'
import AsyncStorage from '@react-native-community/async-storage';
import homer from '../../images/homer.jpg'


const Login = ({navigation}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function Logar() {
    let user = 'false'

    await firebase.auth().signInWithEmailAndPassword(email, password)
      .then((value) => {
        user = 'true'
       
      })
      .catch((error) => {

        alert('Algo deu errado')
 
      })

    setEmail('')
    setPassword('')

    if (user === 'true') {
      await AsyncStorage.setItem('logado', user)
      navigation.navigate('Home')
    }

  }

  return (
    <View style={styles.container}>

    <View style={styles.img}>

    <Image 
      resizeMode='contain'
      source={homer}
      style={{width:'50%',height:'50%' }}
      />

    </View>

      <Text style={styles.texto}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(e) => setEmail(e)}
        underlineColorAndroid='transparent'
      />
      <Text style={styles.texto}>Senha</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(e) => setPassword(e)}
        underlineColorAndroid='transparent'
      />

      <TouchableOpacity onPress={() => Logar()} activeOpacity={0.5} style={styles.btn}>
        <Text style={styles.textBtn}> Logar </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('CadastroUsuario')} activeOpacity={0.5} style={styles.btn}>
        <Text style={styles.textBtn}> Novo Acesso </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'#fff',
    padding:10
  },
  texto: {
    fontSize: 20,
    alignItems: 'flex-start'
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,    
    borderWidth: 1,
    borderColor: '#000',
    height: 40,
    borderRadius: 5,

  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    height: 58,
    borderRadius: 5,
    marginTop: 15
  },
  textBtn: {
    fontWeight: 'bold',
    color: '#fff'
  },
  lista: {
    marginTop: 25
  },
  img:{
    justifyContent:'center',
    alignItems:'center'
  }
})

export default Login;