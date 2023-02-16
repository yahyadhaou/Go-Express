import { useState, useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import React, { useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  IconButton,
  Icon,
  Button,
  Modal,
  Stack,
  FormControl,
  Input,
  Center,
  Spinner,
  Text,
  Image,
  HStack,
  Heading,
  useToast,
  Box,
} from "native-base";
import axios from "axios";

import IPADRESS from "../config/IPADRESS";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../UserContext";
import firebaseConfig from "../config/firebase";

export default function EditeProfil() {
  const navigation = useNavigation();
  const toast = useToast();
  const [uploading, setUploading] = useState(false);

  const [placement, setPlacement] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [ville, setVille] = useState("");
  const [adress, setAdress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [urlImage, setUrlImage] = useState("");

  const { userId } = useContext(UserContext);

  const openModal = (placement) => {
    setOpen(true);
    setPlacement(placement);
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
          setUrlImage(url);
          blob.close();
          return url;
        });
      }
    );
  };

  console.log("hethi image", image);
  console.log("hethi url", urlImage);

  const saveUpdate = () => {
    axios
      .put(`http://${IPADRESS}:5000/users/updateUser/${userId}`, {
        photo: urlImage,
        name: name,
        ville: ville,
        adress: adress,
        phoneNumber: phoneNumber,
      })
      .then(() => {
        toast.show({
          render: () => {
            return (
              <Box bg="green.500" px="5" py="1" rounded="sm" mb={7}>
                Your Profile Updated
              </Box>
            );
          },
        });
      })
      .then(() => {
        setOpen(false);
        navigation.navigate("Profil");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <>
      <Stack
        direction={{
          base: "column",
          md: "row",
        }}
        marginLeft={270}
      >
        <IconButton
          icon={
            <MaterialCommunityIcons size={25} color={"#F14E24"} name="pencil" />
          }
          onPress={() => openModal("right")}
        >
          Right
        </IconButton>
      </Stack>
      <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
        <Modal.Content
          maxWidth="380"
          backgroundColor={"muted.50"}
          opacity={2}
          {...styles[placement]}
        >
          <Modal.CloseButton />
          <Modal.Header>
            <Center>
              <Text color={"#F14E24"} bold fontSize={"20"}>
                Personal Information
              </Text>
            </Center>
          </Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Image</FormControl.Label>

              {!uploading ? (
                <Button backgroundColor={"#373E5A"} onPress={PickImage}>
                  Pick image
                </Button>
              ) : (
                <HStack space={2} justifyContent="center">
                  <Spinner accessibilityLabel="Loading posts" color="#ED5C00" />
                  <Heading color="#ED5C00" fontSize="md">
                    Loading
                  </Heading>
                </HStack>
              )}

              {image && <Image source={{ uri: image }} />}
            </FormControl>
            <FormControl>
              <FormControl.Label fontStyle={{ color: "#373E5A" }}>
                <Text
                  style={{
                    color: "#ED5C00",
                    fontSize: 20,
                    left: "1100%",
                    bottom: -5,
                  }}
                >
                  *
                </Text>
                Name
              </FormControl.Label>
              <Input
                backgroundColor={"muted.100"}
                borderColor={"muted.200"}
                _focus={{ borderColor: "#ED5C00" }}
                placeholder="Your name here"
                fontSize={"15"}
                onChangeText={(changed) => {
                  setName(changed);
                }}
              />
            </FormControl>
            <FormControl>
              <FormControl>
                <FormControl.Label>
                  <Text
                    style={{
                      color: "#ED5C00",
                      fontSize: 20,
                      left: "1100%",
                      bottom: -5,
                    }}
                  >
                    *
                  </Text>
                  ville
                </FormControl.Label>
                <Input
                  backgroundColor={"muted.100"}
                  borderColor={"muted.200"}
                  _focus={{ borderColor: "#ED5C00" }}
                  placeholder="Your state here"
                  fontSize={"15"}
                  onChangeText={(changed) => {
                    setVille(changed);
                  }}
                />
              </FormControl>
              <FormControl.Label>
                <Text
                  style={{
                    color: "#ED5C00",
                    fontSize: 20,
                    left: "1100%",
                    bottom: -5,
                  }}
                >
                  *
                </Text>
                Adress
              </FormControl.Label>
              <Input
                backgroundColor={"muted.100"}
                borderColor={"muted.200"}
                _focus={{ borderColor: "#ED5C00" }}
                placeholder="Your adress here"
                fontSize={"15"}
                onChangeText={(changed) => {
                  setAdress(changed);
                }}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>
                <Text
                  style={{
                    color: "#ED5C00",
                    fontSize: 20,
                    left: "1100%",
                    bottom: -5,
                  }}
                >
                  *
                </Text>
                Phone number{" "}
              </FormControl.Label>
              <Input
                backgroundColor={"muted.100"}
                borderColor={"muted.200"}
                _focus={{ borderColor: "#ED5C00" }}
                placeholder="Your phonr number here"
                fontSize={"15"}
                onChangeText={(changed) => {
                  setPhoneNumber(changed);
                }}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                backgroundColor={"#F14E24"}
                onPress={() => {
                  saveUpdate();
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}

const styles = {
  top: {
    marginBottom: "auto",
    marginTop: 0,
  },
  bottom: {
    marginBottom: 0,
    marginTop: "auto",
  },
  left: {
    marginLeft: 0,
    marginRight: "auto",
  },
  right: {},
  center: {},
};
