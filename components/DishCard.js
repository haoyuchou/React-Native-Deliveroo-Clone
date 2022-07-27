import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { Fragment, useState } from "react";
import { urlFor } from "../sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useSelector, useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../store/basketSlice";

export default function DishCard(props) {
  const { id, name, description, price, image } = props;
  //console.log(image);

  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket.items);
  const filteredBasket = basket.filter((item) => item.id === id);

  //console.log("filtered Basket: ", filteredBasket);
  console.log("Basket: ", basket);

  //const [selectedNumber, setSelectedNumber] = useState(0);

  const addToBasketHandler = () => {
    //setSelectedNumber((num) => num + 1);
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const minusFromBasketHandler = () => {
    if (!filteredBasket.length > 0) {
      return;
    }
    dispatch(removeFromBasket({ id }));
  };

  return (
    <Fragment>
      <TouchableOpacity className="bg-white border-gray-200">
        <View className="p-3">
          <View className="flex-row">
            <View className="flex-grow">
              <Text className="text-xl mb-2">{name}</Text>
              <Text className="text-gray-600 mb-2">{description}</Text>
              <Text className="text-gray-600">${price}</Text>
            </View>

            <Image
              style={{
                borderWidth: 1,
                borderColor: "#F3F3F4",
              }}
              source={{
                uri: urlFor(image).url(),
              }}
              className="h-20 w-20 bg-gray-400 p-3"
            />
          </View>
        </View>
      </TouchableOpacity>

      {/* Number button */}
      <View className="flex-row items-center bg-white space-x-2 px-3 pb-2">
        <TouchableOpacity
          disabled={!filteredBasket.length}
          onPress={minusFromBasketHandler}
        >
          <MinusCircleIcon
            size={40}
            color={filteredBasket.length > 0 ? "#00CCBB" : "gray"}
          />
        </TouchableOpacity>

        <Text>{filteredBasket.length}</Text>

        <TouchableOpacity onPress={addToBasketHandler}>
          <PlusCircleIcon size={40} color="#00CCBB" />
        </TouchableOpacity>
      </View>
    </Fragment>
  );
}
