import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

const CategoryItemList = ({ category ,rating}) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`coffeebeans/${category?.id}`);
        //console.log(`coffeebeans/${category?.id}`);
      }}
    >
      <View
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          height: 110,
        }}
      >
        <Image
          source={{ uri: category.imageUrl }}
          style={{
            width: 150,
            height: 110,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        />
      </View>
      <View style={{ marginLeft: 10, marginTop: 20 }}>
        <Text style={{ color: Colors.white, fontSize: 18 }}>
          {category.item}
        </Text>
        <Text style={{ color: Colors.white }}>{category.description}</Text>
        <View
          style={{
            marginVertical: 6,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 14,
          }}
        >
          <View
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <Text
              style={{
                color: Colors.primary,
                fontWeight: 800,
                fontSize: 19,
              }}
            >
              ₹
            </Text>
            <Text style={{ color: Colors.white }}>{category.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryItemList;

const styles = StyleSheet.create({});
