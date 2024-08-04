import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
const CategoryItemList = ({ category }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`coffee/${category?.id}`);
        // console.log(`coffee/${category?.id}`);
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
          source={{ uri: category?.imageUrl }}
          style={{
            width: 150,
            height: 110,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        />
      </View>
      <View style={{ marginLeft: 10, marginTop: 10 }}>
        <Text style={{ color: Colors.white, fontSize: 18 }}>
          {category?.item}
        </Text>
        <Text style={{ color: Colors.white }}>{category?.description}</Text>
        <View
          style={{
            marginVertical: 4,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 14,
            alignItems: "center",
          }}
        >
          <View
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 4,
              flex: 1,
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
            <Text style={{ color: Colors.white }}>{category?.price}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              marginLeft: 20,
              flex: 1,
            }}
          >
            <AntDesign name="star" size={20} color={Colors.primary} />
            <Text style={{ color: Colors.white }}>{category?.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryItemList;

const styles = StyleSheet.create({});
