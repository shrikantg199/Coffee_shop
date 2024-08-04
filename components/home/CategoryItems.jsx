import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import CategoryItemList from "./CategoryItemList";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../models/firebaseConnect";
import CategoryList from "./CategoryMenuList";

const CategoryItems = () => {
  const [categoryItem, setCategoryItem] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getCategoryItems(selectedCategory);
  }, [selectedCategory]);

  const getCategoryItems = async (item) => {
    const q =
      item === "All"
        ? query(collection(db, "Coffee_List"))
        : query(collection(db, "Coffee_List"), where("item", "==", item));

    setCategoryItem([]);
    setLoading(true);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setCategoryItem((prev) => [...prev, { id: doc?.id, ...doc?.data() }]);
    });
    setLoading(false);
  };

  return (
    <View style={{ width: "100%" }}>
      <CategoryList
        MenuCategories={(value) => {
          console.log(value);
          setSelectedCategory(value);
        }}
      />
      {loading ? (
        <ActivityIndicator
          size={40}
          style={{
            flex: 1,
            justifyContent: "center",
            marginTop: 40,
            alignItems: "center",
            padding: 20,
          }}
        />
      ) : (
        <FlatList
          data={categoryItem}
          horizontal={true}
          refreshing={loading}
          onRefresh={getCategoryItems}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View
              key={item?.id}
              style={{
                backgroundColor: "#0a0f14",
                height: 200,
                width: 150,
                borderRadius: 20,
                marginTop: 20,
                borderColor: "#808080",
                borderWidth: 0.6,
                marginHorizontal: 5,
              }}
            >
              <CategoryItemList category={item} />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default CategoryItems;

const styles = StyleSheet.create({});
