// src/screens/AuthScreen.js
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import { useTranslation } from "react-i18next";

export default function AuthScreen() {
  const [employeeId, setEmployeeId] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const verificationRef = useRef(null);

  useEffect(() => {
    if (isCodeSent && verificationRef.current) {
      verificationRef.current.focus();
    }
  }, [isCodeSent]);

  const handleSendCode = () => {
    setIsCodeSent(true);
  };

  const handleVerifyCode = () => {
    dispatch(login());
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.flex}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image
            source={require("../../assets/DGE_logo.png")}
            style={styles.logo}
          />
          <TextInput
            style={styles.input}
            placeholder={t("employeeId")}
            value={employeeId}
            onChangeText={(text) => {
              setEmployeeId(text);
              if (isCodeSent) {
                setIsCodeSent(false);
                setVerificationCode("");
              } // reset when user changes the ID
            }}
            keyboardType="numeric"
          />

          {isCodeSent && (
            <TextInput
              ref={verificationRef}
              style={styles.input}
              placeholder={t("verificationCode")}
              value={verificationCode}
              onChangeText={setVerificationCode}
              keyboardType="numeric"
            />
          )}
          {!isCodeSent ? (
            <Button
              title={t("sendCode")}
              onPress={handleSendCode}
              disabled={!employeeId}
            />
          ) : (
            <Button
              title={t("verifyCode")}
              onPress={handleVerifyCode}
              disabled={!verificationCode}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  logo: {
    width: 300,
    height: 300,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
  },
});
