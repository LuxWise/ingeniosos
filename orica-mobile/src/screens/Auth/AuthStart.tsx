import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomInput, CustomInputLogin } from "../../Components/inputs";
import { CustomButtom, CustomButtomLogin } from "../../Components/buttoms";
import { useSelector } from "react-redux";
import { useFonts } from "expo-font";
import {
  setPassword,
  setUser,
  setUserName,
} from "../../AppRedux/slices/authSlice";

export function AuthStart() {
  interface RootState {
    auth: {
      username: string;
      password: string;
    };
  }
  const userCredentials = useSelector((state: RootState) => state.auth);

  const [fontsLoaded] = useFonts({
    Mukta: require("../../../assets/fonts/Mukta-Bold.ttf"),
  });
  if (!fontsLoaded) return null;

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.container}>
        <Image
          source={{ uri: "https://orica.ingeniososweb.com/img/Orica_Logo.png" }}
          style={{ width: 210, height: 125 }}
        />
      </View>
      <View style={{ gap: 20 }}>
        <CustomInputLogin
          title="Username"
          setValue={setUserName}
          secureText={false}
        />
        <CustomInputLogin
          title="Password"
          setValue={setPassword}
          secureText={true}
        />
      </View>
      <View style={styles.module}>
        <CustomButtomLogin
          title="Login"
          username={userCredentials.username}
          password={userCredentials.password}
          action={setUser}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Mukta",
    fontSize: 40,
    marginTop: 10,
  },
  module: {
    alignItems: "center",
    marginTop: 60,
  },
  moduleColor: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 35,
    gap: 5,
  },
});
