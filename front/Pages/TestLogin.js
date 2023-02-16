import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from "react-native";
import firebaseConfig from "../config/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  // GoogleAuthProvider,
  // signInWithPopup,
} from "firebase/auth"; // importing the auth of Firebase
import { initializeApp } from "firebase/app";
import { useState, useRef, useContext, useEffect } from "react";
import IPADRESS from "../config/IPADRESS";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import { UserContext } from "../UserContext";

export default function TestLogin() {
  const [value, setValue] = useState({
    email: "",
    password: "",
    passwordHide: true,
    emailError: false,
  });

  const [uploading, setUploading] = useState(false);

  // import userId from useContext object
  const { userId, setUserId } = useContext(UserContext);

  // console.log("message mel login ", userId);

  // State to handle the error of login
  const [valueError, setError] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  // initialization of firebase config
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const Navigation = useNavigation();

  // Handle Login Function
  const handleLogIn = () => {
    signInWithEmailAndPassword(auth, value.email, value.password)
      .then((userCredential) => {
        // console.log("user Id current:", userCredential.user.uid);
        setError("");
        setValue({ ...value, emailError: false });
        setPasswordError(false);
        // save the user Id in the state "userID"
        setUserId(userCredential.user.uid);

        return userCredential.user.uid;
      })

      .then((id) => {
        Navigation.navigate("SideBar");
      })
      .catch((error) => {
        setValue({ ...value, error: error.code });
        if (
          error.code === "auth/invalid-email" ||
          error.code === "auth/user-not-found"
        ) {
          setValue({ ...value, emailError: true });
          setError(" Your Email is incorrect ");
          console.log(valueError);
          return;
        }
        if (error.code === "auth/wrong-password") {
          setValue({ ...value, emailError: false });
          setError(" Your password is incorrect ");
          setPasswordError(true);
          setValue({ ...value, emailError: false });
        } else {
          if (error.code === "auth/too-many-requests") {
            setError(
              "Your account has been frozed for a moment, you should click on 'Forget my password'"
            );
            alert(
              "Your account has been frozed for a moment, you should click on 'Forget my password'"
            );
          } else {
            console.log(error.message);
          }
        }
      });
  };
  const forgetPassword = () => {
    if (value.email.length < 5) {
      alert("Write your Email");
    } else {
      sendPasswordResetEmail(auth, value.email)
        .then(() => {
          alert("Email send with a link to confirm it's you");
        })
        .catch((error) => {
          if (error.code === "auth/user-not-found") {
            alert(" You don't have an account :)), create an account first");
          }
          console.log(error);
        });
    }
  };

  //-----------------------------------------------------------------------------------------------------------
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={css.constainer}>
        <ImageBackground
          style={{ width: "100%", height: "100%" }}
          source={{
            uri: `https://res.cloudinary.com/dn9qfvg2p/image/upload/v1674060984/font_oq0zp9.png`,
          }}
        >
          <View style={css.box}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 25,
                marginTop: 50,
                fontWeight: "bold",
              }}
            >
              Log in{" "}
            </Text>

            {/* <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/facebook.png")}
                style={{
                  width: 35,
                  height: 35,
                  marginLeft: -15,
                  marginRight: 40,
                }}
              />
              <Image
                source={require("../assets/google-plus.png")}
                style={{
                  width: 35,
                  height: 35,
                  marginLeft: -15,
                  marginRight: 40,
                }}
              />
              <Image
                source={require("../assets/linkedin.png")}
                style={{
                  width: 35,
                  height: 35,
                  marginLeft: -15,
                  marginRight: 0,
                }}
              />
            </View> */}

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 50,
              }}
            >
              {!value.emailError ? (
                <TextInput
                  keyboardType="email-address"
                  style={{
                    backgroundColor: "white",
                    height: 50,
                    fontSize: 17,
                    borderColor: "#9d9d9e",
                    borderWidth: 1,
                    padding: 10,
                    width: 330,
                    borderRadius: 50,
                    alignItems: "center",
                  }}
                  placeholder="  ✉️   Your Email here..."
                  onChangeText={(text) => setValue({ ...value, email: text })}
                />
              ) : (
                <TextInput
                  keyboardType="email-address"
                  style={{
                    backgroundColor: "white",
                    height: 50,
                    fontSize: 17,
                    borderColor: "red",
                    borderWidth: 3,
                    padding: 10,
                    width: 330,
                    borderRadius: 50,
                    alignItems: "center",
                  }}
                  placeholder="  ✉️   Your Email here..."
                  onChangeText={(text) => {
                    setValue({ ...value, email: text });
                  }}
                />
              )}

              {!passwordError ? (
                <TextInput
                  secureTextEntry={value.passwordHide}
                  style={{
                    backgroundColor: "white",
                    height: 50,
                    fontSize: 17,
                    borderColor: "#9d9d9e",
                    borderWidth: 1,
                    padding: 10,
                    width: 330,
                    borderRadius: 50,
                    alignItems: "center",
                    marginTop: 40,
                  }}
                  placeholder="  🔐   Your Password here..."
                  onChangeText={(text) =>
                    setValue({ ...value, password: text })
                  }
                />
              ) : (
                <TextInput
                  secureTextEntry={value.passwordHide}
                  style={{
                    backgroundColor: "white",
                    height: 50,
                    fontSize: 17,
                    borderColor: "red",
                    borderWidth: 3,
                    padding: 10,
                    width: 330,
                    borderRadius: 50,
                    alignItems: "center",
                    marginTop: 40,
                  }}
                  placeholder="  🔐   Your Password here..."
                  onChangeText={(text) =>
                    setValue({ ...value, password: text })
                  }
                />
              )}
            </View>
         
            {!value.password.length ? null : value.passwordHide === true ? (
              <Text
                style={{ textAlign: "center" }}
                onPress={() =>
                  setValue({ ...value, passwordHide: !value.passwordHide })
                }
              >
                Show password
              </Text>
            ) : (
              <Text
                style={{ textAlign: "center" }}
                onPress={() =>
                  setValue({ ...value, passwordHide: !value.passwordHide })
                }
              >
                hide password
              </Text>
            )}
            
            <Image source={require('../assets/hide.png')} style={{height:"4%",width:"8%",position:"absolute",marginTop:290,marginLeft:300}}  onPress={() =>
                  setValue({ ...value, passwordHide: !value.passwordHide })
                }/>
            {valueError.length ? (
              <View
                style={{
                  alignItems: "center",
                  marginTop: 30,
                  borderRaduis: 50,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#fcad92",
                    height: 40,
                    width: 300,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRaduis: 50,
                  }}
                >
                  <Text
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "500",
                    }}
                  >
                    {valueError}
                  </Text>
                </View>
              </View>
            ) : null}
            {passwordError ? (
              <Text
                style={{
                  fontSize: 15,
                  marginTop: 15,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Forget your password ?
                <Text
                  style={{ color: "#F96332" }}
                  onPress={() => forgetPassword()}
                >
                  {" "}
                  tap here
                </Text>
              </Text>
            ) : null}
            {/** ------------------------------------ BUTTON CONFIRM ------------------------------------- */}

            {value.email.length && value.password.length ? (
              <View
                style={{ alignItems: "center", marginTop: 30 }}
                onPress={() => handleLogIn()}
              >
                <View style={css.buttonStyle} onPress={() => handleLogIn()}>
                  <Text
                    style={{
                      color: "white",
                      alignItems: "center",
                      fontWeight: "400",
                      fontSize: 17,
                    }}
                    onPress={() => handleLogIn()}
                  >
                    Sign In
                  </Text>
                </View>
              </View>
            ) : (
              <View
                style={{ alignItems: "center", marginTop: 30 }}
                onPress={() => handleLogIn()}
              >
                <View style={css.buttonStyleNo}>
                  <Text
                    style={{
                      color: "white",
                      alignItems: "center",
                      fontWeight: "400",
                      fontSize: 17,
                    }}
                    onPress={() => handleLogIn()}
                  >
                    Sign In
                  </Text>
                </View>
              </View>
            )}

            {/** ----------------------------------------------------------------------------------------- */}

            <Text
              style={{
                fontSize: 15,
                marginTop: 20,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              You don't have account
              <Text
                onPress={() => Navigation.navigate("TestSignin")}
                style={{ color: "#F96332" }}
              >
                {" "}
                tap here
              </Text>
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const css = StyleSheet.create({
  constainer: {
    backgroundColor: "#dadde1",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    backgroundColor: "white",
    width: 340,
    height: 480,
    borderRadius: 4,
    marginLeft: 10,
    marginTop: 108,

    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 60,
    shadowRadius: 40,
    elevation: 10,
  },
  buttonStyle: {
    backgroundColor: "#F96332",
    width: 170,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 500,
  },
  buttonStyleNo: {
    backgroundColor: "#fcad92",
    width: 170,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 500,
  },
});
