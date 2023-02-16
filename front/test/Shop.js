import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  // StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  DevSettings,
} from "react-native";
import TabBar from "../components/TabBar";
import { COLOURS, Items } from "../database/Database";
import axios from "axios";
import IPADRESS from "../config/IPADRESS";

const Shop = ({ navigation }) => {
  // to set id_cart for each user and set a new id-cart after each chek-out

  // const { userCartId, setUserCartId } = useContext(UserContext);
  // useEffect(() => {
  //   axios
  //     .get(`http://${IPADRESS}:5000/carts/getIdCart/${userId}`)
  //     .then((response) => {
  //       response.data.map((element) => {
  //         setUserCartId(element.id_cart);
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // function to get Kitchen data length
  let [KitchenData, setKitchenData] = useState([]);
  useEffect(() => {
    axios.get(`http://${IPADRESS}:5000/products/Kitchen`).then((result) => {
      setKitchenData(result.data);
    });
  }, []);

  // function to get furniture data length
  let [furnitureData, setFurnitureData] = useState([]);
  useEffect(() => {
    axios.get(`http://${IPADRESS}:5000/products/Furniture`).then((result) => {
      setFurnitureData(result.data);
    });
  }, []);

  // function to get Accessories data length
  let [accessoriesData, setAccessoriesData] = useState([]);
  useEffect(() => {
    axios.get(`http://${IPADRESS}:5000/products/Accessories`).then((result) => {
      setAccessoriesData(result.data);
    });
  }, []);

  // function to get Garden data length
  let [gardenData, setGardenData] = useState([]);
  useEffect(() => {
    axios.get(`http://${IPADRESS}:5000/products/Garden`).then((result) => {
      setGardenData(result.data);
    });
  }, []);

  //state to store category
  let [category, setCategory] = useState("");
  // function to change the category state and send it as props to products components
  let SendCategory = (category) => {
    setCategory(category);

    navigation.navigate("Products", { category });
  };

  return (
    <>
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        {/* <StatusBar backgroundColor={"white"} barStyle="dark-content" /> */}

        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              padding: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 18,
                      color: COLOURS.black,
                      fontWeight: "500",
                      letterSpacing: 1,
                    }}
                    onPress={() => {
                      SendCategory("Kitchen");
                    }}
                  >
                    kitchen
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLOURS.black,
                    fontWeight: "400",
                    opacity: 0.5,
                    marginLeft: 10,
                  }}
                >
                  {KitchenData.length} Products
                </Text>
              </View>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#F14E24",
                    fontWeight: "400",
                  }}
                  onPress={() => {
                    SendCategory("Kitchen");
                  }}
                >
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            ></View>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity
                onPress={() => {
                  SendCategory("Kitchen");
                }}
              >
                <Image
                  source={{
                    uri: "https://res.cloudinary.com/dn9qfvg2p/image/upload/v1673384114/quattro_4-1170x657_tjv7ca.jpg",
                  }}
                  style={{
                    width: 330,
                    height: 250,
                    top: 1,
                    borderColor: "#1C2765",
                    borderWidth: 2,
                    borderRadius: 20,
                  }}
                />
              </TouchableOpacity>
              <View style={{ width: 10 }}></View>
              <TouchableOpacity
                onPress={() => {
                  SendCategory("Kitchen");
                }}
              >
                <Image
                  source={{
                    uri: "https://res.cloudinary.com/dn9qfvg2p/image/upload/v1673391337/frikha-1170x657_qrga5u.jpg",
                  }}
                  style={{
                    width: 330,
                    height: 250,
                    top: 1,
                    borderColor: "#1C2765",
                    borderWidth: 2,
                    borderRadius: 20,
                  }}
                />
              </TouchableOpacity>
            </ScrollView>
          </View>
          {/* Furniture categorie */}
          <View
            style={{
              padding: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 20,
                      color: COLOURS.black,
                      fontWeight: "500",
                      letterSpacing: 1,
                    }}
                    onPress={() => {
                      SendCategory("Furniture");
                    }}
                  >
                    Furniture
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLOURS.black,
                    fontWeight: "400",
                    opacity: 0.5,
                    marginLeft: 10,
                  }}
                >
                  {furnitureData.length} Products
                </Text>
              </View>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#F14E24",
                    fontWeight: "400",
                  }}
                  onPress={() => {
                    SendCategory("Furniture");
                  }}
                >
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            ></View>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity
                onPress={() => {
                  SendCategory("Furniture");
                }}
              >
                <Image
                  source={{
                    uri: "https://res.cloudinary.com/dn9qfvg2p/image/upload/v1673389221/090122_m_super_furniture_bedroom_1_izwngi.jpg",
                  }}
                  style={{
                    width: 330,
                    height: 250,
                    top: 1,
                    borderColor: "#1C2765",
                    borderWidth: 2,
                    borderRadius: 20,
                  }}
                />
              </TouchableOpacity>
              <View style={{ width: 10 }}></View>
              <TouchableOpacity
                onPress={() => {
                  SendCategory("Furniture");
                }}
              >
                <Image
                  source={{
                    uri: "https://res.cloudinary.com/dn9qfvg2p/image/upload/v1673391185/csm_Website_Vorschaubild_COR_Haus_product_news_2021__13__44d4652b2b_vteght.jpg",
                  }}
                  style={{
                    width: 330,
                    height: 250,
                    top: 1,
                    borderColor: "#1C2765",
                    borderWidth: 2,
                    borderRadius: 20,
                  }}
                />
              </TouchableOpacity>
            </ScrollView>

            {/* </TouchableOpacity> */}
          </View>

          {/*Accessories categorie   */}
          <View
            style={{
              padding: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 20,
                      color: COLOURS.black,
                      fontWeight: "500",
                      letterSpacing: 1,
                    }}
                    onPress={() => {
                      SendCategory("Accessories");
                    }}
                  >
                    Accessories
                  </Text>
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 14,
                    color: COLOURS.black,
                    fontWeight: "400",
                    opacity: 0.5,
                    marginLeft: 10,
                  }}
                >
                  {accessoriesData.length} Products
                </Text>
              </View>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#F14E24",
                    fontWeight: "400",
                  }}
                  onPress={() => {
                    SendCategory("Accessories");
                  }}
                >
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            ></View>
            <View style={{ height: 10 }}></View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity
                onPress={() => {
                  SendCategory("Accessories");
                }}
              >
                <Image
                  source={{
                    uri: "https://res.cloudinary.com/dn9qfvg2p/image/upload/v1673389632/IMG_0176_rolt48.jpg",
                  }}
                  style={{
                    width: 330,
                    height: 250,
                    top: 1,
                    borderColor: "#1C2765",
                    borderWidth: 2,
                    borderRadius: 20,
                  }}
                />
              </TouchableOpacity>
              <View style={{ width: 10 }}></View>
              <TouchableOpacity
                onPress={() => {
                  SendCategory("Accessories");
                }}
              >
                <Image
                  source={{
                    uri: "https://res.cloudinary.com/dn9qfvg2p/image/upload/v1673390679/sugo-guilin-lampscape-purificateur-air-design-led-01_p8lrml.jpg",
                  }}
                  style={{
                    width: 330,
                    height: 250,
                    top: 1,
                    borderColor: "#1C2765",
                    borderWidth: 2,
                    borderRadius: 20,
                  }}
                />
              </TouchableOpacity>
            </ScrollView>

            {/* </TouchableOpacity> */}
          </View>
          {/* Garden categorie*/}
          <View
            style={{
              padding: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 20,
                      color: COLOURS.black,
                      fontWeight: "500",
                      letterSpacing: 1,
                    }}
                    onPress={() => {
                      SendCategory("Garden");
                    }}
                  >
                    Garden
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLOURS.black,
                    fontWeight: "400",
                    opacity: 0.5,
                    marginLeft: 10,
                  }}
                >
                  {gardenData.length} Products
                </Text>
              </View>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#F14E24",
                    fontWeight: "400",
                  }}
                  onPress={() => {
                    SendCategory("Garden");
                  }}
                >
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            ></View>
            <View style={{ height: 10 }}></View>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity
                onPress={() => {
                  SendCategory("Garden");
                }}
              >
                <Image
                  source={{
                    uri: "https://res.cloudinary.com/dn9qfvg2p/image/upload/v1673390071/empty-modern-colorful-rattan-furniture-outdoor-garden-weave-table-set-with-round-table-four-chairs-with-pillows-green-concrete-floor_36367-2813_fhaci8.jpg",
                  }}
                  style={{
                    width: 330,
                    height: 250,
                    top: 1,
                    borderColor: "#1C2765",
                    borderWidth: 2,
                    borderRadius: 20,
                  }}
                />
              </TouchableOpacity>
              <View style={{ width: 10 }}></View>
              <TouchableOpacity
                onPress={() => {
                  SendCategory("Garden");
                }}
              >
                <Image
                  source={{
                    uri: "https://res.cloudinary.com/dn9qfvg2p/image/upload/v1673390338/umbrosa_lnvmfd.jpg",
                  }}
                  style={{
                    width: 330,
                    height: 250,
                    top: 1,
                    borderColor: "#1C2765",
                    borderWidth: 2,
                    borderRadius: 20,
                  }}
                />
              </TouchableOpacity>
            </ScrollView>
            {/* <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Image
                source={{
                  uri: "https://res.cloudinary.com/dn9qfvg2p/image/upload/v1673390071/empty-modern-colorful-rattan-furniture-outdoor-garden-weave-table-set-with-round-table-four-chairs-with-pillows-green-concrete-floor_36367-2813_fhaci8.jpg",
                }}
                style={{
                  width: 330,
                  height: 250,
                  top: 1,
                  borderColor: "#1C2765",
                  borderWidth: 2,
                  borderRadius: 20,
                }}
              />
              <View style={{ width: 10 }}></View>
              <Image
                source={{
                  uri: "https://res.cloudinary.com/dn9qfvg2p/image/upload/v1673390338/umbrosa_lnvmfd.jpg",
                }}
                style={{
                  width: 330,
                  height: 250,
                  top: 1,
                  borderColor: "#1C2765",
                  borderWidth: 2,
                  borderRadius: 20,
                }}
              />
            </ScrollView> */}

            {/* </TouchableOpacity> */}
          </View>
        </ScrollView>
        {/* </ImageBackground> */}
      </View>
      <TabBar navigation={navigation} />
    </>
  );
};

export default Shop;
