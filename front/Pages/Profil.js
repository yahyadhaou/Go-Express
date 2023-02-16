import React from "react";
import { useState, useEffect, useContext } from "react";
import TabBar from "../components/TabBar";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Touchable,
  TouchableOpacity,
  Dimensions,
  Button,
  Alert,
  StatusBar,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../UserContext";
import axios from "axios";

import {
  TextArea,
  Box,
  Center,
  NativeBaseProvider,
  extendTheme,
  InputRightAddon,
  VStack,
  HStack,
} from "native-base";
import EditeProfil from "./EditeProfil";
import { EmailAuthCredential } from "@firebase/auth";

import IPADRESS from "../config/IPADRESS";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const adressIp = IPADRESS;
const MAX_RATING = 5;
// feedback side
function Feedback() {
  const imgWidth = Dimensions.get("screen").width * 0.33333;
  const { userId } = useContext(UserContext);
  // state to save feedback text
  const [FeedBackText, setFeedBackText] = useState("");
  // state for rating
  const [rating, setRating] = useState(0);

  // function to render numbers of stars
  const renderStar = ({ item, index }) => {
    const active = index < rating;
    return (
      <TouchableOpacity onPress={() => setRating(index + 1)}>
        <Ionicons
          name={active ? "ios-star" : "ios-star-outline"}
          size={35}
          // color="#ffc107"
          color="#ED5C00"
        />
      </TouchableOpacity>
    );
  };
  let AddFeedback = () => {
    axios
      .post(`http://${adressIp}:5000/feedback/addFeedback`, {
        details: FeedBackText,
        id_user: userId,
        etoile: rating,
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        flex: 1,
        alignItems: "center",
        height: 500,
        justifyContent: "center",
      }}
    >
      <View>
        <View>
          <Text
            style={{
              color: "#373E5A",
              fontSize: 16,
              fontWeight: "bold",
              marginTop: 60,
              alignContent: "center",
            }}
          >
            Your Feedback is ower key to Satisfy your needs
          </Text>
          <FlatList
            style={{
              width: 180,
              marginBottom: -42,
              marginTop: 10,
              left: 100,
            }}
            data={new Array(MAX_RATING).fill(0)}
            renderItem={renderStar}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View
          style={{
            marginTop: 80,
          }}
        >
          <NativeBaseProvider>
            <Box alignItems="center">
              <TextArea
                h={130}
                size="xl"
                _focus={{ borderColor: "#ED5C00" }}
                placeholder="Feedback Placeholder"
                w="500"
                maxW="350"
                backgroundColor={"#fafafa"}
                borderColor={"#ED5C00"}
                onChangeText={(text) => setFeedBackText(text)}
              />
            </Box>
          </NativeBaseProvider>
        </View>
      </View>
      <View
        style={{
          marginTop: 350,
          width: 80,
          height: 80,
          right: 0,
        }}
      >
        <Button
          color={"#ED5C00"}
          title="Send"
          onPress={() => {
            Alert.alert(
              "Your Feedback was send we will take it into considiretion."
            );
            AddFeedback();
          }}
        />
      </View>
    </View>
  );
}

