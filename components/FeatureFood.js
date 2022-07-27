import { View, Text, ScrollView } from "react-native";
import React from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import ResturantCard from "./ResturantCard";

export default function FeatureFood({ title, description, id, resturants }) {
  console.log("Featured food: ", resturants);

  return (
    <View>
      <View className="flex-row items-center justify-between mt-4 px-3">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>

      <Text className="px-3 text-sm text-gray-500">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* Resturants Card */}
        {resturants?.map((resturant) => {
          console.log(resturant.type.name);
          return (
            <ResturantCard
              key={resturant._id}
              id={resturant._id}
              imgUrl={resturant.image}
              title={resturant.name}
              dishes={resturant.dishes}
              rating={resturant.rating}
              short_description={resturant.short_description}
              genre={resturant.type?.name}
              lat={resturant.lat}
              long={resturant.long}
              address={resturant.address}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
