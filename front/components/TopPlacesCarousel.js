import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window')
export const sizes = {
    width,
    height,
    title: 32,
    h2: 24,
    h3: 18,
    body: 14,
    radius: 16,
  };
const CARD_WIDTH = sizes.width - 80;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + 24;

const TopPlacesCarousel = ({list}) => {
  const navigation =useNavigation()
  return (
    <FlatList
      data={list}
      horizontal
      snapToInterval={CARD_WIDTH_SPACING}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      keyExtractor={i => i.id}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            style={{
              marginLeft: 24,
              marginRight: index === list.length - 1 ? 24 : 0,
            }}>
            <View style={[styles.card, styles.dark]}>
              <View style={styles.imageBox}>
                <Image source={item.image} style={styles.image} onPress={()=>{
                  nav
                }}/>
              </View>
              <View style={styles.titleBox}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.location}>{item.location}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  
    card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginVertical: 10,
  },
  dark: {
    shadowColor: "#000",
    shadowRadius: 4,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
},
  favorite: {
    position: 'absolute',
    top: 18,
    right: 18,
    zIndex: 1,
  },
  imageBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    resizeMode: 'cover',
  },
  titleBox: {
    position: 'absolute',
    top: CARD_HEIGHT - 80,
    left: 16,
  },
  title: {
    fontSize: 24,
    // fontWeight: 'bold',
    color:  'black',
  },
  location: {
    fontSize: 18,
    color:  '#ED5C00',
  },
});

export default TopPlacesCarousel;