function Info({ route, navigation, id }) {
  const imgWidth = Dimensions.get("screen").width * 0.33333;

  const { userId } = useContext(UserContext);
  const [userDataProfile, setUserDataProfile] = useState([]);

  useEffect(() => {
    axios
      .get(`http://${adressIp}:5000/users/getUserPorfile/${userId}`)
      .then((response) => {
        setUserDataProfile(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
  //userDataProfile

  return (
    <View
      style={{
        backgroundColor: "white",
        height: 480,
        alignItems: "center",
        padding: 20,
      }}
    >
      <HStack>
        <EditeProfil />
      </HStack>
      <Center>
        <Box
          marginLeft={0}
          height={80}
          top={1}
          size={200}
          width={350}
          borderColor={"#F14E24"}
          p="5"
          rounded="8"
          borderWidth="2"
        >
          <VStack>
            <HStack marginTop={5}>
              <Image
                source={{
                  uri: "https://res.cloudinary.com/dn9qfvg2p/image/upload/v1672937081/phone-call_ile7m8.png",
                }}
                style={{ width: 22, height: 22, marginRight: 20 }}
              ></Image>
              {userDataProfile.map((element, index) => {
                if (element.phone_number) {
                  return (
                    <>
                      <Text
                        key={index}
                        fontSize="md"
                        color="#1C2765"
                        colorScheme="darkBlue"
                        variant="solid"
                        marginLeft={2}
                        rounded="4"
                      >
                        {element.phone_number}
                      </Text>
                    </>
                  );
                } else {
                  return (
                    <>
                      <Text
                        key={element.id_user}
                        fontSize="md"
                        color="#1C2765"
                        colorScheme="darkBlue"
                        variant="solid"
                        marginLeft={2}
                        rounded="4"
                      >
                        there is no number 🛑
                      </Text>
                    </>
                  );
                }
              })}
            </HStack>
            <HStack marginTop={5}>
              <Image
                source={{
                  uri: "https://res.cloudinary.com/dn9qfvg2p/image/upload/v1671726895/gmail_dcjbrl.png",
                }}
                style={{ width: 22, height: 22, marginRight: 20 }}
              ></Image>

              {userDataProfile.map((element) => {
                if (element.email) {
                  return (
                    <Text
                      fontSize="md"
                      color="#1C2765"
                      colorScheme="darkBlue"
                      variant="solid"
                      marginLeft={2}
                      rounded="4"
                    >
                      {element.email}
                    </Text>
                  );
                } else {
                  return (
                    <Text
                      fontSize="md"
                      color="#1C2765"
                      colorScheme="darkBlue"
                      variant="solid"
                      marginLeft={2}
                      rounded="4"
                    >
                      You don't have an email 🛑
                    </Text>
                  );
                }
              })}
            </HStack>
            <Box>
              <HStack marginTop={5}>
                <Image
                  source={{
                    uri: "https://res.cloudinary.com/dn9qfvg2p/image/upload/v1671726727/location_xel02r.png",
                  }}
                  style={{ width: 22, height: 22, marginRight: 20 }}
                ></Image>

                {userDataProfile.map((element) => {
                  if (element.adress) {
                    return (
                      <Text
                        fontSize="md"
                        color="#1C2765"
                        colorScheme="darkBlue"
                        variant="solid"
                        rounded="4"
                      >
                        {element.adress}
                      </Text>
                    );
                  } else {
                    return (
                      <Text
                        fontSize="md"
                        color="#1C2765"
                        colorScheme="darkBlue"
                        variant="solid"
                        rounded="4"
                      >
                        Please update your adress
                      </Text>
                    );
                  }
                })}
              </HStack>
            </Box>
          </VStack>
        </Box>
      </Center>
    </View>
  );
}
// product side
function Product() {
  const COLOURS = {
    white: "#ffffff",
    black: "#000000",
    green: "#00AC76",
    red: "#C04345",
    blue: "#0043F9",
    backgroundLight: "#F0F0F3",
    backgroundMedium: "#B9B9B9",
    backgroundDark: "#777777",
  };
  const imgWidth = Dimensions.get("screen").width * 0.33333;

  // state to save user information
  const [userDataProduct, setUserDataProduct] = useState([]);

  const { userId } = useContext(UserContext);
  useEffect(() => {
    axios
      .get(`http://${IPADRESS}:5000/users/getUserProduct/${userId}`)
      .then((response) => {
        setUserDataProduct(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
  //userDataProduct

  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          height: "100%",
          alignItems: "flex-start",
        }}
      >
        {userDataProduct.map((element, index) => (
          <TouchableOpacity
            key={index}
            style={{
              width: "100%",
              height: 100,
              marginVertical: 6,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "30%",
                height: 100,
                padding: 14,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: COLOURS.backgroundLight,
                borderRadius: 10,
                marginRight: 22,
                borderColor: "#1C2765",
                borderWidth: 2,
              }}
            >
              <StatusBar backgroundColor={"white"} barStyle="dark-content" />
              <Image
                source={{ uri: element.photo_product }}
                style={{
                  width: "170%",
                  width: 150,
                  height: "130%",
                  resizeMode: "contain",
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                height: "100%",
                justifyContent: "space-around",
              }}
            >
              <View style={{}}>
                <Text
                  style={{
                    fontSize: 14,
                    maxWidth: "100%",
                    color: COLOURS.black,
                    fontWeight: "600",
                    letterSpacing: 1,
                  }}
                >
                  {element.product_name}
                </Text>
                <View
                  style={{
                    marginTop: 4,
                    flexDirection: "row",
                    alignItems: "center",
                    opacity: 0.6,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "400",
                      maxWidth: "85%",
                      marginRight: 4,
                    }}
                  >
                    {element.price} dt
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 4,
                    flexDirection: "row",
                    alignItems: "center",
                    opacity: 0.6,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "400",
                      maxWidth: "85%",
                      marginRight: 4,
                    }}
                  >
                    {element.quantity} Units
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                ></View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

export default function Profil({ navigation, route }) {
  const [showContent, setShowContent] = useState("FeedBack");

  // state to save user information
  const [userDataProfile, setUserDataProfile] = useState([]);

  const { userId } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`http://${adressIp}:5000/users/getUserPorfile/${userId}`)
      .then((response) => {
        setUserDataProfile(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
  //userDataProfile

  return (
    <>
      <View>
        <ScrollView>
          <View>
            <Image
              style={{
                height: height - 500,
              }}
              source={{
                uri: "https://res.cloudinary.com/dn9qfvg2p/image/upload/v1674060984/font_oq0zp9.png",
              }}
            ></Image>
          </View>
          <View>
            <View>
              {userDataProfile.map((element) => {
                if (element.photo) {
                  return (
                    <>
                      <Image
                        source={{
                          uri: element.photo,
                        }}
                        style={{
                          width: 100,
                          height: 100,
                          // borderRadius: 100,
                          marginTop: -130,
                          left: 20,
                          borderRadius: 20,
                          shadowColor: "black",
                          shadowOffset: {
                            width: 5,
                            height: 5,
                          },
                          shadowOpacity: "100%",
                          shadowRadius: 20,
                          elevation: 20,
                        }}
                      ></Image>
                    </>
                  );
                } else {
                  return (
                    <>
                      <Image
                        source={{
                          uri: `https://invisiblechildren.com/wp-content/uploads/2012/07/facebook-profile-picture-no-pic-avatar.jpg`,
                        }}
                        style={{
                          width: 100,
                          height: 100,
                          // borderRadius: 100,
                          marginTop: -130,
                          left: 20,
                          borderRadius: 20,
                          shadowColor: "black",
                          shadowOffset: {
                            width: 5,
                            height: 5,
                          },
                          shadowOpacity: "100%",
                          shadowRadius: 20,
                          elevation: 20,
                        }}
                      ></Image>
                    </>
                  );
                }
              })}
            </View>
          </View>
          {/* user name */}

          {userDataProfile.map((element) => (
            <View>
              <Text
                key={element.id_user}
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  top: -110,
                  left: 150,
                  color: "white",
                }}
              >
                {element.name}
              </Text>

              {/* user ville */}
              <Text
                style={{
                  fontSize: 15,
                  top: -110,
                  left: 150,
                  color: "white",
                }}
              >
                {element.ville}
              </Text>
            </View>
          ))}
          {/* bar */}

          <View style={{ marginTop: -50, backgroundColor: "white" }}>
            <View style={styles.profileContentButtonsView}>
              <TouchableOpacity
                style={{
                  ...styles.showContentButton,
                  borderBottomWidth: showContent === "FeedBack" ? 2 : 0,
                }}
                onPress={() => setShowContent("FeedBack")}
              >
                <Text style={styles.showContentButtonText}>FeedBack</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.showContentButton,
                  borderBottomWidth: showContent === "Info" ? 2 : 0,
                }}
                onPress={() => setShowContent("Info")}
              >
                <Text style={styles.showContentButtonText}>Info</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.showContentButton,
                  borderBottomWidth: showContent === "Product" ? 2 : 0,
                }}
                onPress={() => setShowContent("Product")}
              >
                <Text style={styles.showContentButtonText}>Product</Text>
              </TouchableOpacity>
            </View>
            {showContent === "Product" ? (
              <Product />
            ) : showContent === "Info" ? (
              <Info />
            ) : (
              <Feedback />
            )}
          </View>
        </ScrollView>
      </View>
      <TabBar navigation={navigation} />
    </>
  );
}
const styles = StyleSheet.create({
  coverImage: { height: 300, width: "100%" },
  profileContainer: {
    // height: 1000,
    backgroundColor: "#fff",
    marginTop: -100,
    borderTopLeftRadius: 110,
    borderTopRightRadius: 0,
  },
  profileImageView: { alignItems: "center", marginTop: -80 },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#CCC9C0",
  },
  nameAndBioView: { alignItems: "center", marginTop: 10 },
  userFullName: {
    fontFamily: "",
    fontSize: 26,
    textDecorationLine: "underline",
  },
  userBio: {
    fontFamily: "",
    fontSize: 18,
    color: "#333",
    marginTop: 4,
  },
  countsView: { flexDirection: "row", marginTop: 20 },
  countView: { flex: 1, alignItems: "center" },
  countNum: { fontFamily: "", fontSize: 20 },
  countText: { fontFamily: "", fontSize: 18, color: "#333" },
  interactButtonsView: {
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  interactButton: {
    flex: 3,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#CCC9C0",
    margin: 9,
    borderRadius: 10,
    shadowOpacity: 0.7,
    shadowRadius: 7.49,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 6,
  },
  interactButtonText: {
    borderRadius: 10,

    color: "#FFF",
    fontSize: 18,
    paddingVertical: 6,
  },
  profileContentButtonsView: {
    flexDirection: "row",
    borderTopWidth: 3,
    borderTopColor: "white",
  },
  showContentButton: {
    flex: 2,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#ED5C00",
  },
  showContentButtonText: {
    fontSize: 18,
    color: "grey",
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
});
