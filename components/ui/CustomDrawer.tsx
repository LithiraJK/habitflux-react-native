import { Colors } from "@/constants/theme";
import { logout } from "@/services/authService";
import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomDrawerContent = (props: any) => {
  const insets = useSafeAreaInsets();
  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const fullDate = today.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <View
      className="flex-1"
      style={{
        paddingTop: insets.top,
        backgroundColor: Colors.dark.background,
        borderTopRightRadius:50,
        borderBottomRightRadius:50
      }}
    >
      <View
        className="px-6 pt-6 pb-8"
        style={{
          backgroundColor: Colors.dark.background,
          borderBottomWidth: 1,
          borderBottomColor: Colors.dark.border,
        }}
      >
        <Text
          className="text-3xl font-bold tracking-wide"
          style={{ color: Colors.dark.text }}
        >
          Habit<Text style={{ color: Colors.dark.primary }}>Flux</Text>
        </Text>
        <View className="mt-3">
          <Text
            className="text-base font-medium"
            style={{ color: Colors.dark.text, opacity: 0.9 }}
          >
            {dayName}
          </Text>
          <Text
            className="text-sm"
            style={{ color: Colors.dark.text, opacity: 0.7 }}
          >
            {fullDate}
          </Text>
        </View>
      </View>

      {/* Drawer Items */}
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 10 }} 
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Profile & Logout */}
      <View
        className="p-5"
        style={{
          paddingBottom: insets.bottom,
          borderTopWidth: 1,
          borderTopColor: Colors.dark.border,
        }}
      >
        <TouchableOpacity
          className="flex-row items-center p-3 rounded-xl"
          activeOpacity={0.7}
          onPress={handleLogout}
        >
          <View className="relative">
            <Image
              source={{
                uri: "https://ui-avatars.com/api/?name=Lithira+Jayanaka&background=818CF8&color=fff",
              }}
              className="w-11 h-11 rounded-full border-2"
              style={{ borderColor: Colors.dark.primary }}
            />
          </View>

          <View className="ml-3 flex-1">
            <Text
              className="font-semibold text-base leading-tight"
              style={{ color: Colors.dark.text }}
            >
              Lithira Jayanaka
            </Text>
            <Text
              className="text-xs"
              style={{ color: Colors.dark.textSecondary }}
              numberOfLines={1}
            >
              lithira@gmail.com
            </Text>
          </View>

          <Ionicons
            name="log-out-outline"
            size={32}
            color="#EF4444"
            style={{ transform: [{ rotate: "180deg" }] }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawerContent;