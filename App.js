// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./src/store";
import AuthNavigator from "./src/navigation/AuthNavigator";
import "./src/localization/i18n";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </Provider>
  );
}
