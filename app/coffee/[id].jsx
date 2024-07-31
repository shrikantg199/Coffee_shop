import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Intro from "../../components/Coffee/Intro";
import { useLocalSearchParams } from "expo-router";
import { db } from "../../models/firebaseConnect";
import { doc, getDoc } from "firebase/firestore";
import About from "../../components/Coffee/About";

const CoffeeList = () => {
  const [coffeeItems, setCoffeeItems] = useState();
  const { id } = useLocalSearchParams();
  console.log(id);
  useEffect(() => {
    getItemList();
  }, []);
  const getItemList = async () => {
    const docref = doc(db, "Coffee_List", id);
    const docSnap = await getDoc(docref);
    if (docSnap.exists()) {
      console.log(docSnap.data());
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

export default CoffeeList;

const styles = StyleSheet.create({});
