import { StatusBar } from "expo-status-bar";
// import { it } from 'node:test';
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import TabBar from "../components/TabBar";
const { width, height } = Dimensions.get("screen");

const images = {
  Moving:
    "https://res.cloudinary.com/dn9qfvg2p/image/upload/v1673477074/t%C3%A9l%C3%A9chargement_uosdjf.jpg",
  Cleaning:
    "https://res.cloudinary.com/dn9qfvg2p/image/upload/v1673476864/home-cleaning-service-johor-bahru_nfgd9c.jpg",
  Plumbing:
    "https://res.cloudinary.com/dn9qfvg2p/image/upload/v1673477170/How-To-Spot-On-The-Best-Plumbing-Service-To-Hire-2_kvrrif.jpg",
  electricity:
    "https://res.cloudinary.com/dn9qfvg2p/image/upload/c_scale,w_600/v1673477425/Ootravaux-trouver-meilleur-electricien_1000x667_bdmgi1.jpg",
};
const data = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i],
  ref: React.createRef(),
}));

const Tab = React.forwardRef(({ item, onItemPress }, ref) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity>
      <View ref={ref}>
        <Text
          onPress={() =>
            navigation.navigate("BookService", { service: item.title })
          }
          style={{
            color: "#373E5A",
            fontSize: 70 / data.length,
            fontWeight: "600",
            top: -80,
            //    textTransform:'uppercase'
          }}
        >
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
});
const Indicator = ({ measures, scrollX }) => {
  const inputRange = data.map((_, i) => i * width);
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measures) => measures.width),
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measures) => measures.x),
  });
  return (
    <Animated.View
      style={{
        // position:'absolute',
        height: 4,
        width: indicatorWidth,
        left: 0,
        backgroundColor: "#ED5C00",
        bottom: 80,
        transform: [{ translateX }],
      }}
    />
  );
};

const Tabs = ({ data, scrollX, onItemPress }) => {
  const [measures, setMeasures] = React.useState([]);
  const containerRef = React.useRef();
  React.useEffect(() => {
    let m = [];
    data.forEach((item) => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          m.push({ x, y, width, height });
          if (m.length === data.length) {
            setMeasures(m);
          }
        }
      );
    });
  }, []);
  return (
    <View style={{ position: "absolute", top: 100, width }}>
      <View
        ref={containerRef}
        style={{
          justifyContent: "space-evenly",
          flex: 1,
          flexDirection: "row",
        }}
      >
        {data.map((item, index) => {
          return (
            <Tab
              key={item.key}
              item={item}
              ref={item.ref}
              // onItemPress={() => {
              //   onItemPress(index);
              // }}
            />
          );
        })}
      </View>
      {measures.length > 0 && (
        <Indicator measures={measures} scrollX={scrollX} />
      )}
    </View>
  );
};

const Serves = ({ navigation }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef();
  const onItemPress = React.useCallback((itemIndex) => {
    ref?.current?.scrollToOffser({
      offset: itemIndex * width,
    });
  });
  return (
    <View style={styles.container}>
      {/* <StatusBar hidden /> */}
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        bounces={false}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height }}>
              <Image source={{ uri: item.image }} style={{ flex: 1 }} />
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  { backgroundColor: "rgba(0,0,0,0,3" },
                ]}
              ></View>
              <TabBar />
            </View>
          );
        }}
      />
      <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} />
      <TabBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Serves;
