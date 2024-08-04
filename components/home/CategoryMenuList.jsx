import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../models/firebaseConnect";

const CategoryList = ({ MenuCategories }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState();
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const q = query(collection(db, "Coffee_List"));
    const querySnapshot = await getDocs(q);
    const categoriesArray = [{ name: "All", item: "All" }];
    querySnapshot.forEach((doc) => {
      categoriesArray.push(doc.data());
    });
    setCategories(categoriesArray);
  };

 
  return (
    <View>
      <FlatList
        horizontal={true}
        data={categories}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ marginHorizontal: 10 }}
            onPress={() => {
              MenuCategories(item.item);
              setSelectedCategory(item.item);
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: 500,
                color:
                  item.item === selectedCategory ? "#D17842" : Colors.white,
              }}
            >
              {item.item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({});
