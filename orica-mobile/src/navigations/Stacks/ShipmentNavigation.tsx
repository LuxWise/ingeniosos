import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { screens } from "../../utils";
import {
  AdminShip,
  CommercialShip,
  CustomerShip,
  Timeline,
} from "../../screens/Shipment";
import { Platform, StyleSheet } from "react-native";
import AdminStatement from "../../screens/Statement/AdminStatement";
import ProformaShip from "../../screens/Shipment/ProformaShip";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

export function ShipmentNavigation() {
  interface RootState {
    auth: {
      [user: string]: { role: string };
    };
  }

  interface UserType {
    Admin: typeof AdminStatement;
    Commercial: typeof CommercialShip;
    Customer: typeof CommercialShip;
    Proforma: typeof ProformaShip;
  }

  const userInfo = useSelector((state: RootState) => state.auth.user);

  const commonScreenOptions: NativeStackNavigationOptions = {
    contentStyle: {
      ...Platform.select({
        ios: styles.backgroundIOS,
        android: styles.backgroundAndroid,
      }),
    },
  };

  const type: keyof UserType = userInfo.role as keyof UserType;

  const userType: UserType = {
    Admin: AdminShip,
    Commercial: CommercialShip,
    Customer: CustomerShip,
    Proforma: ProformaShip,
  };

  if (userType.hasOwnProperty(type)) {
    return (
      <Stack.Navigator screenOptions={commonScreenOptions}>
        <Stack.Screen
          name="Ship"
          options={{ headerShown: false }}
          component={userType[type]}
        />
        <Stack.Screen
          name={screens.tab.shipment.timelineScreen}
          options={{ headerShown: false }}
          component={Timeline}
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
