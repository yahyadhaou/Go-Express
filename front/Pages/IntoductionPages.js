import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import TestLogin from "./TestLogin";

const IntoductionPages = () => {
  const [showRealApp, setShowRealApp] = useState(false);

  const onDone = () => {
    setShowRealApp(true);
  };

  const RenderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Image
          style={{ width: 50, height: 50, bottom: -4, left: 1 }}
          source={{
            uri: "https://res.cloudinary.com/dn9qfvg2p/image/upload/v1673556815/go_ovtczy.png",
          }}
        ></Image>
      </View>
    );
  };

  const RenderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Image
          style={{ width: 50, height: 50, bottom: -4, left: 1 }}
          source={{
            uri: "https://res.cloudinary.com/dn9qfvg2p/image/upload/v1673556815/go_ovtczy.png",
          }}
        ></Image>
      </View>
    );
  };

  const RenderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: "center",
          justifyContent: "space-around",
          paddingBottom: 40,
        }}
      >
        <Image style={styles.introImageStyle} />
        <Image
          style={{ width: 300, height: 300, alignItems: "center", top: -300 }}
          source={item.image}
        />
        <Text style={styles.introTitleStyle}>{item.title}</Text>
      </View>
    );
  };
  return (
    <>
      {showRealApp ? (
        <TestLogin />
      ) : (
        <AppIntroSlider
          data={slides}
          renderItem={RenderItem}
          onDone={onDone}
          renderDoneButton={RenderDoneButton}
          renderNextButton={RenderNextButton}
        />
      )}
    </>
  );
};

export default IntoductionPages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // padding: 10,
    justifyContent: "center",
  },

  introImageStyle: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    // marginBottom: 120,
    // marginTop: 200,
  },
  introTextStyle: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
    paddingVertical: -20,
    marginVertical: 60,
  },
  introTitleStyle: {
    fontSize: 23,
    color: "black",
    textAlign: "center",
    alignItems: "center",
    top: -580,
    // marginBottom: 10,
    // fontWeight: "bold",
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonCircleImage: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

const slides = [
  {
    key: "s1",
    text: " Go Express ",
    title: "Looking For Relocation ?",
    image: require("../assets/Intro/demenagement.gif"),
    backgroundColor: "#373E5A",
  },
  {
    key: "s2",
    title: "Looking For Cleaning Service ?",
    text: "Upto 25% off on Domestic Flights",
    image: require("../assets/Intro/image_processing20210217-23409-1sk6736.gif"),
    backgroundColor: "#373E5A",
  },
  {
    key: "s3",
    title: "Looking For an Electrical Service ?",
    text: "Enjoy Great offers on our all services",
    image: {
      uri: "https://res.cloudinary.com/dn9qfvg2p/image/upload/v1674149411/e_dk0ttn.webp",
    },
    backgroundColor: "#373E5A",
  },
  {
    key: "s4",
    title: "Looking For an Plombering Service.",
    text: " Best Deals on all our services",
    // image: require("../assets/Intro/plomber h.gif"),
    image: {
      uri: "https://res.cloudinary.com/ddvyi3jpk/image/upload/v1674206359/test_rzfkmn.png",
    },
    backgroundColor: "#373E5A",
  },
];
