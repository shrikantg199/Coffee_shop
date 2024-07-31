import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import { useLocalSearchParams } from "expo-router";
import { db } from "../../models/firebaseConnect";
import { doc, getDoc } from "firebase/firestore";
import Intro from "../../components/coffeebeans/Intro";
import About from "../../components/coffeebeans/About";

const CoffeeBeans = () => {
  const [coffeeItems, setCoffeeItems] = useState();
  const { id } = useLocalSearchParams();
  //console.log(id);
  useEffect(() => {
    getItemList();
  }, []);
  const getItemList = async () => {
    const docref = doc(db, "Coffee_beans", id);
    const docSnap = await getDoc(docref);
    if (docSnap.exists()) {
      //console.log(docSnap.data());
      setCoffeeItems(docSnap.data());
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* intro */}
      <Intro coffeeItems={coffeeItems} />
      {/* about */}
      <About coffeeItems={coffeeItems} />
    </ScrollView>
  );
};

export default CoffeeBeans;

const styles = StyleSheet.create({});
