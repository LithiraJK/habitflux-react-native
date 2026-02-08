import CustomDrawerContent from "@/components/ui/CustomDrawer";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          
          // Drawer Styles
          drawerType: "slide",
          drawerStyle: {
            backgroundColor: "#0f172a",
            width: 300,
          },
          overlayColor: "rgba(0,0,0,0.7)",
          
          drawerActiveTintColor: "#fff",
          drawerActiveBackgroundColor: "#6366f1",
          
          drawerInactiveTintColor: "#94a3b8",
          drawerInactiveBackgroundColor: "transparent",

          drawerItemStyle: {
            borderRadius: 16,
            marginBottom: 8,
            paddingHorizontal: 12,
          },
          drawerLabelStyle: {
            fontWeight: "600",
            fontSize: 15,
            marginLeft: -10,
          },
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Dashboard",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="grid-outline" color={color} size={22} />
            ),
          }}
        />

        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Settings",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" color={color} size={22} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;