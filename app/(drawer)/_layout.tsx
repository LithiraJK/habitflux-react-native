import { logout } from "@/services/authService";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
    <View className="flex-1 bg-[#1A1A1A]" style={{ paddingTop: insets.top }}>
      <View className="px-6 pt-6 pb-8 bg-gradient-to-b from-[#7C3AED] to-[#6366F1]">
        <Text className="text-white text-3xl font-bold tracking-wide">
          Habit<Text className="text-[#C084FC]">Flux</Text>
        </Text>
        <View className="mt-3">
          <Text className="text-white/90 text-base font-medium">{dayName}</Text>
          <Text className="text-white/70 text-sm">{fullDate}</Text>
        </View>
      </View>

      {/* Drawer Items */}
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 10 }}
        style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Profile & Logout */}
      <View
        className="p-5 border-t border-gray-800"
        style={{ paddingBottom: insets.bottom + 10 }}
      >
        <TouchableOpacity
          className="flex-row items-center bg-gray-800/50 p-3 rounded-xl"
          activeOpacity={0.7}
          onPress={handleLogout}
        >
          <View className="relative">
            <Image
              source={{
                uri: "https://ui-avatars.com/api/?name=Lithira+Jayanaka&background=7C3AED&color=fff",
              }}
              className="w-11 h-11 rounded-full border-2 border-[#7C3AED]"
            />
          </View>

          <View className="ml-3 flex-1">
            <Text className="font-semibold text-base leading-tight text-white">
              Lithira Jayanaka
            </Text>
            <Text className="text-xs text-gray-400" numberOfLines={1}>
              lithira@gmail.com
            </Text>
          </View>

          <Ionicons
            name="log-out-outline"
            size={24}
            color="#EF4444"
            style={{ transform: [{ rotate: "180deg" }] }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: "#A78BFA",
          drawerActiveBackgroundColor: "#2D2D2D",
          drawerInactiveTintColor: "#9CA3AF",
          drawerLabelStyle: {
            marginLeft: 8,
            fontWeight: "500",
            fontSize: 16,
          },
          drawerItemStyle: {
            borderRadius: 10,
            marginHorizontal: 12,
            marginVertical: 2,
            paddingHorizontal: 12,
            paddingVertical: 8,
          },
          drawerStyle: {
            width: 280,
            backgroundColor: "#1A1A1A",
          },
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Dashboard",
            drawerIcon: ({ color, size }) => (
              <FontAwesome5 name="th-large" color={color} size={20} />
            ),
          }}
        />

        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Settings",
            drawerIcon: ({ color, size }) => (
              <FontAwesome5 name="sliders-h" color={color} size={20} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
