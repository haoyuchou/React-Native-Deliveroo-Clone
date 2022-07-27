import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { Fragment, useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { LocationMarkerIcon, StarIcon } from "react-native-heroicons/solid";
import DishCard from "../components/DishCard";
import BasketButton from "../components/BasketButton";
import { useDispatch } from "react-redux";
import { setResturant } from "../store/resturantSlice";

export default function ResturantScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
  } = route.params;

  console.log(dishes);

  // store the current resturant to redux
  useEffect(() => {
    dispatch(
      setResturant({
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
      })
    );
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Fragment>
      <BasketButton />

      <ScrollView className="">
        <View className="relative">
          <Image
            source={{
              uri: urlFor(imgUrl).url(),
            }}
            className="w-full h-56 bg-gray-400 p-3"
          />
          <TouchableOpacity
            className="absolute top-10 left-5 bg-white rounded-full p-2"
            onPress={() => {
              navigation.goBack();
            }}
          >
            <ArrowLeftIcon size={20} color="#00CCBB" />
          </TouchableOpacity>
        </View>

        {/* Views for the description */}
        <View className="bg-white">
          <View className="p-3">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row space-x-2 items-center mt-2 mb-1">
              <StarIcon color="#00CCBB" opacity={0.5} size={22} />
              <Text className="text-sm text-gray-600">
                <Text className="text-[#00CCBB]">{rating}</Text> ‧ {genre}
              </Text>
            </View>

            <View className="flex-row mb-1 space-x-1">
              <LocationMarkerIcon size={22} color="gray" opacity={0.5} />
              <Text className="text-gray-600">Nearby ‧ {address}</Text>
            </View>

            <View className="pl-1">
              <Text className="text-sm text-gray-600">{short_description}</Text>
            </View>
          </View>
        </View>

        {/* Views for the menu */}
        <View className="pb-36">
          <Text className="text-2xl font-bold p-3">Menu</Text>

          {/* dishes */}
          {dishes.map((dish) => {
            return (
              <DishCard
                key={dish._id}
                id={dish._id}
                name={dish.name}
                description={dish.short_description}
                price={dish.price}
                image={dish.image}
              />
            );
          })}
        </View>
      </ScrollView>
    </Fragment>
  );
}
