import { useState, useContext } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Text,
  Alert,
  Dimensions,
  SafeAreaView,
  Pressable,
  DevSetting,
} from "react-native";
import { UserContext } from "../UserContext";
import React from "react";
import {
  FontAwesome,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Home from "../Pages/yahya";

const { width, height } = Dimensions.get("window");

const TabBar = ({ navigation }) => {
  const { showContent, setShowContent } = useContext(UserContext);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        // top: height - 100,
        bottom: 0,
        flexDirection: "column",
        width: width,
        position: "absolute",
      }}
    >
      <View
        style={{
          alignSelf: "center",

          width: 60,
          height: 46,
          borderRadius: 35,
          bottom: 35,
          zIndex: 10,
          right: -1,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Serves");
            return setShowContent("truck-fast");
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginStart: -5,
              top: 20,
              backgroundColor: "#373E5A",
              width: 70,
              marginTop: 11,
              height: 50,
            }}
          >
            <MaterialCommunityIcons name="truck-fast" 
            size={24} 
            color={showContent === "truck-fast" ? "#ED5C00" : "#b0aeae"}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: "absolute",
          backgroundColor: "#f0f0f0",
          shadowOpacity: 0.3,
          shadowRadius: 3,
          shadowOffset: {
            height: 3,
            width: 3,
          },
          x: 0,
          y: 0,
          style: { marginVertical: 5 },
          bottom: 0,
          width: "100%",
          height: 50,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 10,
          paddingHorizontal: 25,
          borderBottomLeftRadius: 15,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SideBar");
              return setShowContent("Home");
            }}
          >
            <FontAwesome
              name="home"
              size={24}
              color={showContent === "Home" ? "#ED5C00" : "#b0aeae"}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginStart: 5,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Shop");
              return setShowContent("shop");
            }}
          >
            <Entypo
              name="shop"
              size={24}
              color={showContent === "shop" ? "#ED5C00" : "#b0aeae"}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginStart: 70,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddProduct");     // WHERE TO ADD THE ID OF THE USER 
              return setShowContent("AddProduct");
            }}
          >
            <MaterialCommunityIcons
              name="archive-plus"
              size={24}
              color={showContent === "AddProduct" ? "#ED5C00" : "#b0aeae"}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginStart: 5,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("History");
              return setShowContent("history");
            }}
          >
            <FontAwesome
              name="history"
              size={24}
              color={showContent === "history" ? "#ED5C00" : "#b0aeae"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "",
    marginTop: 20,
  },
  button: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "grey",
    shadowOpacity: 0.1,
    shadowOffset: { x: 2, y: 0 },
    shadowRadius: 2,
    // borderRadius: 30,
    position: "absolute",
    bottom: 20,
    right: 0,
    top: 5,
    left: 5,
    shadowOpacity: 6.0,
  },
  actionBtn: {
    backgroundColor: "white",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
    borderWidth: 2,
    borderColor: "#ffedd5",
  },
});
export default TabBar;
