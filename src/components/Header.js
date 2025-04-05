// src/components/Header.js
import React from "react";
import { View, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import AccountModal from "./AccountModal"; // Adjust the import path as necessary

export default function Header({ showToolButton = false, onToolPress }) {
  const [modalVisible, setModalVisible] = useState(false);
  const onProfilePress = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {showToolButton ? (
        <TouchableOpacity onPress={onToolPress} style={styles.leftIcon}>
          <Ionicons name="hammer" size={24} color="black" />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}

      <TouchableOpacity onPress={onProfilePress} style={styles.rightIcon}>
        <Ionicons name="person-circle-outline" size={36} color="black" />
      </TouchableOpacity>
      <AccountModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  leftIcon: {
    paddingBottom: 8,
    paddingHorizontal: 20,
  },
  rightIcon: {
    paddingBottom: 8,
    paddingHorizontal: 20,
  },
  placeholder: {
    width: 40,
    height: 40,
  },
});
