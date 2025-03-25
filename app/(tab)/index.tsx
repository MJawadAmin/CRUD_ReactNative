import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ItemForm from "./components/ItemForm"; // Adjust path if needed

interface Item {
  id: number;
  name: string;
  details: string;
  image: string | null;
}

export default function HomeScreen() {
  const [items, setItems] = useState<Item[]>([]);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem("items");
      if (storedItems) setItems(JSON.parse(storedItems));
    } catch (error) {
      console.error("Failed to load items:", error);
    }
  };

  const saveItems = async (newItems: Item[]) => {
    try {
      await AsyncStorage.setItem("items", JSON.stringify(newItems));
    } catch (error) {
      console.error("Failed to save items:", error);
    }
  };

  const handleItemSubmit = (newItem: Item) => {
    let updatedItems: Item[];
    if (editingItem) {
      updatedItems = items.map((item) =>
        item.id === newItem.id ? newItem : item
      );
      setEditingItem(null);
    } else {
      updatedItems = [...items, newItem];
    }

    setItems(updatedItems);
    saveItems(updatedItems);
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
  };

  const handleDelete = (id: number) => {
    Alert.alert("Confirm", "Are you sure you want to delete this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          const updatedItems = items.filter((item) => item.id !== id);
          setItems(updatedItems);
          saveItems(updatedItems);
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ItemForm onSubmit={handleItemSubmit} editingItem={editingItem} />

      <View style={styles.listContainer}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              {item.image && <Image source={{ uri: item.image }} style={styles.itemImage} />}
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemDetails}>{item.details}</Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }} // Ensures scrolling space at the bottom
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  listContainer: { flex: 1 }, // Ensures the list takes up available space
  item: { padding: 15, backgroundColor: "#f9f9f9", marginTop: 10, borderRadius: 5 },
  itemImage: { width: "100%", height: 100, borderRadius: 5 },
  itemText: { fontWeight: "bold", fontSize: 18, marginTop: 5 },
  itemDetails: { fontSize: 14, color: "#666" },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  editButton: { backgroundColor: "#007bff", padding: 8, borderRadius: 5, flex: 1, alignItems: "center", marginRight: 5 },
  deleteButton: { backgroundColor: "#dc3545", padding: 8, borderRadius: 5, flex: 1, alignItems: "center", marginLeft: 5 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

