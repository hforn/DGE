// src/screens/HomeScreen.js
import React from "react";
import {
  View,
  SectionList,
  StyleSheet,
  SafeAreaView,
  Text,
} from "react-native";
import WorkOrderListItem from "../components/WorkOrderListItem";

export default function HomeScreen() {
  const workOrders = {
    inProgress: [
      {
        id: "W2469",
        customer: "DPI",
        department: undefined,
        jobDesc: "Run branch circuit for new printers",
        location: {
          street: "13257 Kirkham Way",
          city: "Poway",
          state: "CA",
          zip: "92064",
        },
        status: "completed",
        completedTime: "2025-04-16T07:00:00-07:00",
        manHours: "5.5",
        completedWorkers: [
          { role: "L", name: "Jose" },
          { role: "H", name: "Gerardo" },
        ],
      },
      {
        id: "W2468",
        customer: "Costco",
        department: "Pharmacy",
        jobDesc: "Troubleshoot intermittent power loss to the pharmacy printer",
        location: {
          street: "12155 Tech Center Dr",
          city: "Poway",
          state: "CA",
          zip: "92064",
        },
        status: "in_progress",
        startTime: "2025-04-12T07:00:00-07:00",
        activeWorkers: [
          { role: "L", name: "Jose" },
          { role: "H", name: "Gerardo" },
        ],
      },
      {
        id: "W2467",
        customer: "Costco",
        department: "Optical",
        jobDesc:
          "Swap breakers in panel 4A and replace 2x4 lights in the optical department",
        location: {
          street: "12155 Tech Center Dr",
          city: "Poway",
          state: "CA",
          zip: "92064",
        },
        status: "in_progress",
        startTime: "2025-04-13T07:00:00-07:00",
        activeWorkers: [
          { role: "L", name: "Jose" },
          { role: "H", name: "Gerardo" },
        ],
      },
    ],
    assigned: [
      {
        id: "W2466",
        customer: "Restaurant Depot",
        department: undefined,
        jobDesc: "Install exterior wall lights",
        location: {
          street: "700 Rancheros Dr",
          city: "San Marcos",
          state: "CA",
          zip: "92069",
        },
        status: "scheduled",
        scheduledTime: "2025-04-05T07:00:00-07:00",
        assignedWorkers: [
          { role: "L", name: "Jose" },
          { role: "H", name: "Gerardo" },
        ],
      },
      {
        id: "W2465",
        customer: "Costco",
        department: "Bakery",
        jobDesc: "Relocate circuit 12 and install drop cables on aisle 13",
        location: {
          street: "12155 Tech Center Dr",
          city: "Poway",
          state: "CA",
          zip: "92064",
        },
        status: "scheduled",
        scheduledTime: "2025-04-06T09:30:00-07:00",
        assignedWorkers: [
          { role: "L", name: "Jose" },
          { role: "H", name: "Gerardo" },
        ],
      },
      {
        id: "W2464",
        customer: "Costco",
        department: "Bakery",
        jobDesc: "Install circuits for the new ovens and install drop cables",
        location: {
          street: "12155 Tech Center Dr",
          city: "Poway",
          state: "CA",
          zip: "92064",
        },
        status: "scheduled",
        scheduledTime: "2025-04-09T07:00:00-07:00",
        assignedWorkers: [
          { role: "L", name: "Jose" },
          { role: "H", name: "Gerardo" },
        ],
      },
    ],
    unassigned: [
      {
        id: "W2463",
        customer: "Costco",
        department: undefined,
        jobDesc: "Run conduit for EV chargers in the parking lot",
        location: {
          street: "12155 Tech Center Dr",
          city: "Poway",
          state: "CA",
          zip: "92064",
        },
        status: "unscheduled",
        receivedTime: "2025-04-13T07:00:00-07:00",
      },
      {
        id: "W2462",
        customer: "Costco",
        department: "Deli",
        jobDesc: "Troubleshoot tripping deli circuits",
        location: {
          street: "12155 Tech Center Dr",
          city: "Poway",
          state: "CA",
          zip: "92064",
        },
        status: "unscheduled",
        receivedTime: "2025-04-15T07:00:00-07:00",
      },
      {
        id: "W2461",
        customer: "Costco",
        department: undefined,
        jobDesc: "Install drop cables for card scanners",
        location: {
          street: "12155 Tech Center Dr",
          city: "Poway",
          state: "CA",
          zip: "92064",
        },
        status: "unscheduled",
        receivedTime: "2025-04-10T07:00:00-07:00",
      },
    ],
  };

  const sortDesc = (a, b, key) => new Date(b[key]) - new Date(a[key]);
  const sortAsc = (a, b, key) => new Date(a[key]) - new Date(b[key]);

  const sections = [
    workOrders.inProgress.length > 0 && {
      title: "In Progress",
      data: [...workOrders.inProgress].sort((a, b) =>
        sortDesc(a, b, "startTime")
      ),
    },
    workOrders.assigned.length > 0 && {
      title: "Assigned to Me",
      data: [...workOrders.assigned].sort((a, b) =>
        sortAsc(a, b, "scheduledTime")
      ),
    },
    workOrders.unassigned.length > 0 && {
      title: "Unassigned",
      data: [...workOrders.unassigned].sort((a, b) =>
        sortAsc(a, b, "receivedTime")
      ),
    },
  ].filter(Boolean);

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <WorkOrderListItem workOrder={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
        contentContainerStyle={styles.content}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#ddd",
    paddingVertical: 6,
    paddingHorizontal: 12,
    gap: 6,
  },
});
