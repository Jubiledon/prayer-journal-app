import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Prayer } from "../types";

interface PrayerItemProps {
  prayer: Prayer;
  onAnswer: (id: string) => void;
}

export default function PrayerItem({ prayer, onAnswer }: PrayerItemProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{prayer.title}</Text>
      {prayer.description ? (
        <Text style={styles.description}>{prayer.description}</Text>
      ) : null}
      {!prayer.answered && (
        <View style={styles.buttonWrap}>
          <Button title="Mark as Answered" onPress={() => onAnswer(prayer.id)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 2,
    borderColor: "#ececec",
    borderWidth: 1,
  },
  title: { fontWeight: "bold", fontSize: 16, color: "#222" },
  description: { marginTop: 6, color: "#555" },
  buttonWrap: { marginTop: 10, alignSelf: "flex-start" },
});
