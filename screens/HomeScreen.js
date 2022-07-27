import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  ChevronDownIcon,
  SearchIcon,
  AdjustmentsIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeatureFood from "../components/FeatureFood";
import client from "../sanity";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "featured"] {
      ...,
      resturants[]->{
        ...,
        dishes[]->,
        type->{
          name
        }
      }
      
    }`
      )
      .then((data) => setFeatured(data));
  }, []);

  console.log(featured);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="bg-white pt-4 pb-36">
      {/* Header */}
      <View className="mt-6 flex-row items-center space-x-3 px-4 mb-3">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-grow">
          <Text className="font-bold text-xs text-gray-600">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>

        <UserIcon size={35} color="#00CCBB" />
      </View>

      {/* Search */}
      <View className="flex-row px-4 mb-3">
        <View className="flex-row flex-grow space-x-2 items-center pl-2 bg-gray-200">
          <SearchIcon color="gray" size={20} />
          <TextInput
            placeholder="Resturant and Cuisines"
            keyboardType="default"
          />
        </View>

        <AdjustmentsIcon color="#00CCBB" />
      </View>

      {/* Scrollable body */}

      <ScrollView className="bg-gray-100">
        {/* Components for categories */}
        <Categories />

        {/* Feature Food */}

        {featured?.map((item) => {
          return (
            <FeatureFood
              key={item._id}
              id={item._id}
              title={item.name}
              description={item.short_description}
              resturants={item.resturants}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
