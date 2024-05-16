import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screens } from "../utils";
import { ButtomTabsNavigation } from "./ButtomTabs";

const Stack = createNativeStackNavigator();

export function AppNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screens.tab.root}
        component={ButtomTabsNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
