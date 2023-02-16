import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";

import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Animated,
  ToastAndroid,
} from "react-native";
import { COLOURS, Items } from "../database/Database";
import Entypo from "react-native-vector-icons/Entypo";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SliderPhoto from "./ImageDetails";
import IPADRESS from "../config/IPADRESS";

const ProductInfo = ({ route, navigation }) => {
  const { userId, setUserId } = useContext(UserContext);
  const { userCartId } = useContext(UserContext);

  const width = Dimensions.get("window").width;
  const scrollX = new Animated.Value(0);
  // selected element sended from products
  const item = route.params.element;

  // console.log("iduser", userId);
  // console.log("id cart", userCartId);
  // console.log("id product", item.id_product);

  const AddProductToCart = (idProduct) => {
    axios
      .post(`http://${IPADRESS}:5000/carts/addProductTocart`, {
        id_product: idProduct,
        id_cart: userCartId,
      })
      .catch((err) => {
        alert("This Product alerdy in the cart ");
      })
      .then(() => {
        navigation.navigate("Cart");
      });
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLOURS.white,
        position: "relative",
      }}
    >
      <StatusBar backgroundColor={"red"} barStyle="dark-content" />
      <ScrollView>
        <SliderPhoto idProduct={route.params.element.id_product} />

        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 6,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 14,
            }}
          >
            <Entypo
              name="shopping-cart"
              style={{
                fontSize: 18,
                color: "#ED5C00",
                marginRight: 6,
              }}
            />
            <Text
              style={{
                fontSize: 12,
                color: COLOURS.black,
              }}
            >
              Shopping
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 4,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                letterSpacing: 0.5,
                marginVertical: 4,
                color: COLOURS.black,
                maxWidth: "84%",
              }}
            >
              {item.product_name}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 12,
              color: COLOURS.black,
              fontWeight: "400",
              letterSpacing: 1,
              opacity: 0.5,
              lineHeight: 20,
              maxWidth: "85%",
              maxHeight: 44,
              marginBottom: 18,
            }}
          >
            {item.description}
          </Text>

          <Text
            style={{
              fontSize: 12,
              color: COLOURS.black,
              fontWeight: "400",
              letterSpacing: 1,
              opacity: 0.5,
              lineHeight: 20,
              maxWidth: "85%",
              maxHeight: 44,
              marginBottom: 18,
            }}
          >
            Quantity:{item.quantity} Unit
          </Text>
          <View
            style={{
              paddingHorizontal: 16,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                maxWidth: "85%",
                color: COLOURS.black,
                marginBottom: 4,
              }}
            >
              Price :{item.price} dt
            </Text>
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
          onPress={() => AddProductToCart(item.id_product)}
          style={{
            width: "86%",
            height: "90%",
            backgroundColor: "#373E5A",
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
              color: COLOURS.white,
              textTransform: "uppercase",
            }}
          >
            Add to cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductInfo;
