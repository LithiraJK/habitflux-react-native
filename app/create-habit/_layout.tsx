import { Stack } from 'expo-router';
import React from 'react';

const CreateHabitLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#121212' },
        animation: 'slide_from_right', 
      }}
    >
    </Stack>
  );
};

export default CreateHabitLayout;