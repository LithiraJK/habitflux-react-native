import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

const COLORS = ['#F87171', '#FB923C', '#FACC15', '#4ADE80', '#2DD4BF', '#38BDF8', '#818CF8', '#C084FC', '#F472B6', '#94A3B8'];

export const ColorPickerModal = ({ visible, onSelect, onClose }: any) => (
  <Modal visible={visible} transparent animationType="fade">
    <View className="flex-1 bg-black/80 justify-center items-center px-8">
      <View className="bg-[#1C1C1E] p-6 rounded-[30px] w-full border border-gray-800">
        <Text className="text-white text-center font-bold mb-6">Category color</Text>
        <View className="flex-row flex-wrap justify-center">
          {COLORS.map(color => (
            <TouchableOpacity 
              key={color} 
              onPress={() => onSelect(color)} 
              className="w-12 h-12 rounded-full m-3 shadow-md" 
              style={{ backgroundColor: color }}
            />
          ))}
        </View>
        <TouchableOpacity onPress={onClose} className="mt-4 pt-4 border-t border-gray-800 items-center">
          <Text className="text-gray-400 font-bold uppercase tracking-widest">Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);