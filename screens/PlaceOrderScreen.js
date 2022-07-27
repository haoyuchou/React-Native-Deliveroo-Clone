import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

export default function PlaceOrderScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  }, []);

  return (
    <SafeAreaView className="flex-grow bg-white items-center justify-center">
      <Animatable.Image
        source={require("../assets/foodDelivery.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-96"
      />

      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-[#00CCBB] font-bold text-xl my-10"
      >
        Waiting for the acceptence of your order!
      </Animatable.Text>

      <Progress.Circle size={40} indeterminate={true} color="#00CCBB" />
    </SafeAreaView>
  );
}
