import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Intro from "../../components/Coffee/Intro";
import { useLocalSearchParams } from "expo-router";
import { db } from "../../models/firebaseConnect";
import { doc, getDoc } from "firebase/firestore";
import About from "../../components/Coffee/About";

const CoffeeList = () => {
  const [coffeeItems, setCoffeeItems] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useLocalSearchParams();
  //console.log(id);
  useEffect(() => {
    getItemList();
  }, []);
  const getItemList = async () => {
    const docref = doc(db, "Coffee_List", id);
    setLoading(true);
    const docSnap = await getDoc(docref);
    if (docSnap.exists()) {
      // console.log(docSnap.data());
      setCoffeeItems(docSnap.data());
    }
    setLoading(false);
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* intro */}
      {loading ? (
        <ActivityIndicator
          size={40}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: "70%",
          }}
        />
      ) : (
        <View>
          <Intro coffeeItems={coffeeItems} />
          {/* about */}
          <About coffeeItems={coffeeItems} />
        </View>
      )}
    </ScrollView>
  );
};

export default CoffeeList;

const styles = StyleSheet.create({});
