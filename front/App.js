import * as React from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SideBar from "./components/SideBar.js";
import Shop from "front/test/Shop.js";
import Products from "./Pages/Products.js";
import History from "./Pages/History";
import Profil from "./Pages/Profil";
import LogInSignIn from "./Pages/LogInSignIn";
import AddProduct from "./Pages/AddProduct";
import TestSignin from "./Pages/TestSignin.js";
import TestLogin from "./Pages/TestLogin.js";
import EditeProfil from "./Pages/EditeProfil.js";
import EditeAdress from "./Pages/EditeAdress.js";
import PhoneNumber from "./Pages/PhoneNumber";
import { NativeBaseProvider, View } from "native-base";
import { UserContext } from "./UserContext.js";
import { useContext, useState } from "react";
import Cart from "./Pages/Cart.js";
import ProductInfo from "./Pages/ProductInfo.js";
import ImageDetails from "./Pages/ImageDetails";
import yahya from "./Pages/yahya.js";
import Serves from "./Pages/Serves.js";
import BookService from "./Pages/BookService.js";
import BookingDetails from "./Pages/BookingDetails.js";
import Notification from "./Pages/Notifcation";
import Awelscreen from "./Pages/Awelscreen.js";

import { LogBox } from "react-native";
import HistoryDetails from "./Pages/HistoryDetails.js";
import Join_Us from "./components/Join_Us.js";
import IntoductionPages from "./Pages/IntoductionPages.js";
import ChatScreen from "./Pages/ChatScreen.js";

const Stack = createNativeStackNavigator();
export default function App() {
  const [showContent, setShowContent] = useState("");
  const [userId, setUserId] = useState("");
  const [userCartId, setUserCartId] = useState("");
  const [listService, setListService] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [toList, setToList] = useState("");

  LogBox.ignoreAllLogs();
  return (
    <UserContext.Provider
      value={{
        showContent,
        setShowContent,
        userId,
        setUserId,
        userCartId,
        setUserCartId,
        setListService,
        listService,
        date,
        setDate,
        time,
        setTime,
        toList,
        setToList,
      }}
    >
      <StatusBar backgroundColor={"white"} barStyle="dark-content" />
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="IntoductionPages"
            screenOptions={{
              headerTintColor: "white",
              headerShown: false,
              headerStyle: {
                backgroundColor: "#ED5C00",
              },
            }}
          >
            <Stack.Screen
              name="Notification"
              options={{ headerShown: false }}
              component={Notification}
            />

            <Stack.Screen
              name="ChatScreen"
              options={{ headerShown: false }}
              component={ChatScreen}
            />

            <Stack.Screen
              name="LogInSignIn"
              options={{ headerShown: false }}
              component={LogInSignIn}
            />
            <Stack.Screen
              name="IntoductionPages"
              component={IntoductionPages}
            />

            <Stack.Screen
              name="History"
              component={History}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="PhoneNumber Verif" component={PhoneNumber} />
            <Stack.Screen
              name="TestSignin"
              component={TestSignin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TestLogin"
              component={TestLogin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profil"
              // options={{ headerShown: false }}
              component={Profil}
            />
            {/* <Stack.Screen name="TabBar" component={TabBar} /> */}
            <Stack.Screen
              name="SideBar"
              options={{ headerShown: false }}
              component={SideBar}
            />
            <Stack.Screen
              name="Shop"
              component={Shop}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Products"
              component={Products}
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen name="Email Confiramtion" component={EmailConfirmation} /> */}
            <Stack.Screen
              name="AddProduct"
              //  options={{ headerShown: false }}
              component={AddProduct}
            />
            <Stack.Screen name="EditeProfil" component={EditeProfil} />
            <Stack.Screen name="EditeAdress" component={EditeAdress} />

            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="ProductInfo" component={ProductInfo} />
            <Stack.Screen name="ImageDetails" component={ImageDetails} />
            <Stack.Screen
              name="Home"
              component={yahya}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Serves"
              component={Serves}
              // options={{ headerShown: false }}
            />
            <Stack.Screen name="BookService" component={BookService} />
            <Stack.Screen name="Booking Details" component={BookingDetails} />
            <Stack.Screen name="HistoryDetails"  component={HistoryDetails} />
            <Stack.Screen name="Join_Us" component={Join_Us} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </UserContext.Provider>   
  );
}

