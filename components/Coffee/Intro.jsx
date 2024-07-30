import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useRouter } from "expo-router";
const Intro = ({ coffeeItems }) => {
  const router = useRouter();
  return (
    <View>
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            paddingVertical: 40,
            paddingHorizontal: 20,
            alignItems: "center",
            position: "absolute",
            zIndex: 10,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-circle-sharp" size={40} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Fontisto name="heart" size={25} color="red" />
          </TouchableOpacity>
        </View>

        <Image
          source={{ uri: coffeeItems?.imageUrl }}
          style={{ width: "100%", height: 450 }}
        />
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            height: 150,
            marginTop: -150,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <View style={{ padding: 20 }}>
            <Text
              style={{
                fontSize: 28,
                color: Colors.white,

                fontWeight: 600,
              }}
            >
              {coffeeItems?.item}
            </Text>
            <Text style={{ color: Colors.white }}>
              {coffeeItems?.description}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                marginTop: 20,
                marginLeft: 20,
              }}
            >
              <AntDesign name="star" size={24} color={Colors.primary} />
              <Text style={{ color: Colors.white }}>{coffeeItems?.rating}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({});
