import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Prayer } from "../types";

const AddPrayer: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert("Validation Error", "Please enter a prayer title.");
      return;
    }

    const newPrayer: Prayer = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      answered: false,
    };

    try {
      const stored = await AsyncStorage.getItem("prayers");
      const prayers: Prayer[] = stored ? (JSON.parse(stored) as Prayer[]) : [];
      const updated = [...prayers, newPrayer];

      // Persist and wait for completion before navigating
      await AsyncStorage.setItem("prayers", JSON.stringify(updated));

      // reset form
      setTitle("");
      setDescription("");

      // Navigate back reliably:
      if (navigation && typeof navigation.canGoBack === "function" && navigation.canGoBack()) {
        navigation.goBack();
      } else if (navigation && typeof navigation.navigate === "function") {
        // try common screen names as fallback
        navigation.navigate("Prayers");
      }
    } catch (error) {
      console.error("Error saving prayer:", error);
      Alert.alert("Error", "Something went wrong while saving.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>➕ Add New Prayer</Text>

      <TextInput
        style={styles.input}
        placeholder="Prayer Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Prayer Description (optional)"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <View style={styles.buttonContainer}>
        <Button title="Save Prayer" onPress={handleSave} />
      </View>
    </View>
  );
};

export default AddPrayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9fb",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2d6a4f",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    marginTop: 10,
  },
});
