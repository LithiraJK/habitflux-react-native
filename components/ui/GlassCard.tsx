import { BlurView } from 'expo-blur';
import { ReactNode } from 'react';
import { View } from 'react-native';

const GlassCard = ({ children } : { children: ReactNode }) => {
  return (
    <View className="m-1 rounded-[16px] overflow-hidden">
      <BlurView 
        intensity={20} 
        tint="light"    
        className="p-5 bg-white/40"
      >
        {children}
      </BlurView>
    </View>
  );
};

export default GlassCard;