import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// import { Container } from './styles';

const ListaUsuario = ({data}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Nome: {data.item.nome} </Text>
      <Text style={styles.texto}>Cargo: {data.item.cargo} </Text>
    </View>
  );
}



const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:10,
    marginBottom:5,
    padding:10,
    backgroundColor:'#121212',
    borderRadius:5
  },
  texto:{
    color:'#fff',
    fontSize:17
  }
})

export default ListaUsuario;