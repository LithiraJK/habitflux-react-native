import AuthProvider from "@/context/AuthContext";
import LoaderProvider from "@/context/LoaderContext";
import { Slot } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const RootLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <LoaderProvider>
      <AuthProvider>
        <View className="flex-1" style={{ marginBottom: 10 }}>
          <Slot />
        </View>
        <Toast />
      </AuthProvider>
    </LoaderProvider>
  );
};

export default RootLayout;
