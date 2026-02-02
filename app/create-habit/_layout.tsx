import { Colors } from "@/constants/theme";
import { Stack } from "expo-router";
import React from "react";

const CreateHabitLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.dark.background },
        animation: "slide_from_right",
      }}
    ></Stack>
  );
};

export default CreateHabitLayout;
