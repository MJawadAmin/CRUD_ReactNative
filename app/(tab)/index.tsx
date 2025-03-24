import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";

interface Item {
  id: number;
  name: string;
  details: string;
  image: string | null; // Supports both local storage and URLs
}

export default function HomeScreen() {
  const [items, setItems] = useState<Item[]>([]);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const addItem = (item: Item) => {
    setItems((prev) =>
      editingItem ? prev.map((i) => (i.id === editingItem.id ? item : i)) : [...prev, item]
    );
    setEditingItem(null);
  };

  const deleteItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CRUD Operations</Text>
      <ItemForm onSubmit={addItem} item={editingItem} />
      <ItemList items={items} onDelete={deleteItem} onEdit={setEditingItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F8F9FA" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
});
