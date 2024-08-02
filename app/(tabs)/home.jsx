import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "../../constants/Colors";
import CategoryList from "../../components/home/CategoryMenuList";
import CategoryItems from "../../components/home/CategoryItems";
import CoffeeBeans from "../../components/home/CoffeeBeans";
import { useNavigation } from "expo-router";
const home = () => {
  const { user } = useUser();
  console.log(user.primaryEmailAddress.emailAddress);
  const navigation = useNavigation();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: Colors.gray, flex: 1 }}
    >
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 60,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity>
          <Image
            resizeMode="contain"
            source={require("../../assets/menu.png")}
            style={{ width: 33, height: 33 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("profile")}>
          <Image
            source={{ uri: user.imageUrl }}
            style={{ width: 40, height: 40, borderRadius: 12 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ width: 250, marginHorizontal: 30 }}>
        <Text style={{ color: Colors.white, fontSize: 40, fontWeight: 700 }}>
          Find the best coffee for you
        </Text>
        <TextInput
          placeholder="coffee"
          style={{
            backgroundColor: Colors.white,
            paddingHorizontal: 12,
            width: 320,
            color: Colors.white,
            paddingVertical: 6,
            marginVertical: 10,
            marginHorizontal: 10,
            borderRadius: 12,
          }}
        />
        <CategoryList />
        <CategoryItems />
        <CoffeeBeans />
      </View>
    </ScrollView>
  );
};

export default home;

const styles = StyleSheet.create({});
