import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "../../constants/Colors";
import CategoryList from "../../components/home/CategoryMenuList";
import CategoryItems from "../../components/home/CategoryItems";
const home = () => {
  const { user } = useUser();
  console.log(user.primaryEmailAddress.emailAddress);
  return (
    <View style={{ backgroundColor: "#303134", flex: 1 }}>
      <View
        style={{
          marginTop: 60,
          margin: 30,
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
        <TouchableOpacity>
          <Image
            source={{ uri: user.imageUrl }}
            style={{ width: 40, height: 40, borderRadius: 12 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ width: 300, margin: 30, marginHorizontal: 30 }}>
        <Text style={{ color: Colors.white, fontSize: 35, fontWeight: 700 }}>
          Find the best coffee for you
        </Text>
        <TextInput
          placeholder="coffee"
          style={{
            backgroundColor: "#252A32",
            paddingHorizontal: 12,
            width: 320,
            color: Colors.white,
            paddingVertical: 12,
            marginVertical: 10,
            marginHorizontal: 10,
            borderRadius: 12,
          }}
        />
        <CategoryList />
        <CategoryItems />
      </View>
    </View>
  );
};

export default home;

const styles = StyleSheet.create({});
