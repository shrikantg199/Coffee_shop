import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/Colors";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../models/firebaseConnect";
import { useUser } from "@clerk/clerk-expo";

const About = ({ coffeeItems }) => {
  const size = [{ Gram: "250" }, { Gram: "500" }, { Gram: "1000" }];
  const [selected, setSelected] = useState(size[0].Gram);
  const { user } = useUser();
  const addToCart = async () => {
    try {
      const cartQuery = query(
        collection(db, "carts"),
        where("item", "==", coffeeItems?.item),
        where("size", "==", selected),
        where("email", "==", user.primaryEmailAddress?.emailAddress)
      );
      const querySnapshot = await getDocs(cartQuery);
      if (!querySnapshot.empty) {
        ToastAndroid.show("Item is already in the cart", ToastAndroid.BOTTOM);
      } else {
        await addDoc(collection(db, "carts"), {
          item: coffeeItems?.item,
          price: coffeeItems?.price,
          size: selected,
          email: user.primaryEmailAddress?.emailAddress,
          quantity: 1,
        });
        ToastAndroid.show("Item added to cart", ToastAndroid.BOTTOM);
      }
    } catch (error) {
      console.error("Error adding document: ", error);
      ToastAndroid.show(
        `Failed to add item to cart: ${coffeeItems?.item}`,
        ToastAndroid.BOTTOM
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText}>
          {coffeeItems?.subDescription}
        </Text>
        <View style={styles.sizeContainer}>
          <Text style={styles.sizeTitle}>Size</Text>
          <FlatList
            data={size}
            horizontal
            contentContainerStyle={styles.sizeList}
            renderItem={({ item, index }) => (
              <View key={index} style={styles.sizeItem}>
                <TouchableOpacity
                  style={[
                    styles.sizeItem,
                    selected === item?.Gram && styles.selectedSizeItem,
                  ]}
                  onPress={() => setSelected(item?.Gram)}
                >
                  <Text style={styles.sizeText}>{item.Gram}gm</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <View
            style={{
              paddingVertical: 40,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
              marginTop: 10,
              marginHorizontal: 4,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: Colors.white }}>Price</Text>
              <Text
                style={{ color: Colors.white, fontSize: 20, fontWeight: 600 }}
              >
                <Text style={{ color: Colors.primary }}>₹</Text>{" "}
                {coffeeItems?.price}
              </Text>
            </View>
            <TouchableOpacity onPress={addToCart}>
              <Text
                style={{
                  backgroundColor: Colors.primary,
                  width: 250,
                  textAlign: "center",
                  padding: 20,
                  borderRadius: 24,
                  color: Colors.white,
                  fontWeight: 600,
                  fontSize: 18,
                }}
              >
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 420,
  },
  descriptionContainer: {
    backgroundColor: Colors.gray,
    padding: 20,
    flex: 1,
  },
  descriptionTitle: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: "bold",
  },
  descriptionText: {
    paddingVertical: 10,
    color: Colors.white,
  },
  sizeContainer: {
    marginTop: 4,
  },
  sizeTitle: {
    padding: 10,
    color: Colors.white,
    fontSize: 24,
  },
  sizeList: {
    flexDirection: "row",
    gap: 20,
    marginHorizontal: 10,
  },
  sizeItem: {
    backgroundColor: Colors.white,
    padding: 10,
    width: 75,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  sizeText: {
    color: Colors.black,
  },
  selectedSizeItem: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    
  },
  sizeItem: {
    backgroundColor: Colors.white,
    width: 60,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});

export default About;
