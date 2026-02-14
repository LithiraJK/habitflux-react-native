import { Stack } from "expo-router";

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