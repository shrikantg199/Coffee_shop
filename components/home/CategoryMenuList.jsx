import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";

const CategoryList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = [
    {
      name: "All",
    },
    {
      name: "Cappuccino",
    },
  ];
  return (
    <View>
      <FlatList
        horizontal={true}
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ marginHorizontal: 10 }}
            onPress={() => setSelectedCategory(item.name)}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight:500,
                color:
                  item.name === selectedCategory ? "#D17842" : Colors.white,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({});
