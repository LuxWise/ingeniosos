import { NavigationContainer } from "@react-navigation/native";
import { HandlerNavigation } from "./src/navigations/HandlerNavigation";
import { Provider as ReduxProvider } from "react-redux";
import { useFonts } from "expo-font";
import { store } from "./src/AppRedux/store";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <HandlerNavigation />
      </NavigationContainer>
    </ReduxProvider>
  );
}
