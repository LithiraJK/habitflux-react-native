import { useLoader } from "@/hooks/useLoader";
import { login, loginWithGoogle } from "@/services/authService";
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

  const handleGoogleLogin = async () => {
    if (isLoading) return;
    try {
      showLoader();
      await loginWithGoogle();
      router.replace("/home");
    } catch (error) {
      showToast("error", "Login Failed", "Google sign-in failed");
    } finally {
      hideLoader();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1">
        {/* Deep Dark Gradient Background */}
        <LinearGradient
          colors={["#0f172a", "#1e1b4b", "#312e81"]}
          className="flex-1 justify-center items-center p-6"
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="w-full"
          >
            {/* Glassmorphism Card */}
            <View className="overflow-hidden rounded-3xl border border-white/20 shadow-2xl">
              <BlurView intensity={20} tint="dark" className="p-8 w-full">
                
                {/* Branding Section */}
                <View className="items-center mb-8">
                  <View className="w-16 h-16 bg-indigo-500 rounded-2xl items-center justify-center shadow-lg shadow-indigo-500/50 mb-4">
                    <Ionicons name="flash" size={32} color="white" />
                  </View>
                  <Text className="text-4xl font-extrabold text-white tracking-tight">
                    Habit<Text className="text-indigo-400">Flux</Text>
                  </Text>
                  <Text className="text-gray-400 text-sm mt-1 uppercase tracking-widest">
                    Build a better you
                  </Text>
                </View>

                {/* Input Fields */}
                <View className="space-y-4 mb-6">
                  <View className="flex-row items-center bg-white/10 border border-white/10 rounded-2xl px-4 py-1 mb-3">
                    <Ionicons name="mail-outline" size={20} color="#94a3b8" />
                    <TextInput
                      placeholder="Email Address"
                      placeholderTextColor="#94a3b8"
                      className="flex-1 p-3 text-white text-base"
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize="none"
                    />
                  </View>

                  <View className="flex-row items-center bg-white/10 border border-white/10 rounded-2xl px-4 py-1 mb-3">
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
                </View>

                {/* Primary Action Button */}
                <TouchableOpacity activeOpacity={0.8} onPress={handleLogin}>
                  <LinearGradient
                    colors={["#6366f1", "#4f46e5"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className="p-4 rounded-2xl overflow-hidden shadow-lg shadow-indigo-600/30"
                  >
                    <Text className="text-white text-lg font-bold text-center">
                      Login
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <View className="flex-row items-center my-6">
                  <View className="flex-1 h-[1px] bg-white/10" />
                  <Text className="mx-4 text-gray-500 font-medium">OR</Text>
                  <View className="flex-1 h-[1px] bg-white/10" />
                </View>

                {/* Google Sign-In */}
                <Pressable
                  onPress={handleGoogleLogin}
                  className="bg-white/5 border border-white/10 py-4 rounded-2xl flex-row items-center justify-center active:bg-white/10"
                >
                  <Ionicons name="logo-google" size={20} color="#ef4444" />
                  <Text className="text-white text-lg font-semibold ml-3">
                    Continue with Google
                  </Text>
                </Pressable>

                {/* Footer Links */}
                <View className="flex-row justify-center mt-8">
                  <Text className="text-gray-400">New here? </Text>
                  <TouchableOpacity onPress={() => router.push("/register")}>
                    <Text className="text-indigo-400 font-bold underline">
                      Create Account
                    </Text>
                  </TouchableOpacity>
                </View>

              </BlurView>
            </View>
          </KeyboardAvoidingView>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;