import { BlurView } from 'expo-blur';
import { ReactNode } from 'react';
import { View } from 'react-native';

const GlassCard = ({ children, className = "" } : { children: ReactNode, className?: string }) => {
  return (
    <View className={`rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-black/20 ${className}`}>
      <BlurView 
        intensity={20} 
        tint="dark"
        className="p-5 bg-slate-900/50"
      >
        {children}
      </BlurView>
    </View>
  );
};

export default GlassCard;