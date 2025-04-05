// src/navigation/AppNavigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import AuthScreen from "../screens/AuthScreen";
import HomeScreen from "../screens/HomeScreen";
/* import WorkOrderScreen from "../screens/WorkOrderScreen";
 */
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Auth" component={AuthScreen} />
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          {/*           <Stack.Screen name="WorkOrder" component={WorkOrderScreen} />
           */}
        </>
      )}
    </Stack.Navigator>
  );
}
