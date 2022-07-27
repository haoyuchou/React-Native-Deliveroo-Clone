import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { XIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

export default function DeliveryScreen() {
  const selectedResturant = useSelector((state) => state.resturant.resturant);
  const navigation = useNavigation();
  console.log("Selected Restuarant latitude: ", selectedResturant.lat);
  console.log("Selected Restuarant longitude: ", selectedResturant.long);

  const { width, height } = Dimensions.get("window");
  

  console.log("Width, Height: ", width, height);
  // Width, Height: 411.42857142857144 683.4285714285714

  return (
    <View className="pt-10 bg-[#00CCBB] flex-grow">
      <SafeAreaView className="z-50">
        <View className="flex-row items-center justify-between px-5">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <XIcon size={28} color="white" />
          </TouchableOpacity>

          <Text className="text-white font-light text-lg">Order Help</Text>
        </View>
         
         {/* flowting card */}
        <View className="bg-white rounded-lg p-5 shadow-md z-50 mx-4 my-6">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-xl text-gray-500">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">30-40 Minutes</Text>
            </View>
            <Image
              source={{
                uri: "https://img.freepik.com/premium-vector/delivery-man-ride-motorcycle-cartoon-vector_261104-116.jpg?w=2000",
              }}
              className="h-20 w-20"
            />
          </View>

          <Progress.Bar color="#00CCBB" indeterminate={true} size={30} />

          <Text className="text-gray-500 mt-4">
            Your order at {selectedResturant.title} is being prepared!
          </Text>
        </View>
      </SafeAreaView>

      <MapView
        initialRegion={{
          latitude: Number(selectedResturant.lat),
          longitude: Number(selectedResturant.long),
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        className="flex-grow z-0 -mt-10"
        mapType="mutedStandard"
      >
        <Marker 
            coordinate={{
                latitude: Number(selectedResturant.lat),
                longitude: Number(selectedResturant.long)
            }}
            title={selectedResturant.title}
            description={selectedResturant.short_description}
            identifier="origin"
            pinColor="#00CCBB"
        />
      </MapView>
    </View>
  );
}
