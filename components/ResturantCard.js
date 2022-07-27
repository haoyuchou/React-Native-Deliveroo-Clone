import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { LocationMarkerIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

export default function ResturantCard(props) {
  const {
    id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes,
    lat,
    long,
  } = props;

  console.log("Restuant image: ", imgUrl);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="bg-white mr-3 shadow-md"
      onPress={() => {
        navigation.navigate("Resturant", {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          lat,
          long,
        });
      }}
    >
      <Image
        source={{
          uri: urlFor(imgUrl).url(), // return us a string value
        }}
        className="w-64 h-36 rounded-md"
      />

      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>

        <View className="flex-row space-x-1 items-center">
          <StarIcon size={22} color="#00CCBB" opacity={0.5} />
          <Text className="text-gray-500">
            <Text className="text-[#00CCBB]">{rating}</Text> ‧ {genre}
          </Text>
        </View>

        <View className="flex-row space-x-1 items-center">
          <LocationMarkerIcon size={22} color="#00CCBB" opacity={0.5} />
          <Text className="text-gray-500 text-sm">{address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
