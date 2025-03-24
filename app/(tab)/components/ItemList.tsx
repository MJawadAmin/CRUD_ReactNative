import React from "react";
import { FlatList } from "react-native";
import ItemCard from "./ItemCard";

interface Item {
  id: number;
  name: string;
  details: string;
  image: string | null; // Supports local and remote images
}

interface ItemListProps {
  items: Item[];
  onDelete: (id: number) => void;
  onEdit: (item: Item) => void;
}

export default function ItemList({ items, onDelete, onEdit }: ItemListProps) {
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => String(item.id)} // Ensures id is converted to string safely
      renderItem={({ item }) => (
        <ItemCard item={item} onDelete={onDelete} onEdit={onEdit} />
      )}
    />
  );
}
