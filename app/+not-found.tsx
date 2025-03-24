import { Link } from "expo-router";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const NotFoundScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://cdn.dribbble.com/users/285475/screenshots/2083086/media/3c8f2e2d278b64324b4076df6366f798.gif",
        }}
        style={styles.image}
      />
      <Text style={styles.title}>Oops! Page Not Found</Text>
      <Text style={styles.description}>
        The page you are looking for doesn’t exist or has been moved.
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Go Home</Text>
      </TouchableOpacity>
      <Link href={'/'}>Go back to the home</Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 20,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NotFoundScreen;
