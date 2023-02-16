import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default function EmailConfirmation() {
  return (
    <View style={css.container} onPress={() => Keyboard.dismiss()}>
      <View style={css.box}>
        <Text
          style={{
            marginTop: 20,
            textAlign: "left",
            fontSize: 20,
            fontWeight: "bold",
            marginRight: 210,
            marginBottom: 8,
          }}
        >
          Email
        </Text>
      </View>
    </View>
  );
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFB897",
    alignItems: "center",
    justifyContent: "center",
    height: 800,
  },

  box: {
    backgroundColor: "#FEE9E5",
    width: 330,
    height: 330,
    borderBottomLeftRadius: 120,

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 60,
    shadowRadius: 40,
    elevation: 20,
  },
});
