import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome5} from "@expo/vector-icons"

const tabs = [
  { name: "home", title: "Today", icon: "calendar-check" },
  { name: "habits", title: "Habits", icon: "tasks" },
  { name: "categories", title: "Categories", icon: "th" },
  { name: "timer", title: "Timer", icon: "stopwatch" }
] as const

const DashboardLayout = () => {
  return (
     <Tabs
  screenOptions={{
    headerShown: false,
    tabBarActiveTintColor: '#818CF8',
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '600',
    },
  }}
>
      {tabs.map(({ name, title, icon }: any) => (
        <Tabs.Screen
          name={name}
          options={{
            title: title,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name={icon} color={color} size={size} />
            )
          }}
        />
      ))}
    </Tabs>
  )
}

export default DashboardLayout