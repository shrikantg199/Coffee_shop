import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryItemList from "./CategoryItemList";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../models/firebaseConnect";

const CategoryItems = () => {
  const [categoryItem, setCategoryItem] = useState([]);
  
  useEffect(() => {
    getcategory();
  }, []);
  const getcategory = async () => {
    const q = query(collection(db, "Coffee_List"));
    setCategoryItem([]);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //console.log(doc.data());
      setCategoryItem((prev) => [...prev, { id: doc?.id, ...doc.data() }]);
    });
  };
  return (
    <View>
      <FlatList
        data={categoryItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#0a0f14",
              height: 220,
              width: 150,
              borderRadius: 20,
              marginTop: 20,
              borderColor: "#808080",
              borderWidth: 0.6,
              
            }}
          >
            <CategoryItemList category={item} />
          </View>
        )}
      />
    </View>
  );
};

export default CategoryItems;

const styles = StyleSheet.create({});
