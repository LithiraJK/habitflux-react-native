import { useLoader } from "@/hooks/useLoader";
import { registerUser } from "@/services/authService";
import { showToast } from "@/utils/notifications";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const Register = () => {
  const router = useRouter();

  const { showLoader, hideLoader, isLoading } = useLoader();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (isLoading) {
      return;
    }
    if (!name || !email || !password) {
      showToast("error", "Error", "Please fill all the fields");
      return;
    }
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("error", "Error", "Please enter a valid email address");
      return;
    }

    // Password validation
    if (password.length < 6) {
      showToast(
        "error",
        "Error",
        "Password must be at least 6 characters long",
      );
      return;
    }
    if (password !== confirmPassword) {
      showToast("error", "Error", "Passwords do not match");
      return;
    }

    try {
      showLoader();
      await registerUser(name, email, password);
      showToast("success", "Success", "Registration Successful");
      router.replace("/login");
    } catch (error: any) {
      const errorMessage = error.message || "An unknown error occurred";
      showToast("error", "Registration Failed", errorMessage);
    } finally {
      hideLoader();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 justify-center items-center bg-gray-50 p-6">
        <View className="w-full bg-white/50 backdrop-blur-md rounded-2xl shadow-lg p-8">
          <Text className="text-3xl font-bold mb-6 text-center text-gray-900">
            Register
          </Text>
          <TextInput
            placeholder="name"
            placeholderTextColor="#6B7280"
            className="border bg-gray-300 p-3 mb-4 rounded-xl"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="email"
            placeholderTextColor="#6B7280"
            className="border bg-gray-300 p-3 mb-4 rounded-xl"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="password"
            placeholderTextColor="#6B7280"
            className="border bg-gray-300 p-3 mb-4 rounded-xl"
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            placeholder="confirm password"
            placeholderTextColor="#6B7280"
            className="border bg-gray-300 p-3 mb-4 rounded-xl"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <Pressable
            className="bg-blue-600/80 px-6 py-3 rounded-2xl"
            onPress={handleRegister}
          >
            <Text className="text-white text-lg text-center">Register</Text>
          </Pressable>
          <View className="flex-row justify-center mt-2">
            <Text className="text-gray-700">Already have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
            >
              <Text className="text-blue-600 font-semibold">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;
