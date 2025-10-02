import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PrayerItem from "../components/PrayerItem";
import { Prayer } from "../types";
import { useIsFocused } from "@react-navigation/native";

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const isFocused = useIsFocused();

  const loadPrayers = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem("prayers");
      if (stored) {
        setPrayers(JSON.parse(stored) as Prayer[]);
      } else {
        setPrayers([]);
      }
    } catch (err) {
      console.error("Error loading prayers:", err);
    }
  }, []);

  useEffect(() => {
    // load on mount and every time screen gains focus
    if (isFocused) {
      loadPrayers();
    }
  }, [isFocused, loadPrayers]);

  const savePrayers = async (newPrayers: Prayer[]) => {
    try {
      setPrayers(newPrayers);
      await AsyncStorage.setItem("prayers", JSON.stringify(newPrayers));
    } catch (err) {
      console.error("Error saving prayers:", err);
    }
  };

  const markAsAnswered = async (id: string) => {
    const updated: Prayer[] = prayers.map((p) =>
      p.id === id ? { ...p, answered: true } : p
    );
    await savePrayers(updated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🙏 Active Prayers</Text>

      {prayers.filter((p) => !p.answered).length === 0 ? (
        <Text style={styles.emptyText}>No active prayers yet.</Text>
      ) : (
        <FlatList
          data={prayers.filter((p) => !p.answered)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PrayerItem prayer={item} onAnswer={markAsAnswered} />
          )}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="➕ Add Prayer"
          onPress={() => navigation.navigate("AddPrayer")}
        />
        <Button
          title="✅ Answered Prayers"
          onPress={() => navigation.navigate("Answered")}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9fb",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 40,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
