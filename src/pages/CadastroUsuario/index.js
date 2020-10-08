import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardEvent,
  FlatList, ActivityIndicator
} from 'react-native';

import firebase from '../../firebaseConnection'
// import { Container } from './styles';

const CadastraUsuario = () => {

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')

  async function CadastraUsuario() {

    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((value) => {
        firebase.database().ref('Usuarios').child(value.user.uid).set({
          nome,
          email
        })
      })
      .catch((error) => {
        if (error.code === 'auth/weak-password') {
          alert('Sua senha deve conter pelo menos 6 caracteres !')
          return

        }
        if (error.code === 'auth/invalid-email') {
          alert('Email inválido !')
          return

        } else {
          alert('Algo deu errado')
        }
      })

    setEmail('')
    setPassword('')
    setNome('')
  }


  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Nome</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={(e) => setNome(e)}
        underlineColorAndroid='transparent'
      />
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

      <TouchableOpacity onPress={() => CadastraUsuario()} activeOpacity={0.5} style={styles.btn}>
        <Text style={styles.textBtn}> Cadastrar </Text>
      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    marginTop: 50,
    justifyContent: 'center',

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
  }
})

export default CadastraUsuario;