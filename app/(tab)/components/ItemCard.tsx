import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface Item {
  id: number;
  name: string;
  details: string;
  image: string | null;
}

interface ItemCardProps {
  item: Item;
  onDelete: (id: number) => void;
  onEdit: (item: Item) => void;
}

export default function ItemCard({ item, onDelete, onEdit }: ItemCardProps) {
  return (
    <View style={styles.card}>
      {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.details}>{item.details}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton} onPress={() => onEdit(item)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#fff", padding: 15, marginVertical: 8, borderRadius: 8 },
  image: { width: "100%", height: 150, borderRadius: 8, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: "bold" },
  details: { fontSize: 14, color: "#666", marginBottom: 10 },
  actions: { flexDirection: "row", justifyContent: "space-between" },
  editButton: { backgroundColor: "#FFA500", padding: 8, borderRadius: 5 },
  deleteButton: { backgroundColor: "#FF3B30", padding: 8, borderRadius: 5 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
