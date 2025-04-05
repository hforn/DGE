// src/components/WorkOrderListItem.js
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const logoMap = {
  Costco: {
    source: require("../../assets/Costco_Wholesale_logo.png"),
    style: { maxWidth: 65, aspectRatio: 1.8, marginRight: 10 },
  },
  "Restaurant Depot": {
    source: require("../../assets/Restaurant_Depot_logo.png"),
    style: { maxHeight: 36, width: 36, marginRight: 10 },
  },
  DPI: {
    source: require("../../assets/dpi_logo.png"),
    style: { maxHeight: 36, width: 36, marginRight: 10 },
  },
};

export default function WorkOrderListItem({ workOrder }) {
  const {
    id,
    customer,
    department,
    jobDesc,
    location,
    status,
    scheduledTime,
    startTime,
    manHours,
    assignedWorkers = [],
    activeWorkers = [],
    completedWorkers = [],
  } = workOrder;

  const logoData = logoMap[customer] || {
    source: require("../../assets/dpi_logo.png"),
    style: { height: 36, width: undefined, aspectRatio: 1.8, marginRight: 10 },
  };

  const getScheduledDayDiff = (isoTime) => {
    if (!isoTime) return null;
    const date = new Date(isoTime);
    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const startOfScheduled = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const msInDay = 24 * 60 * 60 * 1000;
    return Math.floor((startOfScheduled - startOfToday) / msInDay);
  };

  const getScheduledStyle = (isoTime) => {
    const dayDiff = getScheduledDayDiff(isoTime);
    if (dayDiff === 0) return { backgroundColor: "#f99" };
    if (dayDiff === 1) return { backgroundColor: "#fc8" };
    if (dayDiff > 1 && dayDiff <= 6) return { backgroundColor: "#ff9" };
    return {};
  };

  const formatScheduledTime = (scheduledTime) => {
    if (!scheduledTime) return "";
    const date = new Date(scheduledTime);
    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const startOfScheduled = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const msInDay = 24 * 60 * 60 * 1000;
    const dayDiff = Math.floor((startOfScheduled - startOfToday) / msInDay);
    const timeString = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
    if (dayDiff === 0) return `Today ${timeString}`;
    if (dayDiff === 1) return `Tomorrow ${timeString}`;
    if (dayDiff > 1 && dayDiff <= 6) {
      const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });
      return `${dayOfWeek} ${timeString}`;
    }
    return `${date.getMonth() + 1}/${date.getDate()} ${timeString}`;
  };

  const renderStatus = () => {
    switch (status) {
      case "unscheduled":
        return (
          <View style={styles.statusContainer}>
            <Ionicons
              name="remove-circle-outline"
              size={32}
              color="#999"
              style={styles.statusIcon}
            />
            <Text style={styles.statusLabel}>Unscheduled</Text>
          </View>
        );
      case "scheduled":
        return (
          <View style={styles.statusContainer}>
            <Ionicons
              name="calendar-outline"
              size={30}
              color="#3b82f6"
              style={styles.statusIcon}
            />
            <Text style={styles.statusLabel}>Scheduled</Text>
          </View>
        );
      case "in_progress":
        return (
          <View style={styles.statusContainer}>
            <Ionicons
              name="time-outline"
              size={32}
              color="#eab308"
              style={styles.statusIcon}
            />
            <Text style={styles.statusLabel}>In Progress</Text>
          </View>
        );
      case "completed":
        return (
          <View style={styles.statusContainer}>
            <Ionicons
              name="checkmark-circle-outline"
              size={32}
              color="#22c55e"
              style={styles.statusIcon}
            />
            <Text style={styles.statusLabel}>Completed</Text>
          </View>
        );
      default:
        return null;
    }
  };

  const renderPeople = () => {
    let label = "";
    let people = [];
    switch (status) {
      case "scheduled":
        label = "Assigned";
        people = assignedWorkers;
        break;
      case "in_progress":
        label = "Active";
        people = activeWorkers;
        break;
      case "completed":
        label = "Completed by";
        people = completedWorkers;
        break;
      default:
        return null;
    }
    return (
      <View style={styles.peopleContainer}>
        <Text style={styles.peopleLabel}>{label}:</Text>
        <Text style={styles.peopleText} numberOfLines={1} ellipsizeMode="tail">
          {people.map((p) => `(${p.role}) ${p.name}`).join(", ")}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.card}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <Image
          source={logoData.source}
          style={logoData.style}
          resizeMode="contain"
        />
        <View style={styles.titleContainer}>
          <Text
            style={styles.title}
            numberOfLines={1}
            ellipsizeMode="tail"
          >{`${customer} ${department ? department + " " : ""}- (${id})`}</Text>
          <Text style={styles.desc} numberOfLines={1} ellipsizeMode="tail">
            {jobDesc.length > 50 ? `${jobDesc.slice(0, 50)}...` : jobDesc}
          </Text>
        </View>
      </View>

      {/* Middle Row */}
      <View style={styles.middleRow}>
        <View style={styles.locationRow}>
          <Text style={styles.city}>{`${location.city},`}</Text>
          <Text style={styles.street} numberOfLines={1} ellipsizeMode="tail">
            {location.street}
          </Text>
        </View>
        {(scheduledTime || startTime || manHours) && (
          <Text style={[styles.timeText, getScheduledStyle(scheduledTime)]}>
            {status === "scheduled" && formatScheduledTime(scheduledTime)}
            {status === "in_progress" &&
              `Started: ${new Date(startTime).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}`}
            {status === "completed" && `Man hours: ${manHours}`}
          </Text>
        )}
      </View>

      {/* Bottom Row */}
      <View style={styles.bottomRow}>
        {renderStatus()}
        {renderPeople()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 2,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "flex-start",
    marginTop: -4,
  },
  desc: {
    fontSize: 15,
    textDecorationLine: "underline",
    textDecorationColor: "#000",
  },
  middleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "baseline",
    flex: 1,
    marginRight: 6,
  },
  city: {
    color: "#000",
    fontSize: 16,
    marginRight: 2,
  },
  street: {
    flex: 1,
    color: "#222",
    fontSize: 13,
  },
  timeText: {
    fontSize: 15,
    flexShrink: 0,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  bottomRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: -14,
  },
  peopleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  peopleLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#444",
  },
  peopleText: {
    fontSize: 13,
    color: "#444",
    flex: 1,
  },
  statusContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    flexShrink: 0,
  },
  statusIcon: {
    marginLeft: 4,
    paddingBottom: 6,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
