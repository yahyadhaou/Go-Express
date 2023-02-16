import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

export default function PhoneNumber({ route, Navigation }) {
  //const {name,email}=route.params;
  const [isPressed, setIsPressed] = useState(false);
  const [number, setNumber] = useState("");
  // Drop Down Menu
  const [selectedValue, setSelectedValue] = useState("Tunis");

  return (
    <>
      <View style={css.container}>
        {/** ---------------------------------------------------THE BOX -----------------------------------------------*/}
        <View style={css.box}>
          {/** ---------------------------------------------------PHONE NUMBER -----------------------------------------------*/}
          <TouchableOpacity
            onPressIn={() => {
              setIsPressed(true);
              console.log(isPressed);
            }}
            onPressOut={() => {
              setIsPressed(false);
              console.log(isPressed);
            }}
          >
            <Text style={[css.text, isPressed && css.textPressed]}>
              Phone number :
            </Text>
          </TouchableOpacity>
          <TextInput
            style={{
              height: 50,
              fontSize: 17,
              borderColor: "black",
              fontWeight: "bold",
              borderWidth: 1,
              padding: 10,
              width: 250,
              borderRadius: 100,
              marginTop: 100,
              position: "absolute",
            }}
            placeholder="  🇹🇳 +216"
            keyboardType="phone-pad"
            defaultValue=" 🇹🇳 +216  "
            onChangeText={(text) => setNumber(text)}
          />
          {/** ---------------------------------------------------STATE (PLACE)-----------------------------------------------*/}

          <Text style={css.textState}>State :</Text>

          <TextInput
            style={{
              height: 50,
              fontSize: 17,
              borderColor: "black",
              fontWeight: "bold",
              borderWidth: 1,
              padding: 10,
              width: 250,
              borderRadius: 100,
              marginTop: 225,
              position: "absolute",
            }}
            placeholder="Town"
            keyboardType="phone-pad"
            defaultValue=" Tunis  "
            onChangeText={(text) => setNumber(text)}
          />
        </View>
        {/** ---------------------------------------------------------------------------------------------------------*/}

        {/** ---------------------------------------------------THE BUTTON -----------------------------------------------*/}

        <Text
          style={{
            fontSize: 17,
            fontWeight: "500",
            borderRadius: 44,
            backgroundColor: "#40946C",
            color: "white",
            padding: 15,
            marginTop: 30,
          }}
        >
          {" "}
          Create an account{" "}
        </Text>
      </View>
    </>
  );
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE2AA",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 40,
    color: "#FFF",
  },

  box: {
    backgroundColor: "white",
    width: 350,
    height: 350,

    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",

    borderBottomWidth: 2,
    borderRadius: 44,
    borderBottomColor: "black",

    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 60,
    shadowRadius: 40,
    elevation: 20,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 46,
  },
  textPressed: {
    fontSize: 27,
    color: "red",
  },
  textState: {
    fontSize: 25,
    fontWeight: "bold",
    justifyContent: "center",
    position: "absolute",
    marginTop: 170,
    marginLeft: 0,
  },
});
