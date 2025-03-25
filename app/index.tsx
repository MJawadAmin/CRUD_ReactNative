import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { AuthSessionResult } from "expo-auth-session";
import { auth } from "../firebaseConfig"; // Import from firebaseConfig.ts
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import 'expo-dev-client';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen(): JSX.Element {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Google Sign-In Configuration
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "YOUR_GOOGLE_CLIENT_ID", // Use Web Client ID from Firebase
    iosClientId: "YOUR_IOS_CLIENT_ID",
    androidClientId: "YOUR_ANDROID_CLIENT_ID",
  });

  useEffect(() => {
    const signInWithGoogle = async () => {
      if (response?.type === "success") {
        const idToken = response.authentication?.idToken;
        if (!idToken) {
          Alert.alert("Login Error", "No ID Token found");
          return;
        }

        try {
          const credential = GoogleAuthProvider.credential(idToken);
          await signInWithCredential(auth, credential);
          Alert.alert("Login Success", "Google login successful!");
          router.push("/(tab)");
        } catch (error: any) {
          Alert.alert("Login Failed", error.message);
        }
      }
    };

    signInWithGoogle();
  }, [response]);

  const handleLogin = (): void => {
    if (email === "jawad" && password === "1234") {
      router.push("/(tab)");
    } else {
      Alert.alert("Invalid Credentials", "Please check your username or password.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.googleButton]}
        disabled={!request}
        onPress={() => promptAsync()}
      >
        <Text style={styles.buttonText}>Sign In with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, fontWeight: "bold", color: "#333" },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 20 },
  input: { width: "100%", backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 10, elevation: 3 },
  button: { backgroundColor: "#06453d", paddingVertical: 12, width: "100%", borderRadius: 8, alignItems: "center", marginVertical: 10, elevation: 3 },
  googleButton: { backgroundColor: "#DB4437" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export {};
