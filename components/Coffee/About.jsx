import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../models/firebaseConnect";
import { useAuth, useUser } from "@clerk/clerk-expo";

const About = ({ coffeeItems }) => {
  const size = [{ size: "S" }, { size: "M" }, { size: "L" }];
  const [selectedSize, setSelectedSize] = useState(size[0].size);
  const { user } = useUser();
  const addToCart = async () => {
    try {
      const cartQuery = query(
        collection(db, "carts"),
        where("item", "==", coffeeItems?.item),
        where("size", "==", selectedSize),
        where("email", "==", user.primaryEmailAddress?.emailAddress)
      );
      const querySnapshot = await getDocs(cartQuery);
      if (!querySnapshot.empty) {
        ToastAndroid.show("Item is already in the cart", ToastAndroid.BOTTOM);
      } else {
        await addDoc(collection(db, "carts"), {
          item: coffeeItems?.item,
          price: coffeeItems?.price,
          size: selectedSize,
          email: user.primaryEmailAddress?.emailAddress,
          quantity: 1,
          imageUrl: coffeeItems?.imageUrl,
          description: coffeeItems.description,
        });
        ToastAndroid.show("Item added to cart", ToastAndroid.BOTTOM);
      }
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert("Error", `Failed to add item to cart: ${error.message}`);
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
            keyExtractor={(item) => item.size}
            horizontal
            contentContainerStyle={styles.sizeList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.sizeItem,
                  selectedSize === item.size && styles.selectedSizeItem,
                ]}
                onPress={() => setSelectedSize(item.size)}
              >
                <Text style={styles.sizeText}>{item.size}</Text>
              </TouchableOpacity>
            )}
          />
          <View style={styles.footer}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.priceValue}>
                <Text style={{ color: Colors.primary }}>₹</Text>{" "}
                {coffeeItems?.price}
              </Text>
            </View>
            <TouchableOpacity onPress={addToCart}>
              <Text style={styles.addToCartButton}>Add to Cart</Text>
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

    padding: 8,
    width: 60,
    alignItems: "center",
    borderRadius: 10,
  },
  selectedSizeItem: {
    backgroundColor: Colors.primary,
    color: Colors.white,
  },
  sizeText: {
    color: Colors.black,
  },
  footer: {
    position: "static",
    paddingVertical: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 4,
  },
  priceContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    
  },
  priceLabel: {
    color: Colors.white,
  },
  priceValue: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "600",
  },
  addToCartButton: {
    backgroundColor: Colors.primary,
    width: 250,
    textAlign: "center",
    padding: 20,
    borderRadius: 24,
    color: Colors.white,
    fontWeight: "600",
    fontSize: 18,
  },
});

export default About;
