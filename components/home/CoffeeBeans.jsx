import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CoffeeBeanList from "./CoffeeBeanList";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../models/firebaseConnect";
import { Colors } from "../../constants/Colors";

const CoffeeBeans = () => {
  const [categoryItem, setCategoryItem] = useState([]);
  useEffect(() => {
    getcategory();
  }, []);
  const getcategory = async () => {
    const q = query(collection(db, "Coffee_beans"));
    setCategoryItem([]);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //console.log(doc.data());
      setCategoryItem((prev) => [...prev, { id: doc?.id, ...doc?.data() }]);
    });
  };
  return (
    <View style={{ marginHorizontal: 20 }}>
      <Text
        style={{
          color: Colors.white,
          fontSize: 24,
          marginVertical: 20,
        }}
      >
        Coffee Beans
      </Text>
      <View>
        <FlatList
          data={categoryItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View
              key={item?.id}
              style={{
                backgroundColor: "#0a0f14",
                height: 190,
                width: 150,
                borderRadius: 20,
                margin: 8,
                borderColor: "#808080",
                borderWidth: 0.6,
              }}
            >
              <CoffeeBeanList category={item} />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default CoffeeBeans;

const styles = StyleSheet.create({});
