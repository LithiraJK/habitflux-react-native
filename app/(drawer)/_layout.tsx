import { Colors } from "@/constants/theme";
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
    <View
      className="flex-1"
      style={{
        paddingTop: insets.top,
        backgroundColor: Colors.dark.background,
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
          paddingBottom: insets.bottom + 10,
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
          drawerActiveTintColor: Colors.dark.primary,
          drawerActiveBackgroundColor: Colors.dark.border,
          drawerInactiveTintColor: Colors.dark.textSecondary,
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
            backgroundColor: Colors.dark.background,
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
