import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../models/firebaseConnect";
import CartItems from "../../components/cart/CartItems";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    getCartList();
  }, [user]);

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
      items.push({ id: doc?.id, ...doc?.data() });
    });
    setCartItem(items);
    setLoading(false);
    calculateTotalPrice(items);
  };

  const handleCODProcess = async () => {
    const codData = {
      items: cartItem,
      user: user.id,
      total: totalPrice,
      username: user?.primaryEmailAddress.emailAddress,
      createdAt: new Date(),
      paymentMethod: "Cash on Delivery",
    };
    await addDoc(collection(db, "codOrders"), codData);
    router.push("/Order/confirmation");
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
        height: "100%",
        paddingTop: 60,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View>
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
                  getCartList={getCartList}
                />
              </View>
            )}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              paddingHorizontal: 20,
              bottom: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text style={{ color: Colors.white }}>Total Price</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    color: Colors.primary,
                    fontSize: 24,
                    textAlign: "center",
                    fontWeight: 700,
                  }}
                >
                  ₹
                </Text>
                <Text
                  style={{ color: Colors.white, fontWeight: 400, fontSize: 20 }}
                >
                  {totalPrice.toFixed(2)}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: Colors.primary,
                width: 240,
                borderRadius: 20,
                padding: 12,
              }}
              onPress={handleCODProcess}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: Colors.white,
                  textAlign: "center",
                }}
              >
                Cash on Delivery
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({});
