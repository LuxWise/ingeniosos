import axiosConfig from "../../axiosconfig";
import { View, Text, StyleSheet, StatusBar, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Module, ModuleColor } from "../../Components/module";
import { useSelector } from "react-redux";
import { Logout } from "../Settings";

export function CommercialDashboard({ navigation }) {
  interface RootState {
    auth: {
      user: {
        name: string;
        id: number;
      };
    };
  }
  const user = useSelector((state: RootState) => state.auth.user);
  const [todayQuote, setTodayQuote] = useState("");
  const [totalQuotes, setTotalQuotes] = useState("");

  const [data, setData] = useState({ id: "0", date: "4/16/2024" });

  useEffect(() => {
    const reload = navigation.addListener("focus", () => {
      axiosConfig
        .get("/quote/counter/quote")
        .then(response => setTodayQuote(response.data.count))
        .catch(err => console.error(err));
      axiosConfig
        .get(`/quote/today?idCommercial=4`)
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
        <Text style={styles.title}>Welcome {user.name}</Text>
      </View>
      <View style={styles.module}>
        <Module
          title="Last quotations"
          type="Quotation"
          id={data.id}
          seeAll={true}
          date={data.date}
        />
      </View>
      <View style={styles.moduleColor}>
        <ModuleColor number={todayQuote} type="Total quotations" />
        <ModuleColor number={totalQuotes} type="Today's quotations" />
      </View>
      <View style={styles.module}>
        <Module
          title="Shipment status"
          type="Shipment"
          id="1326"
          seeAll={false}
          date={data.date}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    marginBottom: 10,
  },
  title: {
    fontFamily: "Mukta",
    fontSize: 30,
    marginTop: 10,
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
