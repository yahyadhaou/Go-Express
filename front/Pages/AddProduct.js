import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  ScrollView,
  Permissions,
  LogBox,
  TextInput,
  Dimensions,
} from "react-native";
import {
  Button,
  IconButton,
  Icon,
  Modal,
  Stack,
  FormControl,
  Input,
  Center,
  NativeBaseProvider,
  Text,
  Image,
  useToast,
  Box,
  Select,
  CheckIcon,
  Spinner,
  HStack,
  Heading,
  Label,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import * as Yup from "yup";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import IPADRESS from "../config/IPADRESS";
import { UserContext } from "../UserContext";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebase";
import * as Notification from "expo-notifications";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
Notification.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

const AddProduct = ({ navigation }) => {
  // initializeApp firebase
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  // state for selected name , description , price , quantity , category , image
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("");

  const { userId } = useContext(UserContext);
  const { userCartId } = useContext(UserContext);

  // function to incriment product quantity
  const onMinus = () => {
    setQuantity(Math.max(0, quantity - 1));
  };
  // function to dicriment product quantity
  const onPlus = () => {
    setQuantity(quantity + 1);
  };

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
  let posted_at =
    date +
    " " +
    new Date().getDate() +
    " " +
    "2022" +
    " " +
    new Date().getHours() +
    ":" +
    new Date().getMinutes();

  // function to pick image from device and store it in image variable
  const pickImageOne = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      // setImageOne(result.assets[0].uri);
    }
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", result.assets[0].uri, true);
      xhr.send(null);
    });
    const ref = firebase.storage().ref().child(new Date().toISOString());
    const snapshot = ref.put(blob);
    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploadingOne(true);
      },
      (error) => {
        setUploadingOne(false);
        console.log(error);
        alert(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploadingOne(false);
          console.log("Download URL: ", url);
          setImageOne(url);
          blob.close();
          return url;
        });
      }
    );
  };

  const pickImageTow = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      // setImageTow(result.assets[0].uri);
    }
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", result.assets[0].uri, true);
      xhr.send(null);
    });
    const ref = firebase.storage().ref().child(new Date().toISOString());
    const snapshot = ref.put(blob);
    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploadingTow(true);
      },
      (error) => {
        setUploadingTow(false);
        console.log(error);
        alert(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploadingTow(false);
          console.log("Download URL: ", url);
          setImageTow(url);
          blob.close();
          return url;
        });
      }
    );
  };
  const pickImageThree = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      // setImageThree(result.assets[0].uri);
    }
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", result.assets[0].uri, true);
      xhr.send(null);
    });
    const ref = firebase.storage().ref().child(new Date().toISOString());
    const snapshot = ref.put(blob);
    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploadingThree(true);
      },
      (error) => {
        setUploadingThree(false);
        console.log(error);
        alert(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploadingThree(false);
          console.log("Download URL: ", url);
          setImageThree(url);
          blob.close();
          return url;
        });
      }
    );
  };

  const [imageOne, setImageOne] = useState(null);
  const [imageTow, setImageTow] = useState(null);
  const [imageThree, setImageThree] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [uploadingOne, setUploadingOne] = useState(false);
  const [uploadingTow, setUploadingTow] = useState(false);
  const [uploadingThree, setUploadingThree] = useState(false);

  let addProductDetails = () => {
    if (!name.length || !description.length || !price.length) {
      alert("Please fill all information");
    } else {
      setUploading(true);
      axios
        .post(`http://${IPADRESS}:5000/products/addProduct`, {
          sellIerd: userId,
          buyerId: "Null",
          name: name,
          category: category,
          price: price,
          description: description,
          photo: imageOne,
          quantity: quantity,
          id_user: userId,
          id_cart: userCartId,
          productStatus: "NotAccepted",
          Published_at: posted_at,
        })
        .then((result) => {
          // console.log(result.data.insertId);
          return result.data.insertId;
        })
        .then((id_post) => {
          axios.post(`http://${IPADRESS}:5000/products/addProduct/photo`, {
            photo1: imageOne,
            photo2: imageTow,
            photo3: imageThree,
            idproduct: id_post,
          });
          setUploading(false);
        })
        .then(() => {
          toast.show({
            render: () => {
              return (
                <Box bg="green.500" px="2" py="1" rounded="sm" mb={2}>
                  Your product Sended to admin For confirmation.
                </Box>
              );
            },
          });
        })
        .then(() => {
          navigation.navigate("SideBar");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const ScheduleNotificationHandler = () => {
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Go-Express",
      textBody: `Your product:${name} need confirmation from the admin`,
    });
    Notification.scheduleNotificationAsync({
      content: {
        title: "Go-Express",
        body: `Your product:${name} need confirmation from the admin`,
        data: { userName: "GOExpress" },
      },
      trigger: {
        seconds: 0,
      },
    });
  };

  const toast = useToast();
  const { height } = Dimensions.get("screen");
  return (
    <>
      <ScrollView>
        <View style={{ height: height }}>
          <Formik
            initialValues={{
              name: "",
              description: "",
              price: "",
              image: "",
              quantity: 1,
              category: "",
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required(""),
              description: Yup.string().required(""),
              price: Yup.number().required("Price is required"),
            })}
          >
            {/* {formik} */}
            {({ errors, touched, handleBlur }) => (
              <View style={styles.form}>
                {/*Name  Start */}
                <FormControl>
                  <FormControl.Label fontStyle={{ color: "#373E5A" }}>
                    <Text
                      style={{
                        color: "#ED5C00",
                        fontSize: 20,
                        left: "1500%",
                        bottom: -5,
                      }}
                    >
                      *
                    </Text>
                    Product Name
                  </FormControl.Label>

                  <Input
                    _focus={{ borderColor: "#ED5C00" }}
                    placeholder="Product Name"
                    backgroundColor={"muted.100"}
                    borderColor={"muted.200"}
                    fontSize={"15"}
                    onChangeText={(text) => setName(text)}
                  />
                </FormControl>
                {/*Name  End */}

                {/*Description  Start */}
                <FormControl>
                  <FormControl.Label fontStyle={{ color: "#373E5A" }}>
                    <Text
                      style={{
                        color: "#ED5C00",
                        fontSize: 20,
                        left: "1500%",
                        bottom: -5,
                      }}
                    >
                      *
                    </Text>
                    Product Description
                  </FormControl.Label>
                  <Input
                    _focus={{ borderColor: "#ED5C00" }}
                    placeholder="Product Description"
                    backgroundColor={"muted.100"}
                    borderColor={"muted.200"}
                    fontSize={"15"}
                    onChangeText={(text) => setDescription(text)}
                  />
                </FormControl>
                {/*Description  End */}
                {/*Price  Start */}
                <FormControl>
                  <FormControl.Label fontStyle={{ color: "#373E5A" }}>
                    <Text
                      style={{
                        color: "#ED5C00",
                        fontSize: 20,
                        left: "1500%",
                        bottom: -5,
                      }}
                    >
                      *
                    </Text>
                    Unit Price
                  </FormControl.Label>
                  <Input
                    _focus={{ borderColor: "#ED5C00" }}
                    placeholder="Product Price"
                    backgroundColor={"muted.100"}
                    borderColor={"muted.200"}
                    fontSize={"15"}
                    onChangeText={(number) => setPrice(number)}
                  />
                </FormControl>
                {/*Price  End */}
                {/*Category  Start */}
                <FormControl>
                  <FormControl.Label fontStyle={{ color: "#373E5A" }}>
                    <Text
                      style={{
                        color: "#ED5C00",
                        fontSize: 20,
                        left: "1500%",
                        bottom: -5,
                      }}
                    >
                      *
                    </Text>
                    Choose Category
                  </FormControl.Label>
                  <Box maxW="600">
                    <Select
                      selectedValue={category}
                      minWidth="200"
                      accessibilityLabel=""
                      placeholder="Category"
                      _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />,
                      }}
                      mt={1}
                      onValueChange={(value) => setCategory(value)}
                    >
                      <Select.Item label="Kitchen" value="Kitchen" />
                      <Select.Item label="Furniture" value="Furniture" />
                      <Select.Item label="Garden" value="Garden" />
                      <Select.Item label="Accessories" value="Accessories" />
                    </Select>
                  </Box>
                </FormControl>
                {/*Category  End */}
                {/*Quantity  Start */}
                <Text style={styles.label}>Quantity:</Text>
                <View style={styles.quantityContainer}>
                  <Pressable onPress={onMinus} style={styles.quantityButton}>
                    <Text style={styles.quantityInput}>-</Text>
                  </Pressable>
                  <Text>{quantity}</Text>

                  <Pressable onPress={onPlus} style={styles.quantityButton}>
                    <Text style={styles.quantityInput}>+</Text>
                  </Pressable>
                </View>
                {/* Quantity  End */}
                <View>
                  <Text style={styles.Price_label}>
                    Total Price : {price * quantity} dt{" "}
                  </Text>
                </View>
                {/*Image  start */}
                <FormControl>
                  <FormControl.Label>Image One</FormControl.Label>

                  {!uploadingOne ? (
                    <Button backgroundColor={"#373E5A"} onPress={pickImageOne}>
                      Pick Image 1
                    </Button>
                  ) : (
                    <HStack space={2} justifyContent="center">
                      <Spinner
                        accessibilityLabel="Loading posts"
                        color="#ED5C00"
                      />
                      <Heading color="#ED5C00" fontSize="md">
                        Loading
                      </Heading>
                    </HStack>
                  )}
                </FormControl>
                <FormControl>
                  <FormControl.Label>Image Tow </FormControl.Label>
                  {!uploadingTow ? (
                    <Button backgroundColor={"#373E5A"} onPress={pickImageTow}>
                      Pick Image 2
                    </Button>
                  ) : (
                    <HStack space={2} justifyContent="center">
                      <Spinner
                        accessibilityLabel="Loading posts"
                        color="#ED5C00"
                      />
                      <Heading color="#ED5C00" fontSize="md">
                        Loading
                      </Heading>
                    </HStack>
                  )}
                </FormControl>

                <FormControl>
                  <FormControl.Label>Image Three</FormControl.Label>
                  {!uploadingThree ? (
                    <Button
                      backgroundColor={"#373E5A"}
                      onPress={pickImageThree}
                    >
                      Pick Image 3
                    </Button>
                  ) : (
                    <HStack space={2} justifyContent="center">
                      <Spinner
                        accessibilityLabel="Loading posts"
                        color="#ED5C00"
                      />
                      <Heading color="#ED5C00" fontSize="md">
                        Loading
                      </Heading>
                    </HStack>
                  )}
                </FormControl>
                {/*Image  End */}
                {/*Button Add  Start */}
                <TouchableOpacity>
                  <View>
                    {!uploading ? (
                      <Button
                        style={styles.button}
                        backgroundColor={"#F14E24"}
                        onPress={() => {
                          addProductDetails();
                        }}
                      >
                        Save
                      </Button>
                    ) : (
                      <HStack space={2} justifyContent="center">
                        <Spinner
                          accessibilityLabel="Loading posts"
                          color="#ED5C00"
                        />
                        <Heading color="#373E5A" fontSize="md">
                          Loading
                        </Heading>
                      </HStack>
                    )}
                  </View>
                </TouchableOpacity>
                {/*Button Add  End */}
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // height: "100%",
    justifyContent: "center",
  },
  form: {
    flex: 1,
    // width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // marginTop: 10,
  },

  form_image: {
    width: "80%",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 130,
    alignSelf: "center",
  },

  image: {
    marginLeft: 20,
    marginTop: 15,
    width: "80%",
    height: "110%",
  },

  label: {
    fontSize: 15,
    marginBottom: 1,
  },

  Price_label: {
    fontSize: 15,
    alignItems: "center",
    flexDirection: "row",
  },

  input: {
    height: 35,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
  },

  inputDescription: {
    height: 70,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
  },

  error: {
    color: "red",
    marginTop: -10,
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#e3e3e3",
    width: 110,
    marginBottom: 20,
    marginTop: 20,
  },
  quantityButton: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F14E24",
  },
  quantityInput: {
    fontSize: 18,
  },
  button: {
    alignItems: "center",
    marginTop: 30,
    Color: "#ED5C00",
  },
  buttonText: {
    color: "white",
    marginLeft: 10,
    textAlign: "center",
  },
  screen: {},

  picker: {
    marginTop: -10,
    fontSize: 16,
  },
});

export default AddProduct;
