import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
  StatusBar
} from "react-native";
import { Box, Center, HStack, Checkbox } from "native-base";
import EditeAdress from "front/Pages/EditeAdress.js";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLOURS, Items } from "../database/Database";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const MyCart = ({ navigation }) => {
  
  const [product, setProduct] = useState();
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  //get data from local DB by ID
  const getDataFromDB = async () => {
    let items = await AsyncStorage.getItem("cartItems");
    items = JSON.parse(items);
    let productData = [];
    if (items) {
      Items.forEach((data) => {
        if (items.includes(data.id)) {
          productData.push(data);
          return;
        }
      });
      setProduct(productData);
      getTotal(productData);
    } else {
      setProduct(false);
      getTotal(false);
    }
  };

  //get total price of all items in the cart
  const getTotal = (productData) => {
    let total = 0;
    for (let index = 0; index < productData.length; index++) {
      let productPrice = productData[index].productPrice;
      total = total + productPrice;
    }
    setTotal(total);
  };

  //remove data from Cart

  const removeItemFromCart = async (id) => {
    let itemArray = await AsyncStorage.getItem("cartItems");
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      for (let index = 0; index < array.length; index++) {
        if (array[index] == id) {
          array.splice(index, 1);
        }

        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        getDataFromDB();
      }
    }
  };

  //checkout

  const checkOut = async () => {
    try {
      await AsyncStorage.removeItem("cartItems");
    } catch (error) {
      return error;
    }

    ToastAndroid.show("Items will be Deliverd SOON!", ToastAndroid.SHORT);

    navigation.navigate("Shop");
  };

  const renderProducts = (data, index) => {
    return (
      
      <TouchableOpacity
        key={data.key}
        onPress={() =>
          navigation.navigate("ProductInfo", { productID: data.id })
        }
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
            borderColor:"#1C2765",
            borderWidth:2
          }}
        >
          <StatusBar backgroundColor={"white"} barStyle="dark-content" />
          <Image
            source={data.productImage}
            style={{
              width: "100%",
              height: "100%",
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
              Product Name
              {/* {data.productName} */}
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
                 Product Price 
                {/* {data.productPrice} */}
              </Text>
              
              <Text>
                (
                {data.productPrice + data.productPrice / 20})
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
                marginTop:10
              }}
            >
            </View>
            <TouchableOpacity onPress={() => removeItemFromCart(data.id)}>
              <MaterialCommunityIcons
                name="delete-outline"
                style={{
                  fontSize: 20,
                  color: "#ED5C00",
                  backgroundColor: COLOURS.backgroundLight,
                  padding: 8,
                  borderRadius: 100,
                 
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
     );
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: "white",
        position: 'relative',
      }}>
        <StatusBar backgroundColor={"white"} barStyle="dark-content" />
      <ScrollView>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingTop: 16,
            paddingHorizontal: 16,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="chevron-left"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundDark,
                padding: 12,
                backgroundColor: COLOURS.backgroundLight,
                borderRadius: 12,
              }}
            />
          </TouchableOpacity> */}
          <Text
            style={{
              fontSize: 24,
              color: COLOURS.black,
              fontWeight: '600',
              marginBottom: 10,
              paddingLeft: 90,
            }}>
            Order Details
          </Text>
          <View></View>
        </View>
        <Text
          style={{
            fontSize: 18,
            color: COLOURS.black,
            fontWeight: '500',
            letterSpacing: 1,
            paddingTop: 20,
            paddingLeft: 16,
            marginBottom: 10,
          }}>
          My Orders
        </Text>
        <View style={{paddingHorizontal: 16}}>
          {/* orders that i add   */}
          {product ? product.map(renderProducts) : null}
        </View>
        <View>
        <HStack>
          <View
            style={{
              paddingHorizontal: 16,
              marginVertical: 10,
            }}
          >
            <Box></Box>
            <Text
              style={{
                fontSize: 16,
                color: COLOURS.black,
                fontWeight: "500",
                letterSpacing: 1,
                marginBottom: 20,
              }}
            >
              Delivery Location
            </Text>
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
                  width: "80%",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    color: COLOURS.blue,
                    backgroundColor: COLOURS.backgroundLight,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 12,
                    borderRadius: 10,
                    marginRight: 18,
                    borderColor:"#1C2765",
                    borderWidth:1
                  }}
                >
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    style={{
                      fontSize: 20,
                      color: "#373E5A",
                    }}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: COLOURS.black,
                      fontWeight: "500",
                    }}
                  >
                    User Adress
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: COLOURS.black,
                      fontWeight: "400",
                      lineHeight: 20,
                      opacity: 0.5,
                    }}
                  >
                    User Ville
                  </Text>
                </View>
                <EditeAdress />
              </View>
            </View>
          </View>
        </HStack>
        {/* Payment Method */}
        <View
          style={{
            paddingHorizontal: 16,
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: COLOURS.black,
              fontWeight: "500",
              letterSpacing: 1,
              marginBottom: 20,
            }}
          >
            Payment Method
          </Text>
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
                width: "80%",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  color: COLOURS.blue,
                  backgroundColor: COLOURS.backgroundLight,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 12,
                  borderRadius: 10,
                  marginRight: 18,
                  borderColor:"#1C2765",
                    borderWidth:1
                }}
              >
                <Text
                  style={{
                    fontSize: 9,
                    fontWeight: "900",
                    color: "#373E5A",
                    letterSpacing: 1,
                  }}
                >
                  VISA
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLOURS.black,
                    fontWeight: "500",
                  }}
                >
                  Visa Classic
                </Text>
                {/* <Text
                  style={{
                    fontSize: 12,
                    color: COLOURS.black,
                    fontWeight: '400',
                    lineHeight: 20,
                    opacity: 0.5,
                  }}>
                  ****-9092
                </Text> */}
              </View>
            </View>
            <HStack space={6}>
              <Checkbox
                value="orange"
                colorScheme="orange"
                accessibilityLabel="This is a dummy checkbox"
              />
            </HStack>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            marginVertical: 10,
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
                width: "80%",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  color: COLOURS.blue,
                  backgroundColor: COLOURS.backgroundLight,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 12,
                  borderRadius: 10,
                  marginRight: 18,
                  borderColor:"#1C2765",
                    borderWidth:1
                }}
              >
                <FontAwesome5 name="money-bill" size={19} color="#373E5A" />
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLOURS.black,
                    fontWeight: "500",
                  }}
                >
                  Pay Cash
                </Text>
                {/* <Text
                  style={{
                    fontSize: 12,
                    color: COLOURS.black,
                    fontWeight: '400',
                    lineHeight: 20,
                    opacity: 0.5,
                  }}>
                  ****-9092
                </Text> */}
              </View>
            </View>
            <HStack space={6}>
              <Checkbox
                value="orange"
                colorScheme="orange"
                accessibilityLabel="This is a dummy checkbox"
              />
            </HStack>
          </View>
        </View>
        {/* total prise */}
        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 40,
            marginBottom: 80,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: COLOURS.black,
              fontWeight: "500",
              letterSpacing: 1,
              marginBottom: 20,
            }}
          >
            Order Info
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                maxWidth: "80%",
                color: COLOURS.black,
                opacity: 0.5,
              }}
            >
              Subtotal
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: COLOURS.black,
                opacity: 0.8,
              }}
            >
              {total}.00dt
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 22,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                maxWidth: "80%",
                color: COLOURS.black,
                opacity: 0.5,
              }}
            >
              Shipping Tax
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: COLOURS.black,
                opacity: 0.8,
              }}
            >
              {total / 20}
              dt
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                maxWidth: "80%",
                color: COLOURS.black,
                opacity: 0.5,
              }}
            >
              Total
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                color: COLOURS.black,
              }}
            >
              {total + total / 20}
              dt
            </Text>
          </View>
        </View>
      </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 10,
          height: '8%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => (total != 0 ? checkOut() : null)}
          style={{
            width: '86%',
            height: '90%',
            backgroundColor: "#ED5C00",
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              letterSpacing: 1,
              color: "white",
              textTransform: 'uppercase',
            }}>
            CHECKOUT ({total + total / 20} )
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
};

export default MyCart;
