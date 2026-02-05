import CustomDrawerContent from "@/components/ui/CustomDrawer";
import { Colors } from "@/constants/theme";
import { FontAwesome5 } from "@expo/vector-icons";
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
          drawerActiveTintColor: Colors.dark.primary,
          drawerActiveBackgroundColor: Colors.dark.primary + "20",
          drawerInactiveTintColor: Colors.dark.textSecondary,
          drawerLabelStyle: {
            marginLeft: 8,
            fontWeight: "500",
            fontSize: 16,
          },
          drawerItemStyle: {
            borderRadius: 16,
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
              <FontAwesome5 name="th-large" color={color} size={size} />
            ),
          }}
        />

        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Settings",
            drawerIcon: ({ color, size }) => (
              <FontAwesome5 name="sliders-h" color={color} size={size} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
