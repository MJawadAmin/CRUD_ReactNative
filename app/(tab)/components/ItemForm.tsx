import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker"; // ✅ Use Expo's ImagePicker

interface Item {
  id: number;
  name: string;
  details: string;
  image: string | null;
}

interface ItemFormProps {
  onSubmit: (item: Item) => void;
  item?: Item | null;
}

export default function ItemForm({ onSubmit, item }: ItemFormProps) {
  const [name, setName] = useState(item ? item.name : "");
  const [details, setDetails] = useState(item ? item.details : "");
  const [image, setImage] = useState<string | null>(item ? item.image : null);

  // ✅ Request Permission Before Picking an Image
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
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
    if (!name || !details) return;
    onSubmit({ id: item?.id || Date.now(), name, details, image });
    setName("");
    setDetails("");
    setImage(null);
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Enter Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Enter Details" value={details} onChangeText={setDetails} style={styles.input} />
      {image && <Image source={{ uri: image }} style={styles.previewImage} />}
      
      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick Image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{item ? "Update Item" : "Add Item"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
  previewImage: { width: "100%", height: 150, borderRadius: 8, marginBottom: 10 },
  imageButton: { backgroundColor: "#28A745", padding: 10, alignItems: "center", borderRadius: 5, marginBottom: 10 },
  button: { backgroundColor: "#06453d", padding: 10, alignItems: "center", borderRadius: 5 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
