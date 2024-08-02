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
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../models/firebaseConnect";
import { useNavigation, useRouter } from "expo-router";
import Favorite from "../../components/favorites/Favorite";
import { useUser } from "@clerk/clerk-expo";

const FavoritesList = () => {
  const [favorite, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();
  const { user } = useUser();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
    });
    getFavoriteList();
    getFavoriteCategory();
  }, []);
  const getFavoriteList = async () => {
    setLoading(true);
    const q = query(
      collection(db, "favorites"),
      where("username", "==", user?.primaryEmailAddress?.emailAddress)
    );

    setFavorites([]);

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setFavorites((prev) => [...prev, { id: doc?.id, ...doc.data() }]);
    });
    setLoading(false);
  };
  const getFavoriteCategory = async (name) => {
    const q = query(collection(db, "Coffee_List"), where("item", "==", name));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //console.log(doc.id);
      router.push(`coffee/${doc?.id}`);
    });
  };
  return (
    <View style={{ backgroundColor: Colors.gray, flex: 1, padding: 20 }}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={favorite}
          horizontal
          onRefresh={getFavoriteList}
          refreshing={loading}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => getFavoriteCategory(item.name)}
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
      )}
    </View>
  );
};

export default FavoritesList;

const styles = StyleSheet.create({});
