import React from 'react';
import {Text, View, StyleSheet, Image,Pres, Pressable} from 'react-native';
import cart from "front/assets/shopping-cart-empty-side-view.png";
import notifications from "front/assets/notification.png";
import { useNavigation } from '@react-navigation/core';

const ScreenHeader = ({mainTitle, secondTitle}) => {
  const navigation=useNavigation()
  function rederectionn(){
    navigation.navigate('Cart')
  }
  function rederectionnn(){
    navigation.navigate('Notification')
  }
  return (
    
    <View style={styles.container}>
      <Pressable onPress={()=>{rederectionn()} } ><Image style={styles.cart} source={cart} /></Pressable>
      <Pressable onPress={()=>{rederectionnn()} } ><Image style={styles.notifications} source={notifications}  /></Pressable>
      <Text style={styles.mainTitle} >{mainTitle}</Text>
      <Text style={styles.secondTitle} onPress={()=>{rederectionnn()} }>{secondTitle} </Text>
    </View>
          

  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 2,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
   color:"#373E5A"
  },
  secondTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color:"#ED5C00"
  },
  cart:{
    width:30,
    height:30,
    marginTop: -22,
    marginLeft: 343,
    paddingTop:30,


  },
  notifications:{
    width:30,
    height:30,
    padding:20,
    position:'absolute',
    top:25,
    left:341,
  },
});

export default ScreenHeader;