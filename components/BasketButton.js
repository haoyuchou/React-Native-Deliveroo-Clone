import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
//import { totalPrice } from "../store/basketSlice";

export default function BasketButton() {
  const basket = useSelector((state) => state.basket.items);
  const navigate = useNavigation();
  const basketTotalPrice = basket.reduce((total, item) => {
    return (total += item.price);
  }, 0);

  if (basket.length === 0) {
    return null;
  }
  //console.log("Basket: ", basket);
  //console.log("Total Price: ", basketTotalPrice);

  return (
    <View className="absolute w-full z-50 bottom-10">
      <TouchableOpacity
        onPress={() => navigate.navigate("Basket")}
        className="flex-row rounded-full space-x-1 items-center bg-[#00CCBB] mx-4 p-4"
      >
        <Text className="text-white font-extrabold bg-[#01A296] px-2 py-1">
          {basket.length}
        </Text>
        <Text className="flex-grow text-lg text-white font-extrabold text-center">
          View Basket
        </Text>
        <Text className="text-lg text-white font-extrabold">
          ${basketTotalPrice}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
