import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardEvent,
  FlatList, ActivityIndicator
} from 'react-native';
import firebase from './src/firebaseConnection'
import Listagem from './src/components/ListaUsuario'

// import { Container } from './styles';

const App = () => {

  const [nome, setNome] = useState('')
  const [cargo, setCargo] = useState('')
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {


    async function Dados() {

      await firebase.database().ref('Usuarios').on('value', (snap) => {
        setUsuarios([])
        snap.forEach((item) => {
          let data = {
            key: item.key,
            nome: item.val().nome,
            cargo: item.val().cargo
          }
          setUsuarios(old => [...old, data].reverse())
        })
        setLoading(false)
      })

    }




    /*     async function Dados() {                    //sempre atualiza 
          await firebase.database().ref('usuarios/1').on('value', (snapshot) => {
            setNome(snapshot.val().nome)
            setIdade(snapshot.val().idade)
          })
        } */

    /*     async function Dados() {            //apenas uma vez
          await firebase.database().ref('nome').once('value', (e) => {
            setNome(e.val())
          })
    
        } */


    Dados()

  }, [])

  async function CadastraUsuario() {

    if (nome != '' && cargo != '') {

      let usuarios = await firebase.database().ref('Usuarios')
      let key = usuarios.push().key

      usuarios.child(key).set({
        nome,
        cargo
      })
      setCargo('')
      setNome('')

    }

  }

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Nome</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={(e) => setNome(e)}
        underlineColorAndroid='transparent'
        keyboardType=''
      />
      <Text style={styles.texto}>Cargo</Text>
      <TextInput
        style={styles.input}
        value={cargo}
        onChangeText={(e) => setCargo(e)}
        underlineColorAndroid='transparent'
      />

      <TouchableOpacity onPress={() => CadastraUsuario()} activeOpacity={0.5} style={styles.btn}>
        <Text style={styles.textBtn}> Cadastrar </Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator style={{marginTop:50}} color='#121212' size={45} />
      ) :
        (
          <FlatList
            style={styles.lista}
            data={usuarios}
            keyExtractor={item => item.key}
            renderItem={(item) => <Listagem data={item} />}
          />
        )
      }


    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    marginTop: 40,
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
    borderRadius: 5
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    height: 58,
    borderRadius: 5
  },
  textBtn: {
    fontWeight: 'bold',
    color: '#fff'
  },
  lista: {
    marginTop: 25
  }
})

export default App;