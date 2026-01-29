import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ICONS = ['pizza', 'medkit', 'heart', 'walk', 'bicycle', 'fitness', 'book', 'briefcase'];

export const IconPickerModal = ({ visible, onSelect, onClose }: any) => (
  <Modal visible={visible} transparent animationType="fade">
    <View className="flex-1 bg-black/80 justify-center items-center px-10">
      <View className="bg-[#1C1C1E] p-6 rounded-[30px] w-full border border-gray-800">
        <Text className="text-white text-center font-bold mb-6">Select Icon</Text>
        <View className="flex-row flex-wrap justify-center">
          {ICONS.map(icon => (
            <TouchableOpacity key={icon} onPress={() => onSelect(icon)} className="p-4">
              <Ionicons name={icon as any} size={30} color="white" />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={onClose} className="mt-4 pt-4 border-t border-gray-800 items-center">
          <Text className="text-gray-400 font-bold">CLOSE</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);