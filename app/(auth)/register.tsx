import { useLoader } from "@/hooks/useLoader";
import { registerUser } from "@/services/authService";
import { showToast } from "@/utils/notifications";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

const Register = () => {
  const router = useRouter();
  const { showLoader, hideLoader, isLoading } = useLoader();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (isLoading) return;
    
    if (!name || !email || !password) {
      showToast("error", "Error", "Please fill all the fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("error", "Error", "Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      showToast("error", "Error", "Password must be at least 6 characters long");
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
      <View className="flex-1">
        {/* Match Login Gradient */}
        <LinearGradient
          colors={["#0f172a", "#1e1b4b", "#312e81"]}
          className="flex-1 justify-center p-6"
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Glassmorphism Card */}
              <View className="overflow-hidden rounded-3xl border border-white/20 shadow-2xl mt-10">
                <BlurView intensity={20} tint="dark" className="p-8 w-full">
                  
                  {/* Header */}
                  <View className="items-center mb-8">
                    <Text className="text-3xl font-extrabold text-white tracking-tight">
                      Join <Text className="text-indigo-400">HabitFlux</Text>
                    </Text>
                    <Text className="text-gray-400 text-sm mt-1 uppercase tracking-widest text-center">
                      Start your journey to excellence
                    </Text>
                  </View>

                  {/* Input Fields */}
                  <View className="space-y-4 mb-8">
                    {/* Name Input */}
                    <View className="flex-row items-center bg-white/10 border border-white/10 rounded-2xl px-4 py-1 mb-4">
                      <Ionicons name="person-outline" size={20} color="#94a3b8" />
                      <TextInput
                        placeholder="Full Name"
                        placeholderTextColor="#94a3b8"
                        className="flex-1 p-3 text-white text-base"
                        value={name}
                        onChangeText={setName}
                      />
                    </View>

                    {/* Email Input */}
                    <View className="flex-row items-center bg-white/10 border border-white/10 rounded-2xl px-4 py-1 mb-4">
                      <Ionicons name="mail-outline" size={20} color="#94a3b8" />
                      <TextInput
                        placeholder="Email Address"
                        placeholderTextColor="#94a3b8"
                        className="flex-1 p-3 text-white text-base"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                      />
                    </View>

                    {/* Password Input */}
                    <View className="flex-row items-center bg-white/10 border border-white/10 rounded-2xl px-4 py-1 mb-4">
                      <Ionicons name="lock-closed-outline" size={20} color="#94a3b8" />
                      <TextInput
                        placeholder="Password"
                        placeholderTextColor="#94a3b8"
                        className="flex-1 p-3 text-white text-base"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                      />
                    </View>

                    {/* Confirm Password */}
                    <View className="flex-row items-center bg-white/10 border border-white/10 rounded-2xl px-4 py-1">
                      <Ionicons name="shield-checkmark-outline" size={20} color="#94a3b8" />
                      <TextInput
                        placeholder="Confirm Password"
                        placeholderTextColor="#94a3b8"
                        className="flex-1 p-3 text-white text-base"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                      />
                    </View>
                  </View>

                  {/* Register Button */}
                  <TouchableOpacity activeOpacity={0.8} onPress={handleRegister}>
                    <LinearGradient
                      colors={["#6366f1", "#4f46e5"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      className="py-4 rounded-2xl overflow-hidden shadow-lg shadow-indigo-600/30"
                    >
                      <Text className="text-white text-lg font-bold text-center">
                        Create Account
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  {/* Footer Link */}
                  <View className="flex-row justify-center mt-8">
                    <Text className="text-gray-400">Already have an account? </Text>
                    <TouchableOpacity onPress={() => router.back()}>
                      <Text className="text-indigo-400 font-bold underline">
                        Login
                      </Text>
                    </TouchableOpacity>
                  </View>

                </BlurView>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;