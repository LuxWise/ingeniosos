import React from "react";
import { useFonts } from "expo-font";
import { View, Text, TextInput, StyleSheet, Platform } from "react-native";

interface CustomModul {
  title: string;
  type: string;
  id: string | null;
  seeAll: boolean;
  date: string | null;
}

interface CustomModuleColor {
  type: string;
  number: string;
}

interface CustomModuleShip {
  number: string;
  status: string;
  from: string;
  to: string;
}

interface CustomModuleStatement {
  title: string;
  glaccount: string;
  billing: string;
  assignment: string;
  document: string;
  posting: string;
  amount: string;
}

export const Module: React.FC<CustomModul> = ({
  title,
  type,
  id,
  seeAll,
  date,
}) => {
  const [fontsLoaded] = useFonts({
    Mukta: require("../../../assets/fonts/Mukta-Bold.ttf"),
  });

  if (!fontsLoaded) return null;
  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <Text style={styles.titleModule}>{title}</Text>
      <View style={styles.module}>
        <Text style={styles.titleView}>#{type}</Text>
        <Text style={styles.title}>
          {type} #{id}
        </Text>
        <Text style={styles.date}>Date: {date}</Text>
        {seeAll && <Text style={styles.viewMore}>see all</Text>}
      </View>
    </View>
  );
};

export const ModuleColor: React.FC<CustomModuleColor> = ({ type, number }) => {
  const [fontsLoaded] = useFonts({
    Mukta: require("../../../assets/fonts/Mukta-Bold.ttf"),
  });

  if (!fontsLoaded) return null;
  return (
    <View style={styles.moduleColor}>
      <Text style={styles.title}>{number}</Text>
      <Text style={styles.subtitle}>{type}</Text>
    </View>
  );
};

export const ModuleShip: React.FC<CustomModuleShip> = ({
  number,
  status,
  from,
  to,
}) => {
  const [fontsLoaded] = useFonts({
    Mukta: require("../../../assets/fonts/Mukta-Bold.ttf"),
  });

  if (!fontsLoaded) return null;
  return (
    <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
      <View style={styles.moduleShip}>
        <Text style={styles.title}>Bill of lading</Text>
        <View style={styles.moduleColorShip}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>{number}</Text>
        </View>
        <Text style={styles.title}>Status</Text>
        <View style={styles.moduleColorShip}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>{status}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.title}>From: {from}</Text>
          <Text style={styles.title}>To: {to}</Text>
        </View>
      </View>
    </View>
  );
};

export const ModuleStatemet: React.FC<CustomModuleStatement> = ({
  title,
  glaccount,
  billing,
  assignment,
  document,
  posting,
  amount,
}) => {
  const [fontsLoaded] = useFonts({
    Mukta: require("../../../assets/fonts/Mukta-Bold.ttf"),
  });

  if (!fontsLoaded) return null;
  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <Text style={styles.titleModule}>{title}</Text>
      <View style={styles.moduleStatemet}>
        <View>
          <Text style={styles.titleView}>G/L Account</Text>
          <Text style={styles.titleStatement}>{glaccount}</Text>
        </View>
        <View>
          <Text style={styles.titleView}>Billing Document</Text>
          <Text style={styles.titleStatement}>{billing}</Text>
        </View>
        <View>
          <Text style={styles.titleView}>Assignment</Text>
          <Text style={styles.titleStatement}>{assignment}</Text>
        </View>
        <View>
          <Text style={styles.titleView}>Document number</Text>
          <Text style={styles.titleStatement}>{document}</Text>
        </View>
        <View>
          <Text style={styles.titleView}>Posting Date</Text>
          <Text style={styles.titleStatement}>{posting}</Text>
        </View>
        <View>
          <Text style={styles.titleView}>Amount in Doc. Curr</Text>
          <Text style={styles.titleStatement}>{amount}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  module: {
    width: "85%",

    backgroundColor: "#fff",
    borderRadius: 22,

    paddingVertical: 15,
    paddingHorizontal: 30,

    ...Platform.select({
      ios: {
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 0 },
      },
      android: {
        elevation: 4,
      },
    }),
  },
  moduleColor: {
    width: "50%",
    backgroundColor: "#cff2fc",
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#6dc0e7",
  },
  moduleShip: {
    width: "85%",
    height: "63%",
    gap: 12,

    backgroundColor: "#fff",
    borderRadius: 22,

    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 30,

    ...Platform.select({
      ios: {
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 0 },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  moduleColorShip: {
    width: "60%",
    backgroundColor: "#cff2fc",
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#6dc0e7",

    ...Platform.select({
      ios: {
        paddingVertical: 15,
      },
      android: {
        paddingVertical: 12,
      },
    }),
  },
  moduleStatemet: {
    width: "85%",
    gap: 20,

    backgroundColor: "#fff",
    borderRadius: 22,

    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,

    ...Platform.select({
      ios: {
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 0 },
      },
      android: {
        elevation: 4,
      },
    }),
  },
  titleView: {
    fontFamily: "Mukta",
    color: "#aeafb2",
    fontSize: 16,
  },
  title: {
    fontFamily: "Mukta",
    color: "#080808",
    fontSize: 18,
  },
  titleStatement: {
    fontFamily: "Mukta",
    color: "#080808",
    fontSize: 18,
    paddingLeft: 12,
  },
  subtitle: {
    fontFamily: "Mukta",
    color: "#080808",
    fontSize: 16,
  },
  titleModule: {
    fontFamily: "Mukta",
    color: "#080808",
    fontSize: 22,
    marginRight: 150,
  },
  date: {
    fontFamily: "Mukta",
    color: "#080808",
    fontSize: 18,
    alignItems: "flex-start",
  },
  viewMore: {
    fontFamily: "Mukta",
    color: "#048bca",
    fontSize: 16,
    marginTop: 15,
  },
});
