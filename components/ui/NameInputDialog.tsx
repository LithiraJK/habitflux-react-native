import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';

export const NameInputDialog = ({ visible, value, onConfirm, onClose }: any) => {
  const [text, setText] = useState(value);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/60 justify-center items-center px-10">
        <View className="bg-[#1C1C1E] p-6 rounded-2xl w-full border border-[#0891B2]">
          <Text className="text-[#0891B2] text-xs font-bold mb-2">Category</Text>
          <TextInput 
            className="text-white text-lg border-b border-[#0891B2] pb-2 mb-6"
            value={text}
            onChangeText={setText}
            autoFocus
          />
          <View className="flex-row justify-end space-x-6">
            <TouchableOpacity onPress={onClose}>
              <Text className="text-[#0891B2] font-bold">CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { onConfirm(text); onClose(); }}>
              <Text className="text-[#0891B2] font-bold">OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};