import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Colors } from "../../constants/Colors";

const profile = () => {
  const { signOut } = useAuth();
  return (
    <View style={{ backgroundColor: Colors.gray, flex: 1, padding: 80 }}>
      <TouchableOpacity>
        <Text style={{ color: Colors.white }} onPress={() => signOut()}>
          profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({});
