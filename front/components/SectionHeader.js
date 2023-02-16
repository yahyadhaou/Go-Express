import React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/core';
const SectionHeader = ({title, onPress, buttonTitle = 'Button'}) => {
  const navigation=useNavigation()
  function rederection(){
    navigation.navigate('Shop')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Button title={buttonTitle}color="#ED5C00" onPress={rederection}/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 24,
    marginRight: 18,
    marginTop: 24,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SectionHeader;