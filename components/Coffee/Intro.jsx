import {
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Colors } from "../../constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useRouter } from "expo-router";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../models/firebaseConnect";
import { useUser } from "@clerk/clerk-expo";

const Intro = ({ coffeeItems }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!coffeeItems?.item || !user?.primaryEmailAddress?.emailAddress) {
      return;
    }
    const checkIfFavorited = async () => {
      try {
        const q = query(
          collection(db, "favorites"),
          where("name", "==", coffeeItems.item),
          where("username", "==", user.primaryEmailAddress.emailAddress)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setIsFavorited(true);
        } else {
          setIsFavorited(false);
        }
      } catch (error) {
        console.error("Error checking favorites: ", error);
      }
    };

    checkIfFavorited();
  }, [coffeeItems?.item, user?.primaryEmailAddress?.emailAddress]);

  const addToFavorite = async () => {
    if (!coffeeItems?.item || !user?.primaryEmailAddress?.emailAddress) {
      ToastAndroid.show("Error: Missing data", ToastAndroid.SHORT);
      return;
    }

    try {
      const q = query(
        collection(db, "favorites"),
        where("name", "==", coffeeItems.item),
        where("username", "==", user.primaryEmailAddress.emailAddress)
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        await addDoc(collection(db, "favorites"), {
          image: coffeeItems?.imageUrl,
          name: coffeeItems?.item,
          rating: coffeeItems?.rating,
          price: coffeeItems?.price,
          username: user.primaryEmailAddress.emailAddress,
        });
        ToastAndroid.show("Added to favorites", ToastAndroid.SHORT);
        setIsFavorited(true);
      } else {
        ToastAndroid.show("Item is already in favorites", ToastAndroid.LONG);
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const removeFromFavorite = async () => {
    if (!coffeeItems?.item || !user?.primaryEmailAddress?.emailAddress) {
      ToastAndroid.show("Error: Missing data", ToastAndroid.SHORT);
      return;
    }

    try {
      const q = query(
        collection(db, "favorites"),
        where("name", "==", coffeeItems.item),
        where("username", "==", user.primaryEmailAddress.emailAddress)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        ToastAndroid.show("Removed from favorites", ToastAndroid.SHORT);
        setIsFavorited(false);
      } else {
        ToastAndroid.show("Item is not in favorites", ToastAndroid.LONG);
      }
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const handleFavoriteToggle = () => {
    if (isFavorited) {
      removeFromFavorite();
    } else {
      addToFavorite();
    }
  };

  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          paddingVertical: 40,
          paddingHorizontal: 20,
          alignItems: "center",
          position: "absolute",
          zIndex: 10,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle-sharp" size={35} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFavoriteToggle}>
          <Fontisto
            name="heart"
            size={25}
            color={isFavorited ? "red" : "white"}
          />
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: coffeeItems?.imageUrl }}
        style={{ width: "100%", height: 450 }}
      />
      <View
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          height: 150,
          marginTop: -150,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <View style={{ padding: 20 }}>
          <Text
            style={{
              fontSize: 28,
              color: Colors.white,
              fontWeight: "600",
            }}
          >
            {coffeeItems?.item}
          </Text>
          <Text style={{ color: Colors.white }}>
            {coffeeItems?.description}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              marginTop: 20,
              marginLeft: 20,
            }}
          >
            <AntDesign name="star" size={24} color={Colors.primary} />
            <Text style={{ color: Colors.white }}>{coffeeItems?.rating}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Intro;
