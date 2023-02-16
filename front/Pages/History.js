import React, { useState, useEffect, useContext } from "react";
import {
  StatusBar,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Image, Box } from "native-base";
import TabBar from "../components/TabBar";
import { UserContext } from "../UserContext";
import axios from "axios";
import IPADRESS from "../config/IPADRESS";

const { width, height } = Dimensions.get("screen");

const BG_IMG =
  "https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg?aut1265.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500";

const SPACING = 20;

const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

export default ({ navigation }) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const { userId } = useContext(UserContext);
  const { userCartId } = useContext(UserContext);

  let [historyData, setHistoryData] = useState([]);

  console.log("off", historyData);
  useEffect(() => {
    // alert(userCartId);
    axios
      .get(`http://${IPADRESS}:5000/carts/getCartHistorique/${userId}`)
      .then((response) => {
        setHistoryData(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Image
          source={{ uri: BG_IMG }}
          // style={StyleSheet.absoluteFillObject}
          blurRadius={80}
        />
        <Animated.FlatList
          data={historyData}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{
            padding: SPACING,
            paddingTop: StatusBar.currentHeight || 42,
          }}
          renderItem={({ item, index }) => {
            const inputRange = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 2),
            ];
            const opacityInputRange = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 1),
            ];
            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0],
            });
            const opacity = scrollY.interpolate({
              inputRange: opacityInputRange,
              outputRange: [1, 1, 1, 0],
            });
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("HistoryDetails", { item })}
              >
                <Animated.View
                  style={{
                    flexDirection: "row",
                    padding: SPACING,
                    marginBottom: SPACING,
                    backgroundColor: "rgba(255,255,255,0.8)",
                    borderRadius: 12,
                    borderColor: "red",
                    borderWidth: 1.5,
                    borderRadius: 25,
                    borderColor: "#f14e24",
                    opacity,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 10,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 20,
                    transform: [{ scale }],
                  }}
                >
                  <Image
                    source={{
                      uri: "https://res.cloudinary.com/dn9qfvg2p/image/upload/c_scale,w_1000/v1673554661/G_eluphz.png",
                    }}
                    alt="Alternate Text"
                    style={{
                      top: 10,
                      width: AVATAR_SIZE,
                      height: AVATAR_SIZE,
                      marginRight: SPACING / 2,
                    }}
                    size={50}
                  />
                  <View style={{ justifyContent: "center" }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "500",
                        opacity: 0.7,
                        marginLeft: SPACING / 2,
                        color: "#1C2765",
                      }}
                    >
                      {" "}
                      {item.product_name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "400",
                        opacity: 0.7,
                        marginLeft: SPACING / 2,
                        color: "#444444",
                      }}
                    >
                      {" "}
                      {item.price} DT
                    </Text>
                    <Text style={{ fontSize: 18, opacity: 0.7 }}>
                      {" "}
                      {item.quantity} unit
                    </Text>
                  </View>
                </Animated.View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <TabBar navigation={navigation} />
    </View>
  );
};
