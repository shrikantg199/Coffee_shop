import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import CategoryItemList from "./CategoryItemList";
import { Colors } from "../../constants/Colors";

const CategoryItems = () => {
  const categoryItem = [
    {
      item: "Cappuccino",
      description: "With Steamed Milk",
      price: 4.2,
      rating: 4.5,
      image: require("../../assets/coffee.png"),
    },
  ];
  return (
    <View>
      <FlatList
        data={categoryItem}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#808080",
              height: 250,
              width: 160,
              borderRadius: 20,
              marginTop: 20,
              borderColor: "#808080",
              borderWidth: 1,
            }}
          >
            <CategoryItemList category={item} />
          </View>
        )}
      />
    </View>
  );
};

export default CategoryItems;

const styles = StyleSheet.create({});
