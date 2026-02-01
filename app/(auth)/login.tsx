import { useLoader } from "@/hooks/useLoader";
import { login } from "@/services/authService";
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

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { showLoader, hideLoader, isLoading } = useLoader();

  const handleLogin = async () => {
    if (!email || !password || isLoading) {
      showToast("error", "Error", "Please enter email and password");
      return;
    }
    try {
      showLoader();
      await login(email, password);
      router.replace("/home");
    } catch (error) {
      showToast("error", "Login Failed", "Invalid email or password");
    } finally {
      hideLoader();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 justify-center items-center bg-gray-50 p-6">
        <View className="w-full bg-white/50 backdrop-blur-md rounded-2xl shadow-lg p-8">
          <Text className="text-3xl font-bold mb-6 text-center text-gray-900">
            Login
          </Text>
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
          <Pressable
            onPress={handleLogin}
            className="bg-blue-600/80 px-6 py-3 rounded-2xl"
          >
            <Text className="text-white text-lg text-center">Login</Text>
          </Pressable>
          <View className="flex-row justify-center mt-2">
            <Text className="text-gray-700">Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                router.push("/register");
              }}
            >
              <Text className="text-blue-600 font-semibold">Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
