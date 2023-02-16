import React, { useState, useEffect } from "react";
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import IPADRESS from "../config/IPADRESS";

const { width, height } = Dimensions.get("screen");
const ITEM_WIDTH = width;
const ITEM_HEIGHT = 300;

const images = [
  "https://res.cloudinary.com/dn9qfvg2p/image/upload/v1673395210/keskes-1170x657_fjay25.jpg",
  "https://res.cloudinary.com/dn9qfvg2p/image/upload/v1673395210/IMG_0009-min_h3rrpw.jpg",
  "https://res.cloudinary.com/dn9qfvg2p/image/upload/v1673395210/IMG_0035-min_vk9db9.jpg",
];

export default function ImageDetails(props) {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [image, setImage] = useState([]);

  // recived the props sended from productInfo
  const id = props.idProduct;

  // function to get all image of one products by id
  useEffect(() => {
    axios
      .get(`http://${IPADRESS}:5000/products/getProductPhoto/${id}`)
      .then((result) => {
        setImage(result.data);
        // console.log(result.data);
      });
  });

  // function to extract url of images and push them in the array to loopover it
  let myimages = [];
  let MyPhotoArray = () => {
    image.map((element) => {
      myimages.push(element.Photo1);
      myimages.push(element.Photo2);
      myimages.push(element.Photo3);
    });
    return myimages;
  };

  MyPhotoArray();

  const data = myimages.map((element, index) => ({
    key: String(index),
    photo: element,
    avatar_url: `https://randomuser.me/api/portraits/women/${Math.floor(
      Math.random() * 40
    )}.jpg`,
  }));

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        data={data}
        // keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width * 0.7, 0, width * 0.7],
          });
          return (
            <View
              style={{ width, justifyContent: "center", alignItems: "center" }}
            >
              <View
                style={{
                  borderRadius: 14,

                  shadowColor: "#000",

                  shadowOpacity: 0.5,
                  shadowRadius: 30,
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  borderRadius: 18,
                  padding: 12,

                  backgroundColor: "white",
                }}
              >
                <View
                  style={{
                    width: ITEM_WIDTH,
                    height: ITEM_HEIGHT,
                    overflow: "hidden",
                    alignItems: "center",
                    borderRadius: 14,
                  }}
                >
                  <Animated.Image
                    source={{ uri: item.photo }}
                    style={{
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT,
                      resizeMode: "cover",
                      transform: [
                        {
                          translateX,
                        },
                      ],
                    }}
                  />
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
