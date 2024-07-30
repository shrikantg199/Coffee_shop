import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

const About = ({ coffeeItems }) => {
  const size = [{ size: "S" }, { size: "M" }, { size: "L" }];

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
              <View style={styles.sizeItem}>
                <Text style={styles.sizeText}>{item.size}</Text>
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
              marginTop: 40,
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
  sizeText: {
    color: Colors.black,
  },
});

export default About;
