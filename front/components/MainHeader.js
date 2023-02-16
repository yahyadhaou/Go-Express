import React from 'react';
import {Text, View, StyleSheet,Pressable,Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import cart from "front/assets/shopping-cart-empty-side-view.png";
import notifications from "front/assets/notification.png";
import { useNavigation } from '@react-navigation/core';

const MainHeader = ({title}) => {
  const insets = useSafeAreaInsets();
  const navigation=useNavigation()
  function rederectionn(){
    navigation.navigate('Cart')
  }
  function rederectionnn(){
    navigation.navigate('Notification')
  }
  return (
    <>
    <View style={{width:40,height:40,right:-100}} >
      <Pressable onPress={()=>{rederectionn()} } ><Image style={styles.cart} source={cart} /></Pressable>
      <View style={{width:40,height:40,right:-100}} >
      <Pressable onPress={()=>{rederectionnn()} } ><Image style={styles.notifications} source={notifications}  /></Pressable>
      </View>
    </View>
    <View style={[styles.container, {marginTop: insets.top}]}>
      
      <Text style={styles.title}>{title}</Text>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 21,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color:"#ED5C00"
  },
  cart:{
    width:25,
    height:25,
    position:'absolute',
    top:10,
    marginLeft:180,
    

  },
  notifications:{
    width:30,
    height:30,
    position:'absolute',
    top:7,
    marginLeft: 118,
    
  },
});

export default MainHeader;