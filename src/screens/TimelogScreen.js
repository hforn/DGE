// src/screens/TimelogScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";

export default function TimelogScreen() {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [now, setNow] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    let interval;
    if (isClockedIn && startTime) {
      setNow(Date.now()); // ensure "now" is set immediately on clock in
      interval = setInterval(() => {
        setNow(Date.now());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isClockedIn, startTime]);

  const handleClockInOut = () => {
    const currentTime = Date.now();
    if (isClockedIn) {
      setIsClockedIn(false);
      setElapsed((prev) => prev + (currentTime - startTime));
      setStartTime(null);
      setNow(null);
    } else {
      setStartTime(currentTime);
      setNow(currentTime);
      setIsClockedIn(true);
    }
  };

  const formatElapsed = (ms) => {
    if (!ms || ms < 0) return "00:00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const displayedTime =
    isClockedIn && startTime && now ? elapsed + (now - startTime) : elapsed;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <Text style={styles.title}>{t("todaysTimeWorked")}</Text>
      <View
        style={[
          styles.clockContainer,
          isClockedIn && { backgroundColor: "#cec" },
        ]}
      >
        <Text style={styles.clock}>{formatElapsed(displayedTime)}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isClockedIn ? "#F66" : "#53c953" },
        ]}
        onPress={handleClockInOut}
      >
        <Text style={styles.buttonText}>
          {isClockedIn ? t("clockOut") : t("clockIn")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10, // ensures it's above map or scroll content
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  clockContainer: {
    alignItems: "center",
    minWidth: 300,
    borderRadius: 18,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  clock: {
    fontSize: 48,
    padding: 10,
  },
  button: {
    marginTop: 40,
    padding: 15,
    borderRadius: 18,
    minWidth: 300,
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});
