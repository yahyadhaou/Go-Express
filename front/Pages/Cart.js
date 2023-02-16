import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
  StatusBar,
} from "react-native";
import { Box, HStack, Checkbox, useToast, Radio, ListItem } from "native-base";
import EditeAdress from "./EditeAdress.js";
import { FontAwesome5 } from "@expo/vector-icons";
import { COLOURS, Items } from "../database/Database";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { UserContext } from "../UserContext";
import IPADRESS from "../config/IPADRESS";
import { async } from "@firebase/util";

const MyCart = ({ navigation }) => {
  const { userId } = useContext(UserContext);
  const { userCartId } = useContext(UserContext);
  const toast = useToast();

  // to get the instant time
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = month[new Date().getMonth()];
  let checkout_at =
    date +
    " " +
    new Date().getDate() +
    " " +
    "2022" +
    " " +
    new Date().getHours() +
    ":" +
    new Date().getMinutes();

  // state to save products in the cart
  const [cartProducts, setCartProducts] = useState([]);
  const [cartService, setCartService] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(6);

  // i invoked inside  useeffect to automaticaly change
  useEffect(() => {
    const fetchData = () => {
      getAllProducts();
      getReservation();
    };
    // alert(userCartId);
    fetchData();
  }, []);

  // get all product in the cart
  const getAllProducts = async () => {
    const { data } = await axios.get(
      `http://${IPADRESS}:5000/carts/getCartProduct/${userCartId}`
    );
    setCartProducts(data);
    getTotalePrice(data);
  };

  const getReservation = async () => {
    const { data } = await axios.get(
      `http://${IPADRESS}:5000/carts/getReservation/${userCartId}`
    );
    setCartService(data);
    getTotalePrice(data);
    console.log("data-------->", data);
  };

  // function to calculate the sum
  const getTotalePrice = (data) => {
    let sum = 0;
    data.map((element) => {
      sum = sum + element.price;
    });
    setTotalPrice(sum);
  };

  //delete data from database

  const DeleteProductFromCart = (idproduct) => {
    axios
      .delete(`http://${IPADRESS}:5000/carts/deleteProduct/${idproduct}`)
      .then(async () => {
        console.log("deleted");
        await getAllProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteReservation = (idCart, idReservation) => {
    axios
      .delete(`http://${IPADRESS}:5000/carts/deleteReservation`, {
        idCart: idCart,
        idReservation: idReservation,
      })
      .then(() => {
        console.log("Service deleted " + idCart + " " + idReservation);
        getReservation();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // state to save user data
  const [userDataProfile, setUserDataProfile] = useState([]);
  // function to get user information
  useEffect(() => {
    axios
      .get(`http://${IPADRESS}:5000/users/getUserPorfile/${userId}`)
      .then((response) => {
        setUserDataProfile(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, [userDataProfile]);

  //change the status of cart to note done to done  (payment)
  let ChangeCartStatus = () => {
    if (cartProducts.length === 0) {
      return toast.show({
        render: () => {
          return (
            <Box bg="gray.500" px="5" py="1" rounded="sm" mb={7}>
              You don't have Product anything in your cart.
            </Box>
          );
        },
      });
    } else {
      axios
        .put(`http://${IPADRESS}:5000/carts/updateStateToDone/${userCartId}`, {
          date: checkout_at,
        })
        .then(() => {
          // axios.delete(`http://${IPADRESS}:5000/carts/deleteALL/${userCartId}`);
          axios.post(`http://${IPADRESS}:5000/carts/addCart`, {
            payment_type: "Cash",
            date: "Null",
            id_user: userId,
            state: "not done",
          });
          // alert(userCartId);
          navigation.navigate("Home");
        })
        .then(() => {
          setCartProducts(null);
          setTotalPrice(0);
        })
        .then(() => {
          toast.show({
            render: () => {
              return (
                <Box bg="green.500" px="5" py="1" rounded="sm" mb={7}>
                  Congratulations you will receive this as soon as possible, we
                  will get in touch with you.
                </Box>
              );
            },
          });
        })

        .catch((error) => {
          alert(error);
        });
    }
  };
  const renderProducts = (data, index) => {
    return (
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
            source={{ uri: data.photo_product }}
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
              {data.product_name}
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
                {data.price} dt
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
                {data.quantity} Units
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

            <TouchableOpacity>
              <MaterialCommunityIcons
                onPress={() => DeleteProductFromCart(data.id_product)}
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

  const renderService = (data, index) => {
    return (
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
          {data.name === "Cleaning" ? (
            <Image
              source={{
                uri: `https://www.cleaningservicespetalingjaya.com/wp-content/uploads/2022/08/house-cleaning-pj.jpg`,
              }}
              style={{
                width: "130%",

                height: "120%",
                resizeMode: "contain",
              }}
            />
          ) : data.name === "Moving" ? (
            <Image
              source={{
                uri: `https://media.istockphoto.com/id/1142849991/vector/moving-truck-and-moving-boxes-outdoors-removal.jpg?s=612x612&w=0&k=20&c=0dUSaNY38rXzoDQWh1IAKDivf9iQH0x0-Vh3NXPqv1Y=`,
              }}
              style={{
                width: "130%",

                height: "120%",
                resizeMode: "contain",
              }}
            />
          ) : data.name === "plumbing" ? (
            <Image
              source={{
                uri: `https://thewaterworks.com/wp-content/uploads/2018/04/Residential-Plumbing-Service.jpg`,
              }}
              style={{
                width: "130%",

                height: "120%",
                resizeMode: "contain",
              }}
            />
          ) : (
            <Image
              source={{
                uri: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsuuQFS7H_5dXYM4oCFkePtWgyuws0m4n52YT6dFDUA-oW188jIlNtM-RipOE6M68I9Ro&usqp=CAU`,
              }}
              style={{
                width: "130%",

                height: "120%",
                resizeMode: "contain",
              }}
            />
          )}
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
              {data.name}
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
                {data.price} Dt
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
                {data.time.substring(0, 5)}
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

            <TouchableOpacity>
              <MaterialCommunityIcons
                onPress={() =>
                  deleteReservation(data.cart_id_cart, data.id_reservation)
                }
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

  const renderUser = (data, index) => {
    return (
      <View>
        <Text
          style={{
            fontSize: 14,
            color: COLOURS.black,
            fontWeight: "500",
          }}
        >
          {data.ville}
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
          {data.adress}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        position: "relative",
      }}
    >
      <StatusBar backgroundColor={"white"} barStyle="dark-content" />
      <ScrollView>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            paddingTop: 16,
            paddingHorizontal: 16,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              color: COLOURS.black,
              fontWeight: "600",
              marginBottom: 10,
              paddingLeft: 90,
            }}
          >
            Order Details
          </Text>
          <View></View>
        </View>
        <Text
          style={{
            fontSize: 18,
            color: COLOURS.black,
            fontWeight: "500",
            letterSpacing: 1,
            paddingTop: 20,
            paddingLeft: 16,
            marginBottom: 10,
          }}
        >
          My Orders
        </Text>
        <View style={{ paddingHorizontal: 16 }}>
          {/* orders that i add   */}
          {cartService ? cartService.map(renderService) : null}
          {cartProducts ? (
            cartProducts.map(renderProducts)
          ) : (
            <Text> No products</Text>
          )}
        </View>
        <View>
          <HStack>
            <View
              style={{
                paddingHorizontal: 16,
                marginVertical: 1,
                marginBottom: -15,
              }}
            >
              <Text
                style={{
                  color: "#ED5C00",
                  fontSize: 20,
                  left: "45%",
                  bottom: -30,
                }}
              >
                *
              </Text>
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
                      borderColor: "#1C2765",
                      borderWidth: 1,
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
                    {userDataProfile ? (
                      userDataProfile.map(renderUser)
                    ) : (
                      <Text> </Text>
                    )}
                  </View>
                </View>
                <EditeAdress />
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
                color: "#ED5C00",
                fontSize: 20,
                left: "45%",
                bottom: -30,
              }}
            >
              *
            </Text>
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
                    borderColor: "#1C2765",
                    borderWidth: 1,
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
                    borderColor: "#1C2765",
                    borderWidth: 1,
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
                {shippingPrice} dt
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
                {totalPrice + shippingPrice}dt
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 10,
          height: "8%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            ChangeCartStatus();
          }}
          style={{
            width: "86%",
            height: "90%",
            backgroundColor: "#ED5C00",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "500",
              letterSpacing: 1,
              color: "white",
              textTransform: "uppercase",
            }}
          >
            CHECKOUT ({totalPrice + 6} dt)
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyCart;
