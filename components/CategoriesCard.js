import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { urlFor } from "../sanity";

export default function CategoriesCard({ imgUrl, title }) {
  return (
    <TouchableOpacity className="mr-2 relative">
      <Image
        source={{
          uri: urlFor(imgUrl).url(),
        }}
        className="h-20 w-20 rounded"
      />
      <Text className="absolute left-1 bottom-1 font-semibold text-white">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
