import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Tabs, useNavigation } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

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
        tabBarActiveTintColor: "#818CF8",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ marginLeft: 16 }}
          >
            <Ionicons name="menu" size={28} color="#818CF8" />
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
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name={icon} color={color} size={size} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabsLayout;
