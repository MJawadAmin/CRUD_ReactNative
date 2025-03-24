import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Link } from "expo-router";
import { auth } from "../firebaseConfig"; // Import Firebase Auth
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { makeRedirectUri } from "expo-auth-session";

// Complete any pending browser sessions
WebBrowser.maybeCompleteAuthSession();

export default function signup() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "1:782077706660:web:c0fdd25d7643a5336bc131",
    redirectUri: makeRedirectUri(),
    // Firebase requires redirect URI
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then((userCredential) => {
          const user = userCredential.user;
          Alert.alert("Login Successful", `Welcome ${user.displayName}`);
        })
        .catch((error) => {
          console.error("Google Sign-In Error:", error);
          Alert.alert("Login Failed", error.message);
        });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      <TextInput placeholder="Full Name" style={styles.input} />
      <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry />
      <TextInput placeholder="Confirm Password" style={styles.input} secureTextEntry />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.googleButton]}
        disabled={!request}
        onPress={() => promptAsync()}
      >
        <Text style={styles.buttonText}>Sign Up with Google</Text>
      </TouchableOpacity>

      <Link href="/" style={styles.signupText}>
        Already have an account? <Text style={styles.signupLink}>Go to Login</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  button: {
    backgroundColor: "#06453d",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
    elevation: 3,
  },
  googleButton: {
    backgroundColor: "#DB4437", // Google Red Color
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupText: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
  signupLink: {
    color: "#06453d",
    fontWeight: "bold",
  },
});
