import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

const CategoryItemList = ({ category }) => {
  return (
    <View>
      <View
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          height: 120,
        }}
      >
        <Image
          source={category.image}
          style={{ width: 140, height: 100, borderRadius: 20 }}
        />
      </View>
      <View style={{ marginLeft: 10 }}>
        <Text style={{ color: Colors.white, fontSize: 20 }}>
          {category.item}
        </Text>
        <Text style={{ color: Colors.white }}>{category.description}</Text>
        <View
          style={{
            marginVertical: 30,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal:20,
          }}
        >
          <Text>${category.price}</Text>
          <Text>dfs</Text>
        </View>
      </View>
    </View>
  );
};

export default CategoryItemList;

const styles = StyleSheet.create({});
