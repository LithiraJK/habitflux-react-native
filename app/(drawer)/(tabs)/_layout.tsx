import { Colors } from "@/constants/theme";
import { FontAwesome5 } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { BlurView } from "expo-blur";
import { Tabs, useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View, Platform } from "react-native";

const tabs = [
  { name: "home", title: "Today", icon: "calendar-check" },
  { name: "habits", title: "Habits", icon: "tasks" },
  { name: "categories", title: "Categories", icon: "th-large" },
  { name: "timer", title: "Timer", icon: "stopwatch" },
] as const;

const TabsLayout = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: Colors.dark.primary,
        tabBarInactiveTintColor: Colors.dark.textTertiary,
        tabBarShowLabel: true,

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
          marginBottom: Platform.OS === "ios" ? 5 : 10, // iOS සඳහා පොඩි ඉඩක්
        },

        tabBarStyle: {
          position: "absolute", // Glass effect එක Content එක උඩින් පෙන්වීමට
          bottom: 0, // පහළටම සවි කරන්න
          left: 0,
          right: 0,
          height: Platform.OS === "ios" ? 85 : 70, // iOS Safe Area එකට ඉඩ දෙන්න
          borderTopWidth: 1, // උඩින් පමණක් ඉරක්
          borderTopColor: "rgba(255, 255, 255, 0.1)",
          borderWidth: 0, // වටේම Border එක අයින් කරන්න
          backgroundColor: "transparent",
          elevation: 0,
        },

        tabBarItemStyle: {
          height: 60,
          paddingTop: 10,
        },

        // Dark Glass Effect (Full Width)
        tabBarBackground: () => (
          <BlurView
            tint="dark"
            intensity={40}
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "rgba(15, 23, 42, 0.8)", // පසුබිම මඳක් තද කරන්න (පාට පෙවෙන්න)
              // borderRadius ඉවත් කළා
            }}
          />
        ),
      }}
    >
      {tabs.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title: title,
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  backgroundColor: focused
                    ? `${Colors.dark.primary}20`
                    : "transparent",
                  borderRadius: 16,
                  width: 55,
                  height: 32,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 5,
                }}
              >
                <FontAwesome5 
                  name={icon} 
                  color={color} 
                  size={focused ? 20 : 18} 
                />
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabsLayout;