import { Colors } from "@/constants/theme";
import React, { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

export const NameInputDialog = ({
  visible,
  value,
  onConfirm,
  onClose,
}: any) => {
  const [text, setText] = useState(value);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/60 justify-center items-center px-10">
        <View
          style={{
            backgroundColor: Colors.dark.cardBackground,
            borderColor: Colors.dark.primary,
          }}
          className="p-6 rounded-2xl w-full border"
        >
          <Text
            style={{ color: Colors.dark.primary }}
            className="text-xs font-bold mb-2"
          >
            Category
          </Text>
          <TextInput
            style={{
              color: Colors.dark.text,
              borderBottomColor: Colors.dark.primary,
            }}
            className="text-lg border-b pb-2 mb-6"
            value={text}
            onChangeText={setText}
            autoFocus
          />
          <View className="flex-row justify-between space-x-6">
            <TouchableOpacity onPress={onClose}>
              <Text
                style={{ color: Colors.dark.primary }}
                className="font-bold"
              >
                CANCEL
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onConfirm(text);
                onClose();
              }}
            >
              <Text
                style={{ color: Colors.dark.primary }}
                className="font-bold"
              >
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
