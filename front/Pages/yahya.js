import React, { useRef, useState, useContext, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import MainHeader from "../components/MainHeader";
import ScreenHeader from "../components/ScreenHeader";
import TopPlacesCarousel from "../components/TopPlacesCarousel";
import { PLACES, TOP_PLACES } from "../data";
import SectionHeader from "../components/SectionHeader";
import TripsList from "../components/TripsList";
import { UserContext } from "../UserContext";
import axios from "axios";
import IPADRESS from "../config/IPADRESS";

const Home = () => {
  const { userId } = useContext(UserContext);
  const { userCartId, setUserCartId } = useContext(UserContext);

  // to set id_cart for each user and set a new id-cart after each chek-out
  useEffect(() => {
    axios
      .get(`http://${IPADRESS}:5000/carts/getIdCart/${userId}`)
      .then((response) => {
        response.data.map((element) => {
          setUserCartId(element.id_cart);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* <MainHeader title="Go-Express " style={styles.title} /> */}

        {/* <ScreenHeader
          mainTitle="where are here "
          secondTitle="to facilitate your life"
        /> */}

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <TopPlacesCarousel list={TOP_PLACES} /> */}
          {/* <SectionHeader
            title="Product"
            buttonTitle="See All"
            onPress={() => {
              navig;
            }} */}
            {/* // mainTitle="where are here "
            // secondTitle="to facilitate your life"
          // /> */}
          <MainHeader
            title="Go-Express To facilitate your life"
            style={styles.title}
          />

          <ScrollView showsVerticalScrollIndicator={false}>
            <TopPlacesCarousel list={TOP_PLACES} />
            <SectionHeader
              title="Product"
              buttonTitle="See All"
              onPress={() => {
                navig;
              }}
            />
            <TripsList list={PLACES} />
          </ScrollView>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbfbfb",
  },
});

export default Home;
