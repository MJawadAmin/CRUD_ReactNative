import React, { useState, useEffect } from "react";
import { 
  View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert 
} from "react-native";
import * as ImagePicker from "expo-image-picker";

interface Item {
  id: number;
  name: string;
  details: string;
  image: string | null;
}

interface ItemFormProps {
  onSubmit: (item: Item) => void;
  editingItem: Item | null;
}

export default function ItemForm({ onSubmit, editingItem }: ItemFormProps) {
  const [name, setName] = useState(editingItem?.name || "");
  const [details, setDetails] = useState(editingItem?.details || "");
  const [image, setImage] = useState<string | null>(editingItem?.image || null);

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setDetails(editingItem.details);
      setImage(editingItem.image);
    }
  }, [editingItem]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission required to access gallery!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!name || !details) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const newItem: Item = {
      id: editingItem ? editingItem.id : Date.now(),
      name,
      details,
      image,
    };

    onSubmit(newItem);
    setName("");
    setDetails("");
    setImage(null);
  };

  return (
    <View>
      <TextInput placeholder="Enter Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Enter Details" value={details} onChangeText={setDetails} style={styles.input} />
      {image && <Image source={{ uri: image }} style={styles.previewImage} />}

      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick Image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{editingItem ? "Update Item" : "Add Item"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
  previewImage: { width: "100%", height: 150, borderRadius: 8, marginBottom: 10 },
  imageButton: { backgroundColor: "#28A745", padding: 10, alignItems: "center", borderRadius: 5, marginBottom: 10 },
  button: { backgroundColor: "#06453d", padding: 10, alignItems: "center", borderRadius: 5, marginBottom: 10 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
