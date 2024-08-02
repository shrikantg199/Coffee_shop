import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";

const CartItems = ({ cartItems, onUpdateQuantity }) => {
  const [count, setCount] = useState(cartItems?.quantity);
  useEffect(() => {
    onUpdateQuantity(cartItems?.id, count);
  }, [count]);
  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrementCount = () => {
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };
  const totalPrice = cartItems?.price * count;
  return (
    <View>
      <View
        style={{
          backgroundColor: Colors.gray,
          width: "100%",
          height: 140,
          padding: 10,
          borderRadius: 20,
          display: "flex",
          flexDirection: "row",
          gap: 20,
          borderColor: Colors.white,
          borderWidth: 0.5,
        }}
      >
        <Image
          resizeMode="cover"
          source={{ uri: cartItems?.imageUrl }}
          style={{ borderRadius: 20, height: 100, width: 150 }}
        />
        <View>
          <View>
            <Text
              style={{ fontSize: 18, fontWeight: 700, color: Colors.white }}
            >
              {cartItems?.item}
            </Text>

            <Text style={{ fontSize: 14, color: Colors.white }}>
              {cartItems?.description}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                padding: 4,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                ₹
              </Text>
              <Text style={{ fontSize: 18, color: Colors.white }}>
                {cartItems.price}
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 14,
                  backgroundColor: "#06AA00",
                  paddingHorizontal: 6,
                  paddingVertical: 4,
                  borderRadius: 6,
                }}
              >
                {cartItems.size}
              </Text>
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              padding: 2,
              flex: 1,
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={decrementCount}>
              <Text
                style={{
                  backgroundColor: Colors.primary,
                  paddingHorizontal: 13,
                  paddingVertical: 7,
                  borderRadius: 8,
                  color: Colors.white,
                  textAlign: "center",

                  fontSize: 14,
                  fontWeight: 900,
                }}
              >
                -
              </Text>
            </TouchableOpacity>

            <Text style={{ fontSize: 20, color: Colors.white }}>{count}</Text>
            <TouchableOpacity onPress={incrementCount}>
              <Text
                style={{
                  backgroundColor: Colors.primary,
                  paddingHorizontal: 13,
                  paddingVertical: 7,
                  borderRadius: 8,
                  color: Colors.white,
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: 900,
                }}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          display: "flex",
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            backgroundColor: Colors.primary,
            padding: 8,
            borderRadius: 14,
            color: Colors.white,
          }}
        >
          ₹ {totalPrice.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default CartItems;

const styles = StyleSheet.create({});
