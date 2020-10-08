import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// import { Container } from './styles';

const Home = ({navigation}) => {

  async function deslogar(){
    await AsyncStorage.clear()
    navigation.navigate('Login')
   
  }

  return (
    <View>
      <Text>
        Bem vindo ao Home
      </Text>

      <TouchableOpacity onPress={() => deslogar()} activeOpacity={0.5} style={styles.btn}>
        <Text style={styles.textBtn}> Deslogar </Text>
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

export default Home;