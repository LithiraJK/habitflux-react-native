import React, { useEffect, memo } from 'react';
import { View, Text, TouchableOpacity, Pressable, Dimensions, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  runOnJS,
  Easing 
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const ANIMATION_DURATION = 350;
const BACKGROUND_COLOR = '#1C1C1E';
const PRIMARY_COLOR = '#818CF8';

interface CategorySheetProps {
  onClose: () => void;
}

const CreateCategorySheet = ({ onClose }: CategorySheetProps) => {
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const context = useSharedValue({ y: 0 });

  useEffect(() => {
    translateY.value = withTiming(0, { 
      duration: ANIMATION_DURATION, 
      easing: Easing.out(Easing.exp) 
    });
  }, []);

  const handleClose = () => {
    translateY.value = withTiming(SCREEN_HEIGHT, { 
      duration: 250, 
      easing: Easing.in(Easing.quad) 
    }, () => runOnJS(onClose)());
  };

  const gesture = Gesture.Pan()
    .onStart(() => { context.value = { y: translateY.value }; })
    .onUpdate((event) => {
      translateY.value = Math.max(event.translationY + context.value.y, 0);
    })
    .onEnd(() => {
      if (translateY.value > SCREEN_HEIGHT / 4) {
        handleClose();
      } else {
        translateY.value = withTiming(0, { duration: 250 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={StyleSheet.absoluteFill} className="z-50">
      <Pressable 
        style={styles.backdrop} 
        onPress={handleClose} 
      />
      
      <GestureDetector gesture={gesture}>
        <Animated.View 
          style={[animatedStyle, { paddingBottom: insets.bottom + 20 }]} 
          className="bg-[#1C1C1E] p-8 rounded-t-[40px] border-t border-gray-800 absolute bottom-0 left-0 right-0 h-[65%]"
        >
          {/* Handle Bar */}
          <View className="w-12 h-1.5 bg-gray-700 rounded-full self-center mb-6" />

          {/* Header */}
          <View className="flex-row justify-between items-center mb-8">
            <Text className="text-white text-xl font-bold">New Category</Text>
            <View className="w-12 h-12 rounded-2xl bg-[#A5F3FC] items-center justify-center">
              <Ionicons name="medkit" size={24} color="black" />
            </View>
          </View>

          {/* List Items */}
          <View className="space-y-1">
            <OptionItem icon="pencil" label="Category name" value="Med" />
            <OptionItem icon="apps" label="Category icon" />
            <OptionItem icon="water" label="Category color" />
          </View>

          <TouchableOpacity 
            accessibilityRole="button"
            className="mt-auto bg-[#818CF8] py-4 rounded-2xl items-center shadow-lg"
            activeOpacity={0.8}
            onPress={handleClose}
          >
            <Text className="text-white font-bold text-lg tracking-widest uppercase">Create Category</Text>
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const OptionItem = memo(({ icon, label, value }: { icon: any, label: string, value?: string }) => (
  <TouchableOpacity 
    accessibilityRole="menuitem"
    className="flex-row items-center py-5 border-b border-gray-800/50"
  >
    <Ionicons name={icon} size={22} color="white" />
    <Text className="text-gray-400 ml-4 flex-1 font-medium">{label}</Text>
    {value && <Text className="text-white font-bold">{value}</Text>}
    <Ionicons name="chevron-forward" size={16} color="#4B5563" />
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  }
});

export default CreateCategorySheet;