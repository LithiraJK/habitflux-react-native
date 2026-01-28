import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Drawer } from "expo-router/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { logout } from "@/services/authService";
import { router } from "expo-router";


const CustomDrawerContent = (props: any) => {
  const handleLogout = async () => {
    try {
      await logout(); 
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 20 }}
      >
        {/* Main Navigation Items*/}
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

     
      <View className="p-5 border-t border-gray-100 pb-10">
        <TouchableOpacity
          className="flex-row items-center"
          activeOpacity={0.7}
          onPress={handleLogout}
        >
         
          <View className="relative">
            <Image
              source={{
                uri: "https://ui-avatars.com/api/?name=Lithira+Jayanaka&background=818CF8&color=fff",
              }}
              className="w-12 h-12 rounded-full border-2 border-[#818CF8]"
            />
           
          </View>
          
          <View className="ml-3 flex-1">
            <Text className="font-bold text-base leading-tight">
              Lithira Jayanaka
            </Text>
            <Text className="text-xs" numberOfLines={1}>
              lithira@gmail.com
            </Text>
          </View>

          <Ionicons
            name="log-out-outline"
            size={32}
            color="#FF4444"
            style={{ transform: [{ rotate: "180deg" }] }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};


const DashboardDrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: true,
          headerTitleStyle: { fontWeight: "bold" },
          headerStatusBarHeight: 0,
          drawerActiveTintColor: "#818CF8",
          drawerLabelStyle: { marginLeft: -10, fontWeight: "700" },
          drawerStyle: { width: 280 },
          
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Home Dashboard",
            title: "Today",
            drawerIcon: ({ color, size }) => (
              <FontAwesome5 name="home" color={color} size={size - 4} style={{ padding: 10 }} />
            ),
          }}
        />

        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Account Settings",
            title: "Settings",
            drawerIcon: ({ color, size }) => (
              <FontAwesome5 name="cog" color={color} size={size - 4} style={{ padding: 10 }} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DashboardDrawerLayout;