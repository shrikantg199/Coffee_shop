import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../models/firebaseConnect";
import { useNavigation, useRouter } from "expo-router";
import Favorite from "../../components/favorites/Favorite";

const FavoritesList = () => {
  const [favorite, setFavorites] = useState([]);
  const navigation = useNavigation();
  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
    });
    getFavoriteList();
  }, []);
  const getFavoriteList = async () => {
    const q = query(collection(db, "favorites"));
    setFavorites([]);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setFavorites((prev) => [...prev, { id: doc?.id, ...doc.data() }]);
    });
  };
  return (
    <View style={{ backgroundColor: Colors.gray, flex: 1, padding: 20 }}>
      <FlatList
        data={favorite}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={()=>console.log(item.name)}
            key={item?.id}
            style={{
              backgroundColor: Colors.gray,
              width: 150,
              height: 180,
              borderColor: Colors.white,
              borderWidth: 0.5,
              borderRadius: 20,
            }}
          >
            <Favorite item={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default FavoritesList;

const styles = StyleSheet.create({});
