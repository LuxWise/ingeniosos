import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import {
  AdminDashboard,
  CommercialDashboard,
  CustomerDashboard,
  ProformaDashboard,
} from "../../screens/Dashboard";
import { useSelector } from "react-redux";
import { Platform, StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

export function DashboardNavigator() {
  interface RootState {
    auth: {
      [user: string]: { role: string };
    };
  }

  interface UserType {
    Admin: typeof AdminDashboard;
    Commercial: typeof CommercialDashboard;
    Customer: typeof CustomerDashboard;
    Proforma: typeof ProformaDashboard;
  }

  const userInfo = useSelector((state: RootState) => state.auth.user);

  const commonScreenOptions: NativeStackNavigationOptions = {
    contentStyle: {
      ...Platform.select({
        ios: styles.backgroundIOS, // Estilo para iOS
        android: styles.backgroundAndroid, // Estilo para Android
      }),
    },
  };

  const type: keyof UserType = userInfo.role as keyof UserType;

  const userType: UserType = {
    Admin: AdminDashboard,
    Commercial: CommercialDashboard,
    Customer: CustomerDashboard,
    Proforma: ProformaDashboard,
  };

  if (userType.hasOwnProperty(type)) {
    return (
      <Stack.Navigator screenOptions={commonScreenOptions}>
        <Stack.Screen
          name="Dashboard"
          options={{ headerShown: false }}
          component={userType[type]}
        />
      </Stack.Navigator>
    );
  } else {
  }
}

const styles = StyleSheet.create({
  backgroundIOS: {
    backgroundColor: "#fff",
  },
  backgroundAndroid: {
    backgroundColor: "#f6f6f6",
  },
});
