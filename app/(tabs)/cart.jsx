import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../models/firebaseConnect";
import CartItems from "../../components/cart/CartItems";
import { useUser } from "@clerk/clerk-expo";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { user } = useUser();
  useEffect(() => {
    getCartList();
  }, [user]);
  //console.log(user);
  const getCartList = async () => {
    const q = query(
      collection(db, "carts"),
      where("email", "==", user?.primaryEmailAddress?.emailAddress)
    );
    setLoading(true);
    setCartItem([]);
    const querySnapshot = await getDocs(q);
    let items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
      console.log(doc.data());
    });
    setCartItem(items);
    //console.log(items);
    setLoading(false);
    calculateTotalPrice(items);
  };

  const calculateTotalPrice = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    const updatedItems = cartItem.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItem(updatedItems);
    calculateTotalPrice(updatedItems);
  };

  return (
    <View
      style={{
        backgroundColor: Colors.gray,
        flex: 1,
        paddingTop: 60,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={cartItem}
          onRefresh={getCartList}
          refreshing={loading}
          renderItem={({ item }) => (
            <View
              key={item?.id}
              style={{ marginHorizontal: 8, marginVertical: 4, padding: 4 }}
            >
              <CartItems
                cartItems={item}
                onUpdateQuantity={handleUpdateQuantity}
              />
            </View>
          )}
        />
      )}
      <Text
        style={{
          backgroundColor: Colors.primary,
          paddingHorizontal: 40,
          paddingVertical: 14,
          position: "absolute",
          borderRadius: 20,
          color: Colors.white,
          fontSize: 18,
          bottom: 20,
        }}
      >
        pay ₹{totalPrice.toFixed(2)}
      </Text>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({});
