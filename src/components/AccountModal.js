// src/components/AccountModal.js
import React, { useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useTranslation } from "react-i18next";

export default function AccountModal({ visible, onClose }) {
  const dispatch = useDispatch();
  const employeeId = useSelector((state) => state.auth.employeeId);
  const employeeName = useSelector((state) => state.auth.employeeName);
  const { t } = useTranslation();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [visible]);

  const handleLogout = () => {
    onClose();
    setTimeout(() => {
      dispatch(logout());
    }, 300);
  };

  return (
    <Modal visible={visible} transparent animationType="none">
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          <Pressable style={styles.modalContent} onPress={() => {}}>
            <Text style={styles.title}>{employeeName || "John Doe"}</Text>
            <Text style={styles.info}>Employee ID: {employeeId || "0000"}</Text>
            <Button title={t("logout")} onPress={handleLogout} />
          </Pressable>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
    fontWeight: "bold",
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
});
