import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  ScrollView,
  Permissions,
  LogBox,
  Dimensions,
} from "react-native";
import {
  Button,
  FormControl,
  Input,
  Text,
  useToast,
  Box,
  Select,
  CheckIcon,
  Radio,
  Spinner,
  HStack,
  Heading,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import * as Yup from "yup";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import IPADRESS from "../config/IPADRESS";
import { UserContext } from "../UserContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { initializeApp } from "firebase/app";

const Join_Us = ({ navigation }) => {
  const toast = useToast();
  const { height, width } = Dimensions.get("screen");

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  // state for  firt name , last name , phone number , adress , work position , gender , photo
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [adress, setAdress] = useState("");
  const [work_position, setWork_position] = useState("");
  const [gender, setGender] = React.useState("Male");
  const [image, setImage] = useState(null);
  // state for uploading
  const [uploading, setUploading] = useState(false);

  // function to pick image from device and store it in image variable
  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      // setImage(result.assets[0].uri);
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
        setUploading(true);
      },
      (error) => {
        setUploading(false);
        console.log(error);
        alert(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false);
          console.log("Download URL: ", url);
          setImage(url);
          blob.close();
          return url;
        });
      }
    );
  };

  let addEmployer = () => {
    if (!first_name.length || !last_name.length || !adress.length) {
      alert("Please fill all information");
    } else if (phone_number.length < 8 || phone_number.length > 8) {
      alert("Your phone number must containe 8 numbers");
    } else {
      axios
        .post(`http://${IPADRESS}:5000/Employers/addEmployer`, {
          first_name: first_name,
          gender: gender,
          adress: adress,
          photo: image,
          phone_number: phone_number,
          work_position: work_position,
          last_name: last_name,
          serves_id_serves: 1,
        })
        .then(() => {
          toast.show({
            render: () => {
              return (
                <Box bg="green.500" px="2" py="1" rounded="sm" mb={2}>
                  Your request has been successfully submitted and will be
                  processed shortly and you will be contacted by one of our
                  officials.
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
  return (
    <>
      <ScrollView>
        <View style={{ height: height }}>
          <Formik
            initialValues={{
              firstname: "",
              lasttname: "",
              phoneNumber: "",
              adress: "",
              image: "",
              workPosition: "",
              gender: "",
            }}
            validationSchema={Yup.object().shape({
              firstname: Yup.string().required("Required Field"),
              lasttname: Yup.string().required("Required Field"),
              phoneNumber: Yup.string().required("Required Field"),
              adress: Yup.string().required("Required Field"),
              image: Yup.string().required("Required Field"),
              workPosition: Yup.string().required("Required Field"),
              gender: Yup.string().required("Required Field"),
            })}
          >
            {({ errors, touched, handleBlur }) => (
              <View style={styles.form}>
                {/*First Name */}
                <FormControl>
                  <FormControl.Label fontStyle={{ color: "#373E5A" }}>
                    First Name
                  </FormControl.Label>
                  <Input
                    _focus={{ borderColor: "#ED5C00" }}
                    placeholder="First Name"
                    backgroundColor={"muted.100"}
                    borderColor={"muted.200"}
                    fontSize={"15"}
                    onChangeText={(text) => setFirst_name(text)}
                  />
                </FormControl>
                {/*Last Name*/}
                <FormControl>
                  <FormControl.Label fontStyle={{ color: "#373E5A" }}>
                    Last Name
                  </FormControl.Label>
                  <Input
                    _focus={{ borderColor: "#ED5C00" }}
                    placeholder="Last Name"
                    backgroundColor={"muted.100"}
                    borderColor={"muted.200"}
                    fontSize={"15"}
                    onChangeText={(text) => setLast_name(text)}
                  />
                </FormControl>
                {/*Phone Number */}
                <FormControl>
                  <FormControl.Label fontStyle={{ color: "#373E5A" }}>
                    Phone Number
                  </FormControl.Label>
                  <Input
                    _focus={{ borderColor: "#ED5C00" }}
                    placeholder="Phone Number"
                    backgroundColor={"muted.100"}
                    borderColor={"muted.200"}
                    fontSize={"15"}
                    maxlength={"8"}
                    onChangeText={(text) => setPhone_number(text)}
                  />
                </FormControl>
                {/*Adress */}
                <FormControl>
                  <FormControl.Label fontStyle={{ color: "#373E5A" }}>
                    Adress
                  </FormControl.Label>
                  <Input
                    _focus={{ borderColor: "#ED5C00" }}
                    placeholder="Adress"
                    backgroundColor={"muted.100"}
                    borderColor={"muted.200"}
                    fontSize={"15"}
                    onChangeText={(text) => setAdress(text)}
                  />
                </FormControl>
                {/*work position */}
                <FormControl>
                  <FormControl.Label fontStyle={{ color: "#373E5A" }}>
                    Choose work position
                  </FormControl.Label>
                  <Box maxW="600">
                    <Select
                      selectedValue={work_position}
                      minWidth="200"
                      accessibilityLabel="work position"
                      placeholder="work position"
                      _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />,
                      }}
                      mt={1}
                      onValueChange={(itemValue) => setWork_position(itemValue)}
                    >
                      <Select.Item label="Householder" value="householder" />
                      <Select.Item label="Electrician" value="electrician" />
                      <Select.Item label="Plumber" value="plumber" />
                      <Select.Item label="Truck Driver" value="truck driver" />
                      <Select.Item
                        label="Delivery Agents"
                        value="delivery agents"
                      />
                    </Select>
                  </Box>
                </FormControl>
                {/* Gender */}
                <FormControl>
                  <FormControl.Label fontStyle={{ color: "#373E5A" }}>
                    Choose your Gender
                  </FormControl.Label>
                  <Radio.Group
                    name="myRadioGroup"
                    value={gender}
                    onChange={(nextValue) => {
                      setGender(nextValue);
                    }}
                  >
                    <Radio value="Male" my="1">
                      Male
                    </Radio>
                    <Radio value="Female" my="1">
                      Female
                    </Radio>
                  </Radio.Group>
                </FormControl>
                {/* Image */}
                <FormControl>
                  <FormControl.Label>Your Image</FormControl.Label>

                  {!uploading ? (
                    <Button backgroundColor={"#373E5A"} onPress={PickImage}>
                      Pick your image
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
                {/*Button Add  Start */}
                <TouchableOpacity>
                  <View>
                    <Button
                      style={styles.button}
                      backgroundColor={"#F14E24"}
                      onPress={() => {
                        addEmployer();
                      }}
                    >
                      Save
                    </Button>
                  </View>
                </TouchableOpacity>
                {/*Button Add  End */}
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
      {/* <TabBar navigation={navigation} /> */}

      {/* save bottun 2 */}
      {/* 
      <Button
        backgroundColor={"#F14E24"}
        onPress={() => {
          saveUpdate();
        }}
      >
        Save
      </Button> */}
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

export default Join_Us;
