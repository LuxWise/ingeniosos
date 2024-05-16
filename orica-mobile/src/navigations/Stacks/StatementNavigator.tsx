import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { Platform, StyleSheet } from "react-native";
import {
  AdminStatement,
  CommercialStatement,
  CustomerStatement,
  ProformaStatement,
} from "../../screens/Statement";

const Stack = createNativeStackNavigator();

export function StatementNavigator() {
  interface RootState {
    auth: {
      [user: string]: { role: string };
    };
  }

  interface UserType {
    Admin: typeof AdminStatement;
    Commercial: typeof CommercialStatement;
    Customer: typeof CustomerStatement;
    Proforma: typeof ProformaStatement;
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
    Admin: AdminStatement,
    Commercial: CommercialStatement,
    Customer: CustomerStatement,
    Proforma: ProformaStatement,
  };

  if (userType.hasOwnProperty(type)) {
    return (
      <Stack.Navigator screenOptions={commonScreenOptions}>
        <Stack.Screen
          name="Statemet"
          options={{ headerShown: false }}
          component={userType[type]}
        ></Stack.Screen>
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
