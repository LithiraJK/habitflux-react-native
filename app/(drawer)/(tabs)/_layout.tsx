import { Colors } from "@/constants/theme";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { BlurView } from "expo-blur";
import { Tabs, useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const tabs = [
  { name: "home", title: "Today", icon: "calendar-check" },
  { name: "habits", title: "Habits", icon: "tasks" },
  { name: "categories", title: "Categories", icon: "th" },
  { name: "timer", title: "Timer", icon: "stopwatch" },
] as const;

const TabsLayout = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,

        tabBarActiveTintColor: Colors.dark.primary,
        tabBarInactiveTintColor: Colors.dark.textTertiary,
        tabBarShowLabel: true,

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 2,
        },

        tabBarStyle: {
          left: 20,
          right: 20,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          backgroundColor: "transparent",
          paddingTop: 10,
          paddingBottom: 10,
          height: 75,
        },

        tabBarItemStyle: {
          paddingVertical: 25,
        },

        tabBarBackground: () => (
          <BlurView
            tint="light"
            intensity={80}
            style={StyleSheet.absoluteFill}
          />
        ),
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ marginLeft: 16 }}
          >
            <Ionicons name="menu" size={28} color={Colors.dark.primary} />
          </TouchableOpacity>
        ),
      }}
    >
      {tabs.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title: title,
            tabBarIcon: ({ color, size, focused }) => (
              <View
                style={{
                  backgroundColor: focused
                    ? `${Colors.dark.primary}20`
                    : "transparent",
                  borderRadius: 24,
                  width: 64,
                  height: 34,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome5 name={icon} color={color} size={24} />
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabsLayout;
