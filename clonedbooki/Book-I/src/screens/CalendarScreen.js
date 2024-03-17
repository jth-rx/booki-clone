// pa istall nalang neto npm install react-native-calendars

import React from "react";
import { View, Text } from "react-native";
import { Agenda } from "react-native-calendars";

export default function AgendaList() {
  // Sample data representing events for each day
  const items = {
    "2024-03-10": [{ name: "Meeting at 10am" }, { name: "Lunch with Jane" }],
    "2024-03-11": [{ name: "Gym session" }],
    "2024-03-13": [{ name: "Team meeting" }, { name: "Dinner with friends" }],
    "2024-03-14": [
      { name: "Booking ni Neal" },
      { name: "Dinner with friends" },
    ],
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        renderItem={(item) => (
          <View style={{ padding: 20 }}>
            <Text>{item.name}</Text>
          </View>
        )}
        renderEmptyData={() => (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text>No events for this day</Text>
          </View>
        )}
        rowHasChanged={(r1, r2) => r1.name !== r2.name}
      />
    </View>
  );
}
