import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DashboardNavigator,
  ShipmentNavigation,
  StatementNavigator,
} from "../Stacks";
import CustomBottomTab from "./CustomBottomTab";

const Tab = createBottomTabNavigator();

export function ButtomTabsNavigation() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomBottomTab {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardNavigator} />
      <Tab.Screen name="Ship" component={ShipmentNavigation} />
      <Tab.Screen name="Statement" component={StatementNavigator} />
    </Tab.Navigator>
  );
}
