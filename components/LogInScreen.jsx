import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Text, View, Button, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { Colors } from "@/constants/Colors";
export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/home", { scheme: "myapp" }),
        });

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View
      style={{
        backgroundColor: Colors.gray,
        height: 900,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        flex: 1,
      }}
    >
      <View style={{}}>
        <Image
          source={require("../assets/image.png")}
          style={{ height: 250, width: 200 }}
          resizeMode="contain"
        />
      </View>
      <View style={{ paddingTop: 150 }}>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            paddingHorizontal: 80,
            padding: 14,
            borderRadius: 30,
          }}
          onPress={onPress}
        >
          <Text
            style={{ color: Colors.white, fontSize: 20, textAlign: "center" }}
          >
            Lets Get started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SignInWithOAuth;
