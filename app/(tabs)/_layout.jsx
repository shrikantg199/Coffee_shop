import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Colors } from "../../constants/Colors";

import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.gray,
          borderColor: Colors.gray,
        },
        tabBarLabel: () => null,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,

          tabBarActiveTintColor: Colors.primary,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="cart-plus" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="favorite" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="account-circle" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
