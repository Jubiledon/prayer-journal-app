import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Prayer } from "../types";

const AnsweredScreen: React.FC = () => {
  const [prayers, setPrayers] = useState<Prayer[]>([]);

  useEffect(() => {
    loadPrayers();
  }, []);

  const loadPrayers = async () => {
    const stored = await AsyncStorage.getItem("prayers");
    if (stored) setPrayers(JSON.parse(stored));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✅ Answered Prayers</Text>

      {prayers.filter((p) => p.answered).length === 0 ? (
        <Text style={styles.emptyText}>No answered prayers yet.</Text>
      ) : (
        <FlatList
          data={prayers.filter((p) => p.answered)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.prayerCard}>
              <Text style={styles.prayerTitle}>{item.title}</Text>
              <Text style={styles.prayerDescription}>{item.description}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default AnsweredScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9fb",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2d6a4f",
    marginBottom: 15,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 40,
  },
  prayerCard: {
    backgroundColor: "#e6f4ea",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#cce3d4",
  },
  prayerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1b4332",
  },
  prayerDescription: {
    fontSize: 15,
    color: "#333",
    marginTop: 5,
  },
});
