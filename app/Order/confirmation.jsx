import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../models/firebaseConnect";

const Confirmation = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const q = query(collection(db, "codOrders"));
        const querySnapshot = await getDocs(q);
        const fetchedOrders = querySnapshot.docs
          .map((doc) => doc.data().items)
          .flat();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    getOrders();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.itemName}>{item?.item}</Text>
        <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Order Details</Text>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 40,
    backgroundColor: "#f9f9f9", // Light background color
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333", // Dark text color for header
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd", // Lighter border color
    backgroundColor: "#fff", // White background for each item
    borderRadius: 8, // Rounded corners for items
    marginBottom: 10, // Spacing between items
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8, // Rounded corners for images
    marginRight: 16, // Space between image and text
  },
  textContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333", // Dark text color for item name
  },
  itemQuantity: {
    fontSize: 14,
    color: "#666", // Lighter text color for quantity
  },
});
