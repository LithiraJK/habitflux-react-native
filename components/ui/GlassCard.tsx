import { BlurView } from 'expo-blur';
import { ReactNode } from 'react';
import { View, Text } from 'react-native';

const GlassCard = ({ children } : { children: ReactNode }) => {
  return (
    <View className="m-2 rounded-[24px] overflow-hidden border border-white/20">
      <BlurView 
        intensity={20} 
        tint="dark"    
        className="p-5"
      >
        {children}
      </BlurView>
    </View>
  );
};

export default GlassCard;