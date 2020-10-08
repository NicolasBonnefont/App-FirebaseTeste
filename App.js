import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase from './src/firebaseConnection'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import AsyncStorage from '@react-native-community/async-storage';

import Login from './src/pages/Login'
import Home from './src/pages/Home'
import CadastroUsuario from './src/pages/CadastroUsuario'


const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const App = () => {

  const [logado, setLogado] = useState(false)

  async function checkLogin() {
    const check = await AsyncStorage.getItem('logado')


    if (check === 'true') {
      setLogado(true)
    } else {
      setLogado(false)
    }
  }

  useEffect(() => {
    checkLogin()
  }, [logado])


  return (

    <NavigationContainer>
      <Tab.Navigator>
        {logado ?
          (
            <Tab.Screen name='Home' component={Home} />
          )
          : (
            <>
              <Stack.Screen options={{ tabBarVisible: false }} name='Login' component={Login} />
              <Stack.Screen name='CadastroUsuario' component={CadastroUsuario} />
            </>
          )

        }
      </Tab.Navigator>
    </NavigationContainer >

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

export default App;