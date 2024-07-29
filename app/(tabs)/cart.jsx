import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

const cart = () => {
  return (
    <View style={{ backgroundColor: Colors.gray, flex: 1 }}>
      <Text style={{ color: Colors.white }}>cart</Text>
    </View>
  );
};

export default cart;

const styles = StyleSheet.create({});
