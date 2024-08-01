import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";

const Favorite = ({ item }) => {
  return (
    <View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: item.image }}
          style={{
            height: 100,
            width: 150,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: Colors.white,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          padding: 4,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: Colors.gray,
            padding: 3,
            fontWeight: 700,
          }}
        >
          {item.name}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            padding: 8,
          }}
        >
          <Text style={{ color: Colors.gray, fontWeight: 700 }}>
            {item.price}
          </Text>
          <View style={{display:"flex",justifyContent:"center",flexDirection:"row",alignItems:"center", gap:4}}>
            <AntDesign name="star" size={24} color={Colors.primary} />
            <Text style={{ color: Colors.gray, fontWeight: 700 }}>
            {item.rating}
          </Text>
          </View>
          
        </View>
      </View>
    </View>
  );
};

export default Favorite;

const styles = StyleSheet.create({});
