import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import { removeFromBasket } from "../store/basketSlice";

export default function BasketScreen() {
  const navigation = useNavigation();

  const selectedResturant = useSelector((state) => state.resturant.resturant);
  const selectedBasket = useSelector((state) => state.basket.items);
  const dispatch = useDispatch();
  const [selectedBasketGroup, setSelectedBasketGroup] = useState([]);
  const [basketTotal, setBasketTotal] = useState(null);

  useEffect(() => {
    const basketGroup = selectedBasket.reduce((results, item) => {
      // results start as {}
      // if existed, push to results[item.id] object's array
      // else push to results as new object
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    const total = selectedBasket.reduce((total, item) => {
      total += item.price;
      return total;
    }, 0);

    setSelectedBasketGroup(basketGroup);

    setBasketTotal(total);
  }, [selectedBasket]);

  // selectedBasketGroup is an object
  //console.log("Selected Basket Group: ",typeof(selectedBasketGroup));

  return (
    <SafeAreaView className="flex-1 bg-white pt-4">
      <View className="bg-gray-200 flex-1">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-md">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-600">
              {selectedResturant.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            className="absolute top-3 right-5 rounded-full bg-gray-200"
          >
            <XCircleIcon color="#00CCBB" size={50} />
          </TouchableOpacity>
        </View>

        {/* Resturant Image */}
        <View className="flex-row bg-white items-center space-x-3 py-3 px-4 my-4">
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className="w-7 h-7 rounded-full p-4 bg-gray-400"
          />
          <Text className="flex-grow">Deliver in 30-40 minutes</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        {/* Basket Items */}
        <ScrollView className="divide-y divide-gray-300 mb-5">
          {Object.entries(selectedBasketGroup).map(([key, items]) => {
            return (
              <View
                key={key}
                className="flex-row items-center bg-white space-x-3 py-2 px-4"
              >
                <Text className="text-[#00CCBB]">{items.length} x</Text>
                <Image
                  source={{
                    uri: urlFor(items[0]?.image).url(),
                  }}
                  className="h-12 w-12 rounded-full"
                />
                <Text className="flex-grow">{items[0]?.name}</Text>
                <Text className="text-gray-600">${items[0]?.price}</Text>

                <TouchableOpacity>
                  <Text
                    onPress={() => {
                      dispatch(removeFromBasket({ id: key }));
                    }}
                    className="text-[#00CCBB] text-sm"
                  >
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>

      <View className="p-4 bg-white space-y-3 mt-4">
        <View className="flex-row justify-between">
          <Text className="text-gray-600">SubTotal</Text>
          <Text className="text-gray-600">${basketTotal}</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-600">Delivery fee</Text>
          <Text className="text-gray-600">$30</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="">Order Total</Text>
          <Text className="">${basketTotal + 30}</Text>
        </View>

        <TouchableOpacity onPress={() => {navigation.navigate("PlaceOrder")}} className="bg-[#00CCBB] p-4 rounded-full">
          <Text className="font-bold text-center text-white">Place Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
