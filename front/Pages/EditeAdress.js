import { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  IconButton,
  Icon,
  Button,
  Modal,
  Stack,
  FormControl,
  Input,
  Center,
  Text,
  useToast,
  Box,
} from "native-base";
import axios from "axios";
import IPADRESS from "../config/IPADRESS";

let EditeAdress = () => {
  const [placement, setPlacement] = useState(undefined);
  const [open, setOpen] = useState(false);
  let [ville, setVille] = useState("");
  let [adress, setAdress] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");
  const toast = useToast();

  const { userId } = useContext(UserContext);

  // to update adress and ville before chekout
  let UpdateAdress = () => {
    axios
      .put(`http://${IPADRESS}:5000/users/updateUserAdress/${userId}`, {
        ville: ville,
        adress: adress,
        phoneNumber: phoneNumber,
      })
      .then(() => {
        toast.show({
          render: () => {
            return (
              <Box bg="green.500" px="2" py="1" rounded="sm" mb={6}>
                Your Adress Is Modified Successfully
              </Box>
            );
          },
        });
      })
      .then(() => {
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openModal = (placement) => {
    setOpen(true);
    setPlacement(placement);
  };

  return (
    <>
      <Stack
        direction={{
          base: "column",
          md: "row",
        }}
        marginLeft={8}
      >
        <IconButton
          icon={
            <MaterialCommunityIcons size={20} color={"#F14E24"} name="pencil" />
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
              <Text color={"#F14E24"} bold>
                Adress Information
              </Text>
            </Center>
          </Modal.Header>
          <Modal.Body>
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
                Ville
              </FormControl.Label>
              <Input
                onChangeText={(text) => setVille(text)}
                backgroundColor={"muted.100"}
                borderColor={"muted.200"}
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
                Adress
              </FormControl.Label>
              <Input
                onChangeText={(text) => setAdress(text)}
                backgroundColor={"muted.100"}
                borderColor={"muted.200"}
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
                Phone number
              </FormControl.Label>
              <Input
                onChangeText={(text) => setPhoneNumber(text)}
                backgroundColor={"muted.100"}
                borderColor={"muted.200"}
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
                onPress={() => {
                  UpdateAdress();
                }}
                backgroundColor={"#F14E24"}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

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
  right: 10,
  center: {},
};

export default EditeAdress;
