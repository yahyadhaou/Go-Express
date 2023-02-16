import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";
const Awelscreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../assets/images/demenagement.gif")}
      >
        <View style={style.details}>
          <Text style={{ color: "#1C2765", fontSize: 35, fontWeight: "bold" }}>
            GO-Epress
          </Text>
          <Text style={{ color: "#1C2765", fontSize: 35, fontWeight: "bold" }}>
            make your life easy
          </Text>
          <Text
            style={{
              color: "#ED5C00",
              lineHeight: 25,
              marginTop: 15,
              fontWeight: "bold",
            }}
          >
            welcome to GO-EXPRESS we are here here to help you
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("TestLogin")}
          >
            <View style={style.btn}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#ED5C00",
                  backgroundColor: "ED5C00",
                }}
              >
                Get Started
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  details: {
    height: "50%",
    bottom: 0,
    position: "absolute",
    paddingHorizontal: 40,
  },
  btn: {
    height: 50,
    width: 120,
    backgroundColor: "#FFF",
    marginTop: 20,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Awelscreen;
