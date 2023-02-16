import * as React from "react";
import {
  StatusBar,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Image, Box, VStack } from "native-base";
import TabBar from "../components/TabBar";
const { width, height } = Dimensions.get("screen");
const SPACING = 20;
export default ({ navigation, route }) => {
  const data = route.params.item;
  console.log("test", data);
  return (
    <View style={StyleSheet.absoluteFillObject}>
      <View
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
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.3,
          shadowRadius: 20,
          marginTop: 20,
        }}
      >
        <VStack>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              margintop: 10,
              color: "#373E5A",
            }}
          >
            Booked{" "}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>
            Booked in:
            <Text style={{ fontSize: 15, fontWeight: "400" }}>{data.date}</Text>
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              margintop: 10,
              color: "#373E5A",
            }}
          >
            {" "}
            your Commande :
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>
            Product name :
            <Text style={{ fontSize: 15, fontWeight: "400" }}>
              {data.product_name}
            </Text>
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              margintop: 10,
              color: "#373E5A",
            }}
          >
            {" "}
            Delevery information
          </Text>

          <Text style={{ fontSize: 15, fontWeight: "700", margintop: 10 }}>
            {" "}
            Product Price :
            <Text style={{ fontSize: 15, fontWeight: "400", margintop: 10 }}>
              {data.price} dt
            </Text>
          </Text>
        </VStack>
        {/* <Image
          source={{ uri: data.photo_product }}
          style={{
            width: "100%",
            width: 190,
            height: "100%",
            resizeMode: "contain",
          }}
        /> */}
      </View>

      <TabBar navigation={navigation} />
    </View>
  );
};
