import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { AuthStart, Login } from "../../screens/Auth";
import { screens } from "../../utils";

const Stack = createNativeStackNavigator();

export function AuthNavigation() {
  const commonScreenOptions: NativeStackNavigationOptions = {
    contentStyle: {
      backgroundColor: "#fff",
    },
  };

  return (
    <Stack.Navigator screenOptions={commonScreenOptions}>
      <Stack.Screen
        name={screens.auth.authStartScreen}
        component={AuthStart}
        options={{ headerShown: false }} // Específico para esta pantalla
      />
      <Stack.Screen
        name={screens.auth.loginScreen}
        component={Login}
        options={{ title: "Login" }} // Específico para esta pantalla
      />
    </Stack.Navigator>
  );
}
