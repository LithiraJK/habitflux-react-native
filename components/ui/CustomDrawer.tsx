import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/services/authService";
import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
      router.replace("/login");
    }
  };

  return (
    <View className="flex-1">

      <LinearGradient
        colors={["#0f172a", "#1e1b4b"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{ paddingTop: 0 }}
        >
          
          <View
            style={{ paddingTop: top + 20 }}
            className="px-6 pb-6 mb-4 border-b border-white/10"
          >
            <View className="flex-row items-center mb-4">
              <View className="p-1 rounded-full border-2 border-indigo-500 shadow-lg shadow-indigo-500/50">
                <Image
                  source={user?.photoURL || "https://i.pravatar.cc/150?img=11"}
                  style={{ width: 60, height: 60, borderRadius: 30 }}
                  contentFit="cover"
                />
              </View>
              <View className="ml-4">
                <Text
                  className="text-white text-lg font-bold"
                  numberOfLines={1}
                >
                  {user?.displayName || "User"}
                </Text>
                <Text className="text-indigo-300 text-xs" numberOfLines={1}>
                  {user?.email || "user@example.com"}
                </Text>
              </View>
            </View>
          </View>

          <View className="px-3">
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>

        <View
          style={{ paddingBottom: bottom + 20 }}
          className="px-6 border-t border-white/10 pt-6"
        >
          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center p-4 rounded-2xl bg-white/5 border border-white/10 active:bg-red-500/20"
          >
            <Ionicons name="log-out-outline" size={22} color="#ef4444" />
            <Text className="text-white font-semibold ml-3 text-base">
              Sign Out
            </Text>
          </TouchableOpacity>

          <Text className="text-center text-gray-600 text-xs mt-6">
            Version 1.0.0
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default CustomDrawerContent;
