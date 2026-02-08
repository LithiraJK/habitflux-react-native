import { Stack } from "expo-router";
import React from "react";

const CreateHabitLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
        animation: "slide_from_right",
        
      }}
    />
  );
};

export default CreateHabitLayout;