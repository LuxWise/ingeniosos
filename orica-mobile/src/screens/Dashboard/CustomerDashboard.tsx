import axiosConfig from "../../axiosconfig";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Module, ModuleColor } from "../../Components/module";
import { useSelector } from "react-redux";
import { Logout } from "../Settings";

interface RootState {
  auth: {
    user: {
      name: string;
      id: number;
    };
  };
}

export function CustomerDashboard({ navigation }) {
  const user = useSelector((state: RootState) => state.auth.user);
  const [lastQuoute, setLastQuote] = useState({ id: "0", date: "4/16/2024" });
  const [totalQuotes, setTotalQuotes] = useState("");

  useEffect(() => {
    const reload = navigation.addListener("focus", () => {
      axiosConfig
        .get("/quote")
        .then(response => setLastQuote(response.data[response.data.length - 1]))
        .catch(err => console.error(err));
      axiosConfig
        .get(`/quote/counter?id=${user.id}`)
        .then(response => setTotalQuotes(response.data.count))
        .catch(err => console.log(err));
    });
    return reload;
  }, [navigation]);

  const [fontsLoaded] = useFonts({
    Mukta: require("../../../assets/fonts/Mukta-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView>
      <StatusBar />
      <Logout />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, {user.name}</Text>
      </View>
      <View style={styles.module}>
        <Module
          title="New quotations"
          type="Quotation"
          id={lastQuoute.id}
          seeAll={true}
          date={lastQuoute.date}
        />
      </View>
      <View style={styles.moduleColor}>
        <ModuleColor number={totalQuotes} type="Total quotations" />
        <ModuleColor number={totalQuotes} type="Total quotations" />
      </View>
      <View style={styles.module}>
        <Module
          title="Shipment status"
          type="Shipment"
          id="1326"
          seeAll={false}
          date={lastQuoute.date}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 40,
  },
  title: {
    fontFamily: "Mukta",
    fontSize: 30,
  },
  module: {
    alignItems: "center",
    marginTop: 10,
  },
  moduleColor: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 35,
    gap: 6,

    ...Platform.select({
      ios: {
        marginVertical: 10,
      },
      android: {
        marginVertical: 4,
      },
    }),
  },
});
