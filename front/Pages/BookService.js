import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { DatePickerAndroid } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect, useContext } from "react";

import DateTimePicker from "react-native-modal-datetime-picker";

import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { UserContext } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import IPADRESS from "../config/IPADRESS";

// primary color : #F14E24
// Secondary color : #373E5A

export default function BookService({ route }) {
  const serviceChoosen = route.params.service;

  console.log(serviceChoosen);

  const minDate = new Date();

  const [id, setId] = useState("");
  const [idCart, setIdCart] = useState("");

  const { userId } = useContext(UserContext);

  useEffect(() => {
    setId(userId);
    axios
      .get(`http://${IPADRESS}:5000/carts/getIdCart/${userId}`)
      .then((res) => {
        //console.log(res.data[0].id_cart)
        setIdCart(res.data[0].id_cart);
        serviceChoosen === "Moving"
          ? setListService("1")
          : serviceChoosen === "Cleaning"
          ? setListService("2")
          : serviceChoosen === "Plumbing"
          ? setListService("3")
          : setListService("4");
      })
      .catch((err) => {
        console.log("Error ----------->" + err);
      });
  }, [userId]);

  useEffect(() => {
    axios
      .get(`http://${IPADRESS}:5000/carts/getIdCart/${userId}`)
      .then((res) => {
        console.log(res.data[0].id_cart);
        setIdCart(res.data[0].id_cart);
      })
      .catch((err) => {
        console.log("Error ----------->" + err);
      });
  }, [userId]);

  console.log(id);
  console.log(idCart);

  const Navigation = useNavigation();

  const { date, setDate } = useContext(UserContext);
  const { time, setTime } = useContext(UserContext);
  const { toList, setToList } = useContext(UserContext);
  // ---------------------------------- Drop list state -------------------------------------------------//

  const { listService, setListService } = useContext(UserContext);

  // ---------------------------------- Date state -------------------------------------------------//
  const [dateChoosen, setDateChoosen] = useState("");
  const [DShow, setDShow] = useState(false);

  // ---------------------------------- Time  state -------------------------------------------------//
  const [timeShow, setTimeShow] = useState(false); // show and hide the time window

  // --------------------------------- distination from Drop List ---------------------------------- //

  const [fromList, setFromList] = useState("");

  // --------------------------------- distination to Drop List ---------------------------------- //

  // ---------------------------------- Functions -------------------------------------------------//

  const handleTimeChange = (time) => {
    setTime(time);
    console.log(time);
  };

  const handleShow = () => {
    setTimeShow(true);
  };

  const handleHide = () => {
    setTimeShow(false);
  };

  const handleBookPress = () => {
    console.log(
      listService + " " + date + " " + time + " " + fromList + " " + toList
    );
    console.log(
      listService + " " + date + " " + time + " " + fromList + " " + toList
    );
    //Navigation.navigate("Booking Details");

    axios
      .post(`http://${IPADRESS}:5000/service/addBookedService`, {
        date: date,
        idUser: id,
        idService: listService,
        idCart: idCart,
        time: time,
        fromPlace: fromList,
        toPlace: toList,
      })
      .then((result) => {
        //console.log(result.data.insertId)
        axios
          .post(`http://${IPADRESS}:5000/carts/postReservation`, {
            cart_id_cart: idCart,
            reservation_id_reservation: result.data.insertId,
          })
          .then(() => {
            Navigation.navigate("Booking Details");
          })
          .catch(() => {
            console.error("error in inserting the booked data in the cart");
          });
        //,{params:{listService,date,time}}
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ------------------------------- ALL STATE IN TUNISIA ( I WILL MAP OVER IT SO I DON'T WRITE IT MANUALLY :))

  const months = [
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

  const ville = [
    "Tunis",
    "Ariana",
    "Beja",
    "Ben Arous",
    "Bizerte",
    "Gabes",
    "Gafsa",
    "Jendouba",
    "Kairouan",
    "Kasserine",
    "kebili",
    "Kef",
    "Mahdia",
    "Manouba",
    "Medenine",
    "Monastir",
    "Nabeul",
    "Sfax",
    "Sidi Bouzid",
    "Siliana",
    "Sousse",
    "Tataouine",
    "Touzeur",
    "Zaghouan",
  ];

  const customStyles = {
    headerText: { color: "red" },
    header: { backgroundColor: "red" },
  };

  const handleDay = (date) => {
    let formattedDate = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "none",
      year: "none",
    });
    console.log(formattedDate.substring(3, 5));
    setDate(formattedDate.substring(3, 5));
    setDShow(false);
  };

  const handleTime = (time) => {
    let formattedTime = time.toLocaleTimeString();
    console.log(formattedTime);
    setTime(formattedTime);
    setTimeShow(false);
  };

  const boxH = () => {
    if (serviceChoosen === "Moving") {
      return 700;
    } else {
      return 500;
    }
  };

  return (
    <View style={css.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView>
          <View
            style={{
              backgroundColor: "white",
              width: 370,
              height: boxH(),
              borderRadius: 4,
              marginTop: 50,
              paddingLeft: 20,
              marginBottom: 50,
            }}
          >
            {/** --------------------------------TEXT ( TITLE ) --------------------------------------------- */}
            <Text
              style={{
                textAlign: "center",
                fontSize: 25,
                marginTop: 25,
                fontWeight: "bold",
              }}
            >
              {" "}
              Booking section
            </Text>

            {/** --------------------------------TEXT ( SERVICES / DROP BOX ) --------------------------------------------- */}
            <Text style={{ marginTop: 20, fontWeight: "600", fontSize: 20 }}>
              {" "}
              Services :
            </Text>

            <Picker
              selectedValue={listService}
              onValueChange={(value) => setListService(value)}
              // mode="dropdown"
              mode="dialog"
              style={css.picker}
            >
              <Picker.Item
                label="Please Select Service"
                enabled={false}
                opacity={0.5}
                color="gray"
              />
              <Picker.Item label="Moving + tidying up things" value="1" />
              <Picker.Item label="Cleaning" value="2" />
              <Picker.Item label="Plumbing" value="3" />
              <Picker.Item label="Electricity" value="4" />
            </Picker>

            {/** --------------------------------LIGNE  --------------------------------------------- */}
            <View
              style={{
                borderBottomColor: "black",
                borderBottomWidth: 1,
                width: 370,
                marginLeft: -20,
                opacity: 0.1,
              }}
            />

            {/** --------------------------------DATE SELECT  --------------------------------------------- */}

            <Text style={{ marginTop: 20, fontWeight: "600", fontSize: 20 }}>
              {" "}
              Day :
            </Text>

            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#373E5A",
                  width: 200,
                  height: 30,
                  color: "white",
                  borderRadius: 20,
                  justifyContent: "center",
                  marginTop: 20,
                }}
                onPress={() => setDShow(true)}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Pick Day
                </Text>
              </TouchableOpacity>
            </View>

            {DShow ? (
              <DateTimePicker
                isVisible={DShow}
                onConfirm={handleDay}
                onCancel={() => setDShow(false)}
                minimumDate={minDate}
                customStyles={customStyles}
              />
            ) : null}

            {/** --------------------------------TEXT ( TIME SELECT ) --------------------------------------------- */}

            <View
              style={{
                marginTop: 20,
                borderBottomColor: "black",
                borderBottomWidth: 1,
                width: 370,
                marginLeft: -20,
                opacity: 0.1,
              }}
            />

            <Text style={{ marginTop: 20, fontWeight: "600", fontSize: 20 }}>
              {" "}
              Time :
            </Text>

            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#373E5A",
                  width: 200,
                  height: 30,
                  color: "white",
                  borderRadius: 20,
                  justifyContent: "center",
                  marginTop: 20,
                }}
                onPress={() => setTimeShow(true)}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Pick Time
                </Text>
              </TouchableOpacity>
            </View>

            {timeShow ? (
              <DateTimePicker
                mode="time"
                is24Hour={true}
                isVisible={timeShow}
                onConfirm={handleTime}
                onCancel={() => setTimeShow(false)}
              />
            ) : null}

            <View
              style={{
                marginTop: 20,
                borderBottomColor: "black",
                borderBottomWidth: 1,
                width: 370,
                marginLeft: -20,
                opacity: 0.1,
              }}
            />

            {/** --------------------------------DROP DOWN LIST FOR PLACES  --------------------------------------------- */}

            {listService === "1" ? (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View>
                  <Text
                    style={{
                      marginTop: 0,
                      fontWeight: "600",
                      fontSize: 20,
                      marginLeft: 30,
                    }}
                  >
                    {" "}
                    From :
                  </Text>
                  <Picker
                    selectedValue={fromList}
                    onValueChange={(value) => setFromList(value)}
                    // mode="dropdown"
                    mode="dialog"
                    style={css.pickerFromTo}
                  >
                    <Picker.Item
                      label="Please Select City"
                      enabled={false}
                      opacity={0.5}
                      color="gray"
                    />
                    {ville.map((element, key) => {
                      return <Picker.Item label={element} value={element} />;
                    })}
                  </Picker>
                  <Image
                    source={require("../assets/MovingTruck.gif")}
                    style={{
                      width: 80,
                      height: 80,
                      marginLeft: 50,
                      marginTop: -20,
                    }}
                  />
                </View>

                <View>
                  <Text
                    style={{
                      marginTop: 20,
                      fontWeight: "600",
                      fontSize: 20,
                      marginLeft: 30,
                    }}
                  >
                    {" "}
                    To :
                  </Text>
                  <Picker
                    selectedValue={toList}
                    onValueChange={(value) => setToList(value)}
                    // mode="dropdown"
                    mode="dialog"
                    style={css.pickerFromTo}
                  >
                    <Picker.Item
                      label="Please Select City"
                      enabled={false}
                      opacity={0.5}
                      color="gray"
                    />
                    {ville.map((element, key) => {
                      return <Picker.Item label={element} value={element} />;
                    })}
                  </Picker>
                </View>
              </View>
            ) : null}

            {/*------------------------------------------------------------ BUTTON ---------------------------------------------------------- */}
            {!listService.length || !date.length || !time.length ? (
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  disabled={true}
                  style={{
                    backgroundColor: "#fcad92",
                    width: 200,
                    height: 50,
                    color: "white",
                    borderRadius: 100,
                    justifyContent: "center",
                    marginTop: 20,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: 17,
                      fontWeight: "500",
                    }}
                  >
                    Book
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#F14E24",
                    width: 200,
                    height: 50,
                    color: "white",
                    borderRadius: 100,
                    justifyContent: "center",
                    marginTop: 20,
                    alignItems: "center",
                  }}
                  onPress={() => handleBookPress()}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: 17,
                      fontWeight: "500",
                    }}
                  >
                    Book
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
}

const css = StyleSheet.create({
  container: {
    backgroundColor: "#373E5A",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    backgroundColor: "white",
    width: 370,
    height: 700,
    borderRadius: 4,
    marginTop: 50,
    paddingLeft: 20,
    marginBottom: 50,

    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 60,
    shadowRadius: 40,
    elevation: 10,
  },
  picker: {
    marginTop: 3,
    width: 300,
    fontSize: 16,
    fontWeight: "bold",
  },
  pickerFromTo: {
    marginTop: 3,
    width: 150,
    fontSize: 16,
    fontWeight: "bold",
    margin: 30,
  },
  datePicker: {
    backgroundColor: "red",
    color: "white",
  },
});
