import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  View,
  TouchableHighlight,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
// import { useNavigation } from "@react-navigation/native";
import IPADRESS from "../config/IPADRESS";

export default function Products({ route, navigation }) {
  const item = route.params.category;

  //state to store all the product by category
  let [product, setProduct] = useState([]);

  // function to get all product by categories
  useEffect(() => {
    axios.get(`http://${IPADRESS}:5000/products/${item}`).then((result) => {
      setProduct(result.data);
    });
  }, []);

  const renderProducts = ({ item }) => (
    <TouchableOpacity
      // underlayColor="#FFAD62"
      onPress={() => navigation.navigate("ProductInfo", { element: item })}
    >
      {/* { props: item.id_product } */}
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_product }} />
        <Text style={styles.title}>{item.product_name}</Text>
        <Text style={styles.price}>{item.price} dt</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={product}
        renderItem={renderProducts}
      />
    </View>
  );
}

const { width, height } = Dimensions.get("window");
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: RECIPE_ITEM_MARGIN,
    marginTop: 20,
    width:
      (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) /
      recipeNumColums,
    height: RECIPE_ITEM_HEIGHT + 75,
    borderColor: "#cccccc",
    borderWidth: 0.5,
    borderRadius: 15,
  },
  photo: {
    width:
      (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) /
      recipeNumColums,
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    color: "#444444",
    marginTop: 3,
    marginRight: 5,
    marginLeft: 5,
  },
  price: {
    marginTop: 4,
    marginBottom: 20,
  },
});
