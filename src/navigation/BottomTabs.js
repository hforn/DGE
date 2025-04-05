// src/navigation/BottomTabs.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import TimelogScreen from "../screens/TimelogScreen";
import MaterialsScreen from "../screens/MaterialsScreen";
import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === t("timelog")) {
            iconName = focused ? "time" : "time-outline";
          } else if (route.name === t("materials")) {
            iconName = focused ? "cube" : "cube-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name={t("timelog")} component={TimelogScreen} />
      <Tab.Screen name={t("materials")} component={MaterialsScreen} />
    </Tab.Navigator>
  );
}